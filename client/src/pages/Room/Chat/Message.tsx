import { userColors } from '../../../../public/userColors';
import { hash } from '../../../utils/hash';
import { ChatEvent, MessageInterface } from '../../../types/Message';
import MessageBody from './MessageBody';
import { useRoomStore } from '../../../store/roomStore';

export default function Message({ message }: { message: MessageInterface }) {
  const { roomCode } = useRoomStore();
  const generateRandomColor = (username: string) => {
    const idx = Math.abs(hash(username + roomCode) % userColors.length);
    return userColors[idx];
  };

  switch (message.chatEvent) {
    // 유저의 채팅 메세지
    case ChatEvent.Message:
      return (
        <li className="flex flex-row items-start gap-x-1 py-1">
          <span
            className={`${generateRandomColor(message.username)} font-bold`}>
            {message.username}
          </span>
          <span className="text-text_default">:&nbsp;</span>
          <span className="chat-message text-text_default">
            <MessageBody message={message.body} />
          </span>
        </li>
      );
    // 유저가 방에 들어왔을 때 메세지
    // 유저가 방에서 나갔을 때 메세지
    case ChatEvent.Join:
    case ChatEvent.Leave:
      return (
        <li className="flex flex-row items-start gap-x-1 py-1">
          <span>
            <span className="m1-1 font-bold text-accent">system&nbsp;</span>
            <span className="text-text_default">
              :&nbsp;
              {`👋`}
              &nbsp;
            </span>
            <span
              className={`${generateRandomColor(
                message.username,
              )} ml-1 font-bold`}>
              {`${message.username}`}
            </span>
            <span className="chat-message text-text_default">{`${message.body}`}</span>
          </span>
        </li>
      );
    // 유저가 문제를 제출했을 때 메세지
    case ChatEvent.Submit:
      return (
        <li className="flex flex-row items-start gap-x-1 py-1">
          <span>
            <span className="m1-1 font-bold text-accent">system&nbsp;</span>
            <span className="text-text_default">
              :&nbsp;
              {`🙌`}
              &nbsp;
            </span>
            <span
              className={`${generateRandomColor(
                message.username,
              )} ml-1 font-bold`}>
              {`${message.username}`}
            </span>
            <span className="chat-message text-text_default">{`${message.body}`}</span>
          </span>
        </li>
      );
    // 유저가 문제를 맞췄을 때 메세지
    case ChatEvent.Accepted:
      return (
        <li className="flex flex-row items-start gap-x-1 py-1">
          <span>
            <span className="m1-1 font-bold text-accent">system&nbsp;</span>
            <span className="text-text_default">
              :&nbsp;
              {`💯`}
              &nbsp;
            </span>
            <span
              className={`${generateRandomColor(
                message.username,
              )} ml-1 font-bold`}>
              {`${message.username}`}
            </span>
            <span className="chat-message text-text_default">{`${message.body}`}</span>
          </span>
        </li>
      );
    // 유저가 문제를 틀렸을 때 메세지
    case ChatEvent.Wrong:
      return (
        <li className="flex flex-row items-start gap-x-1 py-1">
          <span>
            <span className="m1-1 font-bold text-accent">system&nbsp;</span>
            <span className="text-text_default">
              :&nbsp;
              {`👎`}
              &nbsp;
            </span>
            <span
              className={`${generateRandomColor(
                message.username,
              )} ml-1 font-bold`}>
              {`${message.username}`}
            </span>
            <span className="chat-message text-text_default">{`${message.body}`}</span>
          </span>
        </li>
      );
  }
}
