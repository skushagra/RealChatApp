import { getDatabase, ref, set, get } from "firebase/database";

export default function recieveMessages() {

    const db = getDatabase();

    const messagesRef = ref(db, 'messages/');

    get(messagesRef).then((snapshot) => {

        const user  = localStorage.getItem('email');
        if (snapshot.exists()) {
            const data = snapshot.val();
            // update status of all messages to 'recieved'
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const element = data[key];
                    for(const messages in element) {
                        if (element[messages].status == "sent" && element[messages].sender != user) {
                            element[messages].status = "recieved";
                            set(ref(db, 'messages/' + key + '/' + messages), element[messages]);
                        }
                    }
                    
                }
            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}