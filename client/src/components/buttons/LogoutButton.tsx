import { useAuthUpdateContext } from '../../hooks/useAuthUpdateContext';

export default function LogoutButton() {
  const { onLogout } = useAuthUpdateContext();

  return (
    <button
      className="my-4 rounded-lg border bg-fg/25 p-2.5 px-5 text-sm text-text_default hover:bg-fg/50"
      onClick={onLogout}>
      LOGOUT
    </button>
  );
}
