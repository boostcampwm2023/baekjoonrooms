import { useState } from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import { useQuery } from '@tanstack/react-query';

import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../../utils/localStorage';
import { getMyInfo } from '../../apis/getMyInfo';

export default function Profile() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getMyInfo,
    staleTime: Infinity,
  });
  const userInfo = { provider: user?.provider, providerId: user?.providerId };
  const [imageError, setImageError] = useState(false);

  if (
    !getLocalStorageItem('userInfo') ||
    getLocalStorageItem('userInfo') !== JSON.stringify(userInfo)
  ) {
    setLocalStorageItem('userInfo', JSON.stringify(userInfo));
  }

  // TODO: AuthContext쪽 UserType 재정의
  return (
    <div className="mb-6 flex items-center justify-center gap-3">
      {imageError ? (
        <FaCircleUser size={48} />
      ) : (
        <img
          className="w-12 rounded-full"
          src={user?.avatarUrl}
          onError={() => setImageError(true)}
          alt="프로필 이미지"
        />
      )}
      <p className="text-lg font-semibold text-text_default">
        {user?.username}
      </p>
    </div>
  );
}
