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
