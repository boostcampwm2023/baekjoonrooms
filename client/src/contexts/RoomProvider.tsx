import { ReactNode, createContext, useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import { RoomInfoType } from '../types/RoomInfoType';
import { ProblemType } from '../types/ProblemType';
import { useRoomStore } from '../store/roomStore';

export type RoomContextType = {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  messagesRef: React.RefObject<HTMLUListElement>;
  socketRef: React.RefObject<Socket | null>;
};

export const RoomContext = createContext<RoomContextType>(
  {} as RoomContextType,
);

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const serverUrl = import.meta.env.VITE_BASE_URL;
  const { setRoomInfo, setProblems, roomId } = useRoomStore();

  // const location = useLocation();

  // const isHost = location.state?.isHost;
  // const roomCode = location.state?.roomCode;
  // const roomId = useParams<{ roomId: string }>().roomId;

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLUListElement>(null);
  const socketRef = useRef<Socket | null>(null);

  // const [messages, setMessages] = useState<MessageInterface[]>([]);

  // const [roomInfo, setRoomInfo] = useState<RoomInfoType>({} as RoomInfoType);

  // const [problems, setProblems] = useState<ProblemType[]>([]);

  // const [duration, setDuration] = useState<number>(0); // minutes

  useEffect(() => {
    const socket: Socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('room-info', (newRoomInfo: RoomInfoType) => {
      console.log('room-info', newRoomInfo);
      setRoomInfo(newRoomInfo);

      if (newRoomInfo.problems && newRoomInfo.problems.length > 0) {
        newRoomInfo.problems.forEach((problem: ProblemType) => {
          problem.url = `https://www.acmicpc.net/problem/${problem.bojProblemId}`;
        });

        setProblems(newRoomInfo.problems);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, serverUrl, setProblems, setRoomInfo]);

  return (
    <RoomContext.Provider
      value={{
        inputRef,
        messagesRef,
        socketRef,
      }}>
      {children}
    </RoomContext.Provider>
  );
};
