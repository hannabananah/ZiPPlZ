import { useNavigate } from 'react-router-dom';

const chatRooms = [
  { id: 1, name: '채팅방1 Chat' },
  { id: 2, name: '챗쳌쳌 Chat' },
  { id: 3, name: '체크초코 Chat' },
];

export default function ChatList() {
  const navigate = useNavigate();

  const handleRoomClick = (roomId: number) => {
    navigate(`chatroom/${roomId}`);
  };

  return (
    <>
      <h2>Chat List</h2>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id}>
            <button onClick={() => handleRoomClick(room.id)}>
              {room.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
