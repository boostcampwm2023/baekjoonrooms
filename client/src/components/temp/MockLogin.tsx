import { mockLoginApi } from '../../apis/mockLogin';

export default function MockLogin() {
  async function mockLogin({ id }: { id: string }) {
    const mockUser = {
      username: `mock${id}`,
      password: `mock${id}`,
    };
    const response = await mockLoginApi(mockUser);
    console.log(response);
    if (response?.status === 201) {
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
        className="my-2 flex items-center gap-2 rounded-lg bg-default_black px-4 py-2.5 text-sm text-text_default hover:hover:bg-opacity-50"
        onClick={() => {
          mockLogin({ id: '1' });
        }}>
        Mock 1
      </button>
      <button
        id="2"
        className="my-2 flex items-center gap-2 rounded-lg bg-default_black px-4 py-2.5 text-sm text-text_default hover:hover:bg-opacity-50"
        onClick={() => {
          mockLogin({ id: '2' });
        }}>
        Mock 2
      </button>
      <button
        id="3"
        className="my-2 flex items-center gap-2 rounded-lg bg-default_black px-4 py-2.5 text-sm text-text_default hover:hover:bg-opacity-50"
        onClick={() => {
          mockLogin({ id: '3' });
        }}>
        Mock 3
      </button>
      <button
        id="4"
        className="my-2 flex items-center gap-2 rounded-lg bg-default_black px-4 py-2.5 text-sm text-text_default hover:hover:bg-opacity-50"
        onClick={() => {
          mockLogin({ id: '4' });
        }}>
        Mock 4
      </button>
    </div>
  );
}
