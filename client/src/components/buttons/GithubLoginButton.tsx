export default function GithubLoginButton() {
  async function login(): Promise<void> {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    window.location.assign(`${baseUrl}/auth/github/`);
  }

  return (
    <button
      className="hover:bg-gray-600 my-2 flex items-center rounded-lg bg-aod_black px-5 py-2.5 text-sm text-aod_text"
      onClick={login}>
      <img
        src="/assets/Github.png"
        alt="GitHub logo"
        className="mr-2 h-5 w-5"
      />
      Login with GitHub
    </button>
  );
}
