export default function ThemeSettingButton({
  openModal,
}: {
  openModal: () => void;
}) {
  return (
    <button
      className="hover:bg-gray-600 my-4 rounded-lg bg-gutter p-2.5 px-5 text-sm text-guide"
      onClick={openModal}>
      Theme Setting
    </button>
  );
}
