import { useAuthUpdateContext } from '../../hooks/useAuthUpdateContext';

export default function LogoutButton() {
  const { onLogout } = useAuthUpdateContext();

  return (
    <button
      className="m-4 rounded-lg border bg-fg/25 p-2.5 px-5 text-sm text-text_default"
      onClick={onLogout}>
      LOGOUT
    </button>
  );
}
