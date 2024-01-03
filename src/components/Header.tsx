
interface TextBarProps {
  roomId: string,
}

const Header: React.FC<TextBarProps>  = ( { roomId } ) => {
    return (
      <header className="h-[10%] bg-blue-800 text-white flex items-center justify-start">
        <p className="w-[5%]"></p>
        多媒體網路 ｜ 現在在聊天室 { roomId }
      </header>
    );
  };
  
  export default Header;