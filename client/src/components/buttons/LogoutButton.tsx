import { useAuthUpdateContext } from '../../contexts/AuthContext';

export default function LogoutButton() {
  const { onLogout } = useAuthUpdateContext();

  return (
    <button
      className="hover:bg-gray-600 m-4 rounded-lg bg-gutter p-2.5 px-5 text-sm text-guide"
      onClick={onLogout}>
      Log out
    </button>
  );
}
