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
  const recentChatConversations = await getRecentChats(userId)
  res.status(200).json(recentChatConversations)
}

export const getRecentChats = async (userId: string) => {
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
  console.log('result', result)
  
  const userDetails = await Promise.all(result.map(async (conversation: any) => {
    const recentId = conversation.senderId === userId ? conversation.recipientId : conversation.senderId
    const { data: receiverDetails, error } = await supabase
      .from("users")
      .select("first_name, last_name, id, username, email, photo_url")
      .eq("id", recentId)
      .single();
    
    if (error || !receiverDetails) {
      console.error('Error fetching user details:', error);
      return null;
    }

    let photo_url = receiverDetails.photo_url || null;
    if (photo_url) {
      try {
        const { getPresignedUrl } = await import("../services/s3-service");
        const url = new URL(photo_url);
        const key = decodeURIComponent(url.pathname.slice(1));
        photo_url = await getPresignedUrl(key);
      } catch (e) {
        console.error('Error generating presigned URL for recent chat', recentId, e);
      }
    }

    return {
      id: receiverDetails.id,
      firstname: receiverDetails.first_name,
      lastname: receiverDetails.last_name,
      username: receiverDetails.username,
      email: receiverDetails.email,
      photo_url,
      lastMessage: conversation.lastMessage
    }
  }))

  const recentConversations = userDetails.filter(u => u !== null);
  return recentConversations;
}
