import { useNavigate } from 'react-router-dom';

export default function RoomCreateButton() {
  // TODO: 방 생성 api가 개발되면 그때 navigate로직을 변경

  const getNewRoomId = async () => {
    return 'q1w2e3';
  };

  const navigate = useNavigate();
  const onClick = async () => {
    const roomId = await getNewRoomId();
    navigate(`/room/${roomId}`, { state: { isMaster: true } });
  };

  return (
    <button
      className="flex h-[33px] w-[150px] items-center justify-center rounded-lg bg-aod_accent font-medium text-aod_white hover:opacity-80"
      onClick={onClick}>
      Create room
    </button>
  );
}
