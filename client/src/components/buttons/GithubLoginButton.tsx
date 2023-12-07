import { FaGithub } from 'react-icons/fa6';
import { useTheme } from '../../hooks/useTheme';

export default function GithubLoginButton() {
  async function login(): Promise<void> {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    window.location.assign(`${baseUrl}/auth/github/`);
  }

  const { theme } = useTheme();

  return (
    <button
      // theme에 dark가 들어가있다면 text color를 text_default, light가 들어가있다면 text color를 default_white으로 설정
      className={`my-2 flex items-center gap-2 rounded-lg bg-default_black px-4 py-2.5 text-sm hover:bg-opacity-50
      ${theme.includes('dark') ? 'text-text_default' : 'text-default_white'}`}
      onClick={login}>
      <FaGithub size="1rem" />
      Login with GitHub
    </button>
  );
}
