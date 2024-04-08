import { create } from 'zustand';
import { RoomInfoType } from '../types/RoomInfoType';
import { ProblemType } from '../types/ProblemType';
import { useLocation, Location } from 'react-router-dom';
import { RoomStoreType } from '../types/RoomStoreType';

interface ExtendedLocationState {
  isHost: boolean;
  roomCode: string;
}

interface ExtendedLocation extends Location<ExtendedLocationState> {}

export const useRoomStore = create<RoomStoreType>((set) => {
  const location: ExtendedLocation = useLocation();
  return {
    isHost: location.state?.isHost,
    roomCode: location.state?.roomCode,
    roomId: '',
    messages: [],
    setMessages: (messages) => set((state) => ({
      ...state,
      messages: typeof messages === 'function' ? messages(state.messages) : messages,
    })),
    roomInfo: {} as RoomInfoType,
    setRoomInfo: (roomInfo: RoomInfoType) => set({ roomInfo }),
    problems: [],
    setProblems: (problems: ProblemType[]) => set({ problems }),
    duration: 0,
    setDuration: (duration: number) => set({ duration }),
  };
});
