import { useAuthUpdateContext } from '../../contexts/useAuthUpdateContext';

export default function LogoutButton() {
  const { onLogout } = useAuthUpdateContext();

  return (
    <button
      className="m-4 rounded-lg border p-2.5 px-5 text-sm text-text_default bg-fg/25"
      onClick={onLogout}>
      LOGOUT
    </button>
  );
}
