import { FaGithub } from 'react-icons/fa6';

export default function GithubLoginButton() {
  async function login(): Promise<void> {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    window.location.assign(`${baseUrl}/auth/github/`);
  }

  return (
    <button
      className="text-text_default bg-default_black my-2 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm hover:bg-opacity-50"
      onClick={login}>
      <FaGithub size="1rem" />
      Login with GitHub
    </button>
  );
}
