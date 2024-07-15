import {Database, getDatabase, ref, set, onValue, push} from 'firebase/database';

export default async function pushMessagetoThread(threadId: string, messageData: Object) {
    const db: Database = getDatabase();

    const generateId = () => {
        let id = "";
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 10; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return id;
    }

    const messageId = generateId();
    const messageRef = ref(db, 'messages/' + threadId);

    try {
        const key = await push(messageRef, messageData).key;
        return {message: 'Message sent', key: key, threadId: threadId};
    } catch (error) {
        return {message: 'Message not sent', error: error };
    }
}