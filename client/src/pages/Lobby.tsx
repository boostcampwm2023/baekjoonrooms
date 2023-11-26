import LogoutButton from '../components/buttons/LogoutButton';
import Profile from '../components/Profile';
import RoomAccessPanel from '../components/RoomAccessPanel';

// import axios from 'axios';

export default function Lobby() {
  async function testApi(): Promise<void> {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    // const response = await axios.get(`${baseUrl}/auth/github/`);
    window.location.href = `${baseUrl}/auth/github/`;
    // console.log(response);
  }

  return (
    <div className="min-h-screen bg-aod_bg">
      <div className="flex w-full justify-end">
        <LogoutButton />
      </div>
      <div className="mt-32 flex flex-col items-center">
        <Profile />
        <RoomAccessPanel />
        <button
          onClick={() => {
            testApi();
          }}>
          testtest
        </button>
      </div>
    </div>
  );
}
