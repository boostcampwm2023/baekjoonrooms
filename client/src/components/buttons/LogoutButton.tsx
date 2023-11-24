import { useAuthUpdateContext } from '../../contexts/AuthContext';

export default function LogoutButton() {
  const { onLogout } = useAuthUpdateContext();

  return (
    <button
      className="m-4 rounded-lg bg-gray-800 p-2.5 px-5 text-sm text-white hover:bg-gray-600"
      onClick={onLogout}>
      Log out
    </button>
  );
}
