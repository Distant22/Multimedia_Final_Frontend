"use client"
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

interface TextBarProps {
    roomId: string,
    userId: string
}

const Textbar: React.FC<TextBarProps> = ({ roomId, userId }) => {

    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState<[string, boolean, string][]>([]);
    const socket = io('https://multimedia-backend.onrender.com'); 
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const sendMessage = () => {
        if (currentMessage.trim() !== '') {
            
            socket.emit('message', { 
                'text' : currentMessage,
                'from' : userId,
                'room' : roomId
            });
            console.log("I send message. text：",currentMessage)
            setCurrentMessage('');
        }
    }
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };
    const fetchData = () => {
        fetch('https://multimedia-backend.onrender.com/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: currentMessage,
                from: userId,
                room: roomId
            })
        })
        .then(response => response.json())
        .then((data: { text: string, sender: string }[]) => {
            console.log('Received data from the backend:', data);
            const newTexts = data.map(item => ({
                text: item.text,
                isMe: item.sender === userId ? true : false,
                sender: item.sender
            }));
            setMessages(newTexts.map(({ text, isMe, sender }) => [text, isMe, sender]));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        console.log("好了")
        fetchData()
      }, []);
    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                console.log('Socket connected:', socket.connected);
            });
            socket.on('updatedMessages', (updatedData) => {
                console.log("Update")
                fetchData()
            });
            socket.on('message', (message) => {
                console.log("On.")
                fetchData()
            });
        }
    }, [socket, fetchData]);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            <div className="w-full h-[85%] flex flex-col p-4 overflow-y-scroll">
            {messages.map((message, index) => (
                <div key={index} className="chat-header">
                    { message[2] }
                    <div className={message[1] ? "chat chat-end" : "chat chat-start"}>
                        <div className={message[1] ? "chat-bubble chat-bubble-info" : "chat-bubble chat-bubble-accent"}>
                            {message[0]}
                        </div>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
            </div>
            <div className="w-full h-[15%] flex items-center p-2 space-x-4">
                <input
                    type="text"
                    placeholder="我想說..."
                    value={currentMessage}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    className="w-full max-w-[70%] h-[70%] rounded-full bg-gray-800 lg:pl-10 md:pl-8 pl-6" 
                />
                <button onClick={sendMessage} className="h-[70%] w-[30%] rounded-full max-w-xs flex items-center justify-center bg-gray-800 text-white">送出</button>
            </div>
        </>
    );
};

export default Textbar;

  