import { ReactNode, createContext, useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { useLocalStorage } from './LocalStorageProvider';
import { MessageInterface } from '../types/Message';
import { RoomInfoType } from '../types/RoomInfoType';
import { ProblemType } from '../types/ProblemType';
import { useLocation, useParams } from 'react-router-dom';

export type RoomContextType = {
  isHost: boolean;
  roomCode: string;
  roomId: string | undefined;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  messagesRef: React.RefObject<HTMLUListElement>;
  socketRef: React.RefObject<Socket | null>;
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  messages: MessageInterface[];
  setMessages: React.Dispatch<React.SetStateAction<MessageInterface[]>>;
  roomInfo: RoomInfoType;
  setRoomInfo: React.Dispatch<React.SetStateAction<RoomInfoType>>;
  problems: ProblemType[];
  setProblems: React.Dispatch<React.SetStateAction<ProblemType[]>>;
};

export const RoomContext = createContext<RoomContextType>(
  {} as RoomContextType,
);

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const serverUrl = import.meta.env.VITE_BASE_URL;

  const location = useLocation();

  const isHost = location.state?.isHost;
  const roomCode = location.state?.roomCode;
  const roomId = useParams<{ roomId: string }>().roomId;

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLUListElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const { getItem, setItem } = useLocalStorage();
  const [messages, setMessages] = useState<MessageInterface[]>([]);

  const [roomInfo, setRoomInfo] = useState<RoomInfoType>({} as RoomInfoType);

  const [problems, setProblems] = useState<ProblemType[]>([]);

  // const [duration, setDuration] = useState<number>(0); // minutes
  // const [endTime, setEndTime] = useState<Date>({} as Date);

  useEffect(() => {
    const socket: Socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('room-info', (roomInfo) => {
      setRoomInfo(roomInfo);
    });

    return () => {
      socket.disconnect();
    };
  }, [getItem, roomId, serverUrl, setItem]);

  return (
    <RoomContext.Provider
      value={{
        isHost,
        roomCode,
        roomId,
        inputRef,
        messagesRef,
        socketRef,
        getItem,
        setItem,
        messages,
        setMessages,
        roomInfo,
        setRoomInfo,
        problems,
        setProblems,
      }}>
      {children}
    </RoomContext.Provider>
  );
};
