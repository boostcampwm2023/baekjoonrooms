import { useAuthUpdateContext } from '../../contexts/AuthContext';

export default function LogoutButton() {
  const { onLogout } = useAuthUpdateContext();

  return (
    <button
      className="text-guide  hover:bg-gray-600 bg-gutter m-4 rounded-lg p-2.5 px-5 text-sm"
      onClick={onLogout}>
      Log out
    </button>
  );
}
