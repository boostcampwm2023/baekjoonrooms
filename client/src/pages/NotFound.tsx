import { FaRegSadTear } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center gap-10 overscroll-none bg-bg pt-5">
      <FaRegSadTear size="10rem" className="text-gold" />
      <div className="text-center text-xl font-bold text-gold md:text-3xl lg:text-5xl">
        404 Not Found
      </div>
    </div>
  );
}
