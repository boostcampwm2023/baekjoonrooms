import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

import {
  ChatEvent,
  MessageInterface,
  RoomMessagesLocalStorage,
} from '../types/Message';
import { FaArrowRight } from 'react-icons/fa6';
import Message from './Message';

export default function Chat({
  username,
  userColor,
  roomId,
}: {
  username: string;
  roomId: string;
  userColor: string;
}) {
  const serverUrl = import.meta.env.VITE_BASE_URL;

  let inputRef = useRef<HTMLInputElement>(null);
  let messagesRef = useRef<HTMLUListElement>(null);
  let [messages, setMessages] = useState<MessageInterface[]>([]);
  let socketRef = useRef<Socket | null>(null);

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
      username: username,
      body: inputText,
      chatEvent: ChatEvent.Message,
      color: userColor,
    };

    socket.emit('message', newChatMessage, (response) => {
      console.log('response from server', response);
    });

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
      if (storedRoomMessages && storedRoomMessages.roomId == roomId) {
        setMessages(storedRoomMessages.messages);
      }
    }

    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, newMessage];

        // console.log('newMessages', newMessage);

        localStorage.setItem(
          'leetRoomsMessages',
          JSON.stringify({
            roomId: roomId,
            messages: newMessages,
          }),
        );
        return newMessages;
      });
    });

    socket.on('keep-alive', () => {
      socket.emit('keep-alive', 'keep-alive-message-client');
    });

    socketRef.current = socket;
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function autoScrollToLatestMessage() {
      if (!messagesRef.current) {
        return;
      }

      const latestMessage = messagesRef.current.lastElementChild;
      latestMessage?.scrollIntoView({
        behavior: 'auto',
      });
    }

    autoScrollToLatestMessage();
  }, [messages]);

  return (
    <div className="flex h-full w-full flex-col justify-end bg-aod_green">
      <div
        // id="leetrooms-chat"
        className="border-transparent mx-2 grow overflow-auto border px-3 py-[10px]">
        <ul ref={messagesRef} className="flex flex-col gap-y-1.5">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </ul>
      </div>
      <div className="border-transparent bg-lc-fg-light focus-within:border-blue-500 hover:border-blue-500 dark:bg-lc-fg mx-2 mb-2.5 flex flex-row items-center justify-between gap-x-2 rounded-lg border py-[5px] pl-3 pr-2">
        <form onSubmit={handleSubmitMessage} className="flex-grow">
          <input
            ref={inputRef}
            type="text"
            name="chatbox"
            id="chatbox"
            className="bg-lc-fg-light dark:bg-lc-fg w-full  outline-none"
            placeholder="Type a message..."
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />
        </form>

        <div
          onClick={handleSubmitMessage}
          className={` bg-lc-fg-light hover:bg-zinc-200 dark:bg-lc-fg dark:hover:bg-zinc-600 rounded-md p-2 transition-all`}></div>
        <FaArrowRight />
      </div>
    </div>
  );
}
