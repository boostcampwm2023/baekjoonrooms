export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-green-400/50 to-blue-500/50">
      <h1 className="my-2 text-3xl font-bold">BOJ Rooms</h1>
      <button className="my-2 flex items-center rounded-lg bg-gray-800 px-5 py-2.5 text-sm text-white hover:bg-gray-600">
        <img
          src="../assets/Github.png"
          alt="GitHub logo"
          className="mr-2 h-5 w-5"
        />
        Login with GitHub
      </button>
      <button className="my-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
        Test Login
      </button>
    </div>
  );
}
