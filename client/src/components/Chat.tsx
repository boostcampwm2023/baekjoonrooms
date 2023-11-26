import SendIcon from '../icons/SendIcon';

export default function Chat() {
  return (
    <div className="flex h-[250px] w-full flex-col justify-end">
      <div className="bg-aod_white flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5">
        <input
          className="w-full text-sm outline-none"
          placeholder="텍스트를 입력하세요"
        />
        <SendIcon />
      </div>
    </div>
  );
}
