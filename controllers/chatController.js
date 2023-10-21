const Chat = require('../models/chat');

const createChat = async (req, res) => {
  const { participants/*, avatar */, nameVocabulary } = req.body;

  try {
    if (!participants /*|| !avatar*/) {
      return res.status(400).json({ error: 'Insufficient data' });
    }

    const chat = await Chat.create({
      participants: participants,
      /*avatar: avatar,*/
      nameVocabulary: nameVocabulary,
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

const getChatById = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const chat = await Chat.findOne({ id: chatId });
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    res.status(200).json(chat);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}


const getChatsByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const chats = await Chat.find({ 'participants.id': userId });

    if (!chats || chats.length === 0) {
      return res.status(404).json({ message: 'Chats not found for the user' });
    }

    res.status(200).json(chats);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

const addMessage = async (req, res) => {
  try {
    const chatId = req.params.id;
    const newMessage = req.body;

    const updatedChat = await Chat.findOneAndUpdate(
      { id: chatId },
      { $push: { messages: newMessage } },
      { new: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    return res.status(200).json(updatedChat);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

const editMessage = async (req, res) => {
  try {
    const { params, body } = req;
    const messageId = params.messageId;
    const chatId = params.chatId;

    const chat = await Chat.findOne({ id: chatId });
    const messageIndex = chat.messages.findIndex((message) => message.id === messageId);

    if (messageIndex === -1) {
      return res.status(404).json({ message: 'Message not found' });
    }

    chat.messages[messageIndex].content = body.content;

    await chat.save();

    res.status(200).json({ chat });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

const removeMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const chatId = req.params.chatId;

    const updatedChat = await Chat.findOneAndUpdate(
      { id: chatId },
      { $pull: { messages: { id: messageId } } },
      { new: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    return res.status(200).json(updatedChat);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createChat,
  getChatById,
  getChatsByUserId,
  addMessage,
  editMessage,
  removeMessage
}