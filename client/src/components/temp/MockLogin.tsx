import axios from 'axios';

export default function MockLogin() {
  const baseURL = import.meta.env.VITE_BASE_URL;

  async function mockLogin({ id }: { id: string }) {
    const mockUser = {
      username: `mock${id}`,
      password: `mock${id}`,
    };
    const response = await axios.post(`${baseURL}/auth/mock`, mockUser, {
      withCredentials: true,
    });
    if (response.status === 201) {
      console.log(response.data);
      // AuthProvider의 useEffect가 실행되지 않아서 새로고침을 해줘야 함
      // 원래라면 AuthProvider에 따로 메서드를 만들어줘야하는게 맞는데 mock이라서 그냥 새로고침으로 대체
      window.location.reload();
    }
  }

  return (
    <div className="flex gap-2">
      <button
        id="1"
        className="text-text_default bg-default_black my-2 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm hover:hover:bg-opacity-50"
        onClick={() => {
          mockLogin({ id: '1' });
        }}>
        Mock 1
      </button>
      <button
        id="2"
        className="text-text_default bg-default_black my-2 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm hover:hover:bg-opacity-50"
        onClick={() => {
          mockLogin({ id: '2' });
        }}>
        Mock 2
      </button>
      <button
        id="3"
        className="text-text_default bg-default_black my-2 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm hover:hover:bg-opacity-50"
        onClick={() => {
          mockLogin({ id: '3' });
        }}>
        Mock 3
      </button>
      <button
        id="4"
        className="text-text_default bg-default_black my-2 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm hover:hover:bg-opacity-50"
        onClick={() => {
          mockLogin({ id: '4' });
        }}>
        Mock 4
      </button>
    </div>
  );
}
