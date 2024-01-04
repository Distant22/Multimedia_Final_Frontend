import { useState } from 'react';

interface WelcomeProps {
    onSubmit: (userData: string, roomData: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onSubmit }) => {
    const [userData, setUserData] = useState('');
    const [roomData, setRoomData] = useState('');

    const handleSubmit = () => {
        // Pass the collected data to the parent component (ChatPage)
        onSubmit(userData, roomData);
    };

    return (
        <header className="h-full bg-white text-black flex flex-col items-center justify-center space-y-8">
            <p className="text-2xl flex">多媒體網路 期末專案</p>
            <label htmlFor="roomDataInput">輸入聊天室名稱</label>
            <input
                id="roomDataInput"
                className="w-36 h-12 rounded-full text-white px-8"
                value={roomData}
                onChange={(e) => setRoomData(e.target.value)}
            />
            <label htmlFor="userDataInput">輸入使用者名稱</label>
            <input
                id="userDataInput"
                className="w-36 h-12 rounded-full text-white px-8"
                value={userData}
                onChange={(e) => setUserData(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </header>
    );
};

export default Welcome;
