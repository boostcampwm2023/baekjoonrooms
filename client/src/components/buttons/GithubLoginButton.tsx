import { FaGithub } from 'react-icons/fa6';

export default function GithubLoginButton() {
  async function login(): Promise<void> {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    window.location.assign(`${baseUrl}/auth/github/`);
  }

  return (
    <button
      className="hover:bg-gray-600 my-2 flex items-center gap-2 rounded-lg bg-aod_black px-4 py-2.5 text-sm text-aod_text"
      onClick={login}>
      <FaGithub size="1rem" />
      Login with GitHub
    </button>
  );
}
