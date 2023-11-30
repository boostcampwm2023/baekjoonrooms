import axios from 'axios';
import { RoomCreateType } from '../types/RoomCreateType';

export async function createRoom(): Promise<RoomCreateType | undefined> {
  return await axios
    .post('http://api.baekjoonrooms.com/room', {
      userId: 1,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
