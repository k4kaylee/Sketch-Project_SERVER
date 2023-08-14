const Chat = require('../models/chat');
const { v4: uuidv4 } = require('uuid');

const createChat = async (req, res) => {
    const {name, participantsId} = req.query;

    try{
        if (!name || !participantsId) {
            return res.status(400).json({ error: 'Insufficient data' });
        }

        const chat = await Chat.create(req.body);
        res.status(200).json(chat);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

const getChatsByUserId = async (req, res) => {
    const userId = req.params.id;
    try{
        const chats = await Chat.find({ participantsID: userId });
        
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
    const chatId = req.params.id;
    const { authorId, messageContent, time } = req.body;

    try{
        const chat = await Chat.findOne({ id: chatId });

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        const newMessage = {
            id: uuidv4(),
            author: authorId,
            content: messageContent,
            time: time
        };

        chat.messages.push(newMessage);
        await chat.save();
        res.status(200).json({ message: 'Message added', chat: chat });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createChat,
    getChatsByUserId,
    addMessage
}