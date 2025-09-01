import { supabase } from "../supabase";
import { conversationCache } from "../cache";
import { run } from "../mongo";

export const messageController = async (
  sender: string,
  receiver: string,
  content: string,
  conversationId: string
) => {
  try {
    if (!conversationCache.has(conversationId)) {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("chat_id", conversationId);
      if (data) {
        conversationCache.add(conversationId);
      }
    }

    const db = await run()
      const messagesCollection = db.collection("messages");

      let message = await messagesCollection.insertOne({
        senderId: sender,
        receiverId: receiver,
        message: content,
        conversationId: conversationId,
      });
  } catch (error) {
    console.error(error);
  }
};

export const getConversationMessages = async (req: any, res: any) => {
  const { conversationId } = req.params;

  try {
    const db = await run()
    const messagesCollection = db.collection("messages");
    const messages = await messagesCollection
      .find({ conversationId: conversationId })
      .toArray();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
