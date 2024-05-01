import { useNavigate } from 'react-router-dom';
import { logout } from '../../apis/logout';
import { removeLoaclStorageItem } from '../../utils/localStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function LogoutButton() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['authStatus'], false);
      removeLoaclStorageItem('userInfo');
      navigate('/');
    },
    onError: () => {
      alert('로그아웃에 실패했습니다.');
    },
  });

  return (
    <button
      className="my-4 rounded-lg border bg-fg/25 p-2.5 px-5 text-sm text-text_default hover:bg-fg/50"
      onClick={() => mutate()}>
      LOGOUT
    </button>
  );
}
