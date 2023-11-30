import axios from 'axios';
import { RoomCreateResponseType } from '../types/RoomCreateResponseType';

export async function createRoom(): Promise<RoomCreateResponseType | undefined> {
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
