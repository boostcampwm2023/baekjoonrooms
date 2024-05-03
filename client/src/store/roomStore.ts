import { create } from 'zustand';
import { RoomInfoType } from '../types/RoomInfoType';
import { ProblemType } from '../types/ProblemType';
import { RoomStoreType } from '../types/RoomStoreType';

export const useRoomStore = create<RoomStoreType>((set) => ({
  roomId: '',
  messages: [],
  setMessages: (messages) =>
    set((state) => ({
      ...state,
      messages:
        typeof messages === 'function' ? messages(state.messages) : messages,
    })),
  roomInfo: {} as RoomInfoType,
  setRoomInfo: (roomInfo: RoomInfoType) => set({ roomInfo }),
  problems: [],
  setProblems: (problems: ProblemType[]) => set({ problems }),
  duration: 0,
  setDuration: (duration: number) => set({ duration }),
}));
