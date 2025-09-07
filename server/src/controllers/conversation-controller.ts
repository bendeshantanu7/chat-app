import { run } from "../mongo";
import { supabase } from "../supabase";
import express from "express";

export const conversationController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { sender, recipient, conversationId } = req.body;

    const { data: existingConversation, error: fetchError } = await supabase
      .from("conversations")
      .select()
      .eq("type", "direct")
      .contains("participants", [sender])
      .contains("participants", [recipient])
      .maybeSingle();

    if (fetchError) {
      console.error(fetchError);
      return res.status(500).json({ error: "Error fetching conversation" });
    }

    if (existingConversation) {
      res.status(201).json(existingConversation);
      return;
    }

    const { data, error } = await supabase
      .from("conversations")
      .insert({ type: "direct", participants: [sender, recipient] })
      .select()
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error creating conversation" });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const recentChats = async (req: express.Request, res: express.Response) => {
  const {userId} = req.params
  console.log('userId', userId)
  const db = await run();
  const messages = db.collection('messages')
  const result = await messages.aggregate([
    {
      $match: { $or: [{senderId: userId}, {receiverId: userId}]}
    },
    {
      $sort: {createdAt: -1}
    },
    {
      $group: {
        _id: "$conversationId",
        lastMessage: {$first: "$message"},
        senderId: {$first: "$senderId"},
        recipientId: {$first: "$receiverId"}

      }
    }
  ]).toArray()

  const userDetails = Promise.all(result.map(async (conversation: any) => {
    const receiverDetails = await supabase.from("users").select("first_name, last_name, id, username, email").eq("id", conversation.recipientId)

    return {
      ...receiverDetails,
      lastMessage: conversation.lastMessage
    }
  }))

  const recentConversations = (await userDetails).map(({ data, lastMessage }) => {
    return {
    ...data[0],
    lastMessage
  }
  });
  console.log('result', recentConversations)
  res.status(200).json(recentConversations.flat())
}
