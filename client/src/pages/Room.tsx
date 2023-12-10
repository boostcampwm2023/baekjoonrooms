import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Problems from '../components/Room/Problems';
import ScoreboardButton from '../components/buttons/ScoreBoardButton';
import Chat from '../components/Room/Chat';
import StartButton from '../components/buttons/StartButton';
import RoomInfo from '../components/Room/RoomInfo';
import { MessageInterface, RoomMessagesLocalStorage } from '../types/Message';
import { RoomInfoType } from '../types/RoomInfoType';
import { useLocalStorage } from '../contexts/LocalStorageProvider';
import { ProblemType } from '../types/ProblemType';

export default function Room() {
  const serverUrl = import.meta.env.VITE_BASE_URL;

  const location = useLocation();

  const isHost = location.state?.isHost;
  const roomCode = location.state?.roomCode;
  const roomId = useParams<{ roomId: string }>().roomId;

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLUListElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const { getItem, setItem } = useLocalStorage();
  const [messages, setMessages] = useState<MessageInterface[]>([]);

  const [roomInfo, setRoomInfo] = useState<RoomInfoType>({
    participantNames: [],
    problems: [],
    isStarted: false,
    endTime: '',
  });

  const [problems, setProblems] = useState<ProblemType[]>([]);

  useEffect(() => {
    const socket: Socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
    });

    const storedRoomMessagesString = getItem(`${roomId}-messages`);

    if (storedRoomMessagesString) {
      const storedRoomMessages: RoomMessagesLocalStorage = JSON.parse(
        storedRoomMessagesString,
      );
      if (storedRoomMessages) {
        setMessages(storedRoomMessages.messages);
      }
    }

    socket.on('chat-message', (newMessage) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, newMessage];

        setItem(
          `${roomId}-messages`,
          JSON.stringify({
            messages: newMessages,
          }),
        );
        return newMessages;
      });
    });

    socket.on('room-info', (roomInfo) => {
      console.log('room-info', roomInfo);
      setRoomInfo(roomInfo);
    });

    socketRef.current = socket;
    return () => {
      socket.disconnect();
    };
  }, [getItem, roomId, serverUrl, setItem]);

  useEffect(() => {
    function autoScrollToLatestMessage() {
      if (!messagesRef.current) {
        return;
      }

      const latestMessage = messagesRef.current.lastElementChild;
      latestMessage?.scrollIntoView({
        behavior: 'smooth',
      });
    }

    autoScrollToLatestMessage();
  }, [messages]);

  return (
    <div className="flex items-center justify-center bg-fg">
      <div className="flex h-screen w-full flex-col items-center gap-2 rounded-lg bg-bg p-4 shadow-2xl md:w-[70%] lg:w-[50%]">
        <RoomInfo roomCode={roomCode} />
        <Problems
          isHost={isHost}
          problems={problems}
          setProblems={setProblems}
        />
        <ScoreboardButton />
        <StartButton
          isHost={isHost}
          socketRef={socketRef}
          roomInfo={roomInfo}
        />
        <Chat
          messages={messages}
          inputRef={inputRef}
          messagesRef={messagesRef}
          socketRef={socketRef}
        />
      </div>
    </div>
  );
}
