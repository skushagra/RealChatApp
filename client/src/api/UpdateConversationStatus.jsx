import { getDatabase, set, ref } from "firebase/database";


export default async function UpdateConversationStatus(thread, message, status, messageData) {

    const db = getDatabase();


    const updateConvRef = ref(db, 'messages/'+thread+'/'+message);

    messageData.status = status;
    try {
        await set(updateConvRef, messageData);
        return 1;
    } catch (error) {
        return 0
    }
}