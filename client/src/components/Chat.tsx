import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

import {
  ChatEvent,
  MessageInterface,
  RoomMessagesLocalStorage,
} from '../types/Message';
import { FaArrowRight } from 'react-icons/fa6';
import Message from './Message';
import { useAuthContext } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';

// TODO: userColor -> 서버에서 설정
export default function Chat() {
  const roomId = useParams<{ roomId: string }>().roomId;
  const { user } = useAuthContext();

  const serverUrl = import.meta.env.VITE_BASE_URL;

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLUListElement>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const socketRef = useRef<Socket | null>(null);

  function handleSubmitMessage(event: React.SyntheticEvent) {
    event.preventDefault();

    if (
      !inputRef.current ||
      !socketRef.current ||
      (inputRef.current && !inputRef.current.value.trim())
    ) {
      return;
    }

    const socket = socketRef.current;
    const inputText = inputRef.current.value.trim();
    const newChatMessage: MessageInterface = {
      timestamp: Date.now(),
      username: user?.username || 'Anonymous',
      body: inputText,
      chatEvent: ChatEvent.Message,
      color: 'text-purple', // TODO: 서버에서 설정
    };

    socket.emit('chat-message', newChatMessage);

    inputRef.current.value = '';
  }

  useEffect(() => {
    const socket: Socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
    });

    const storedRoomMessagesString = localStorage.getItem('leetRoomsMessages');
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

        localStorage.setItem(
          'leetRoomsMessages',
          JSON.stringify({
            messages: newMessages,
          }),
        );
        return newMessages;
      });
    });

    // socket.on('keep-alive', () => {
    //   socket.emit('keep-alive', 'keep-alive-message-client');
    // });

    socketRef.current = socket;
    return () => {
      socket.disconnect();
    };
  }, [roomId, serverUrl]);

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
    <div className="flex w-full flex-1 flex-col overflow-auto">
      <div className="border-transparent mx-2 overflow-auto px-2 py-[10px]">
        <ul ref={messagesRef} className="flex flex-col gap-y-1.5">
          {messages.map((message, index) => (
            <Message key={index} message={message} user={user?.username} />
          ))}
        </ul>
      </div>
      <div className="bg-default_white mx-2 mb-2.5 flex flex-row items-center justify-center gap-x-2 rounded-lg border py-[5px] pl-3 pr-2">
        <form onSubmit={handleSubmitMessage} className="flex-grow">
          <input
            ref={inputRef}
            type="text"
            name="chatBox"
            className="w-full outline-none"
            placeholder="메세지를 입력해주세요"
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />
        </form>

        <div onClick={handleSubmitMessage}>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
}
