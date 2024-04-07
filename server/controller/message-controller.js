import Message from "../modal/Message.js";
import Conversation from "../modal/Conversation.js";

export const newMessage = async (request, response) => {
  try {
    const newMessage = new Message(request.body);
    await newMessage.save();

    // Update the conversation's message field
    await Conversation.findOneAndUpdate(
      { _id: request.body.conversationId },
      { $set: { message: request.body.text } }
    );

    response
      .status(200)
      .json({ message: "Message has been sent successfully" });
  } catch (error) {
    console.error("Error while saving message:", error);
    response.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (request, response) => {
  try {
    const messages = await Message.find({ conversationId: request.params.id });
    response.status(200).json(messages);
  } catch (error) {
    console.error("Error while fetching messages:", error);
    response.status(500).json({ error: "Internal server error" });
  }
};
