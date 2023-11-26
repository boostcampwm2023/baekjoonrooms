import { useAuthUpdateContext } from '../../contexts/AuthContext';

export default function LogoutButton() {
  const { onLogout } = useAuthUpdateContext();

  return (
    <button
      className="text-aod_text_alt  bg-aod_gutter m-4 rounded-lg p-2.5 px-5 text-sm hover:bg-gray-600"
      onClick={onLogout}>
      Log out
    </button>
  );
}
