import "./ChatContainer.css";
import ChatMessage from "./ChatMessage";
import { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { useParams } from "react-router-dom";
import { BsEmojiSmile, BsThreeDotsVertical } from "react-icons/bs";
import { serverTimestamp, addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getDoc } from "firebase/firestore";
import { orderBy } from "firebase/firestore";
import { query } from "firebase/firestore";


function Chatcontainer({ currentUser }) {
    const chatBox = useRef(null);
    const { emailID } = useParams();
    const [open, setopen] = useState(false)
    const [message, setMessage] = useState("")
    const [chatUser, setChatUser] = useState({});
    const [chatMessages, setChatMessages] = useState([]);
    const [messages, setmessages] = useState("")




    useEffect(() => {
        const getAllUsers = async () => {
            const user = doc(db, "users", emailID);
            const snapshot = await getDoc(user)
            setChatUser(snapshot.data());

        };

        getAllUsers();


    }, [emailID])

    useEffect(() => {
        const getMessages = async () => {
            const chat = doc(db, "chats", currentUser.email);
            const hello = query(collection(chat, 'messages'), orderBy('timeStamp', 'asc'))


            onSnapshot(hello, (snapshot) => {
                setmessages(snapshot.docs.map(doc => doc.data()))
            })


            let newMessage = messages.filter((message) =>
                message.senderEmail === emailID || currentUser.email || message.receiverEmail === currentUser.email || emailID 
            );

            setChatMessages(newMessage)

        };

        getMessages();

    }, [emailID])

    async function del(id) {
        alert('are u sure to want to delete the message')

        const chats = doc(db, "chats", currentUser.email);
        const mes = doc(chats, 'messages',id)
        await updateDoc(mes, {
            text: 'this message is deleted'
        })


        const chat = doc(db, "chats", emailID);
        const mess = doc(chat, 'messages',id)
        await updateDoc(mess, {
            text: 'this message is deleted'
        })


    }


    useEffect(() => {
        chatBox.current.addEventListener("DOMNodeInserted", (event) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: "smooth" });
        });
        console.log('chat messages', chatMessages)
    }, [chatMessages]);


    const send = (e) => {
        e.preventDefault();
        if (message === '') {
            alert('msg couldnt be empty')
        }

        if (emailID) {
            let payload = {
                text: message,
                senderEmail: currentUser.email,
                receiverEmail: emailID,
                timeStamp: serverTimestamp()
            };
            // sender
            async function sending() {
                const chats = doc(db, "chats", currentUser.email);
                const messages = collection(chats, 'messages')
                await addDoc(messages, payload)

                const chat = doc(db, "chats", emailID);
                const message = collection(chat, 'messages')
                await addDoc(message, payload)

            }
            sending()
            setMessage("");
        }
    };




    return (
        <div className="chat-container">
            <div className="chat-container-header">
                <div className="chat-user-info">
                    <div className="chat-user-img">
                        <img src={chatUser?.photoURL} alt="" />
                    </div>
                    <p>{chatUser?.fullname}</p>
                </div>

                <div className="chat-container-header-btn">
                    <BsThreeDotsVertical size='23px' color='grey' />
                </div>
            </div>



            <div style={{ backgroundImage: "url(./bg.png)" }} className="chat-display-container" ref={chatBox} >

                {chatMessages.map((message) => {
                    return (

                        <ChatMessage onClick={del}
                            message={message.text}
                            timestamp={message.timeStamp}
                            sender={message.senderEmail}
                            del={() => del(message.uid)}

                        />

                    )



                }

                )}

            </div>


            <div className="chat-input">



                <div className="chat-input-btn">
                    <BsEmojiSmile style={{ margin: 6 }} color='grey' size="23px" onClick={() => setopen(!open)} />
                    <MdOutlineKeyboardVoice style={{ margin: 6 }} color='grey' size="23px" value={{ color: 'grey', size: '50px' }} />
                </div>
                <form onSubmit={send} >
                    <input
                        type="text"
                        placeholder="Type a Message"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    />
                </form>
                {/* send button */}
                <div onClick={send} className="chat-input-send-btn" >
                    <FaPaperPlane />
                </div>
            </div>
        </div>
    );
}

export default Chatcontainer;