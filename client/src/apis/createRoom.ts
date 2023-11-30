import axios from 'axios';

export async function createRoom() : Promise<string | undefined> {
    return await axios.get('http://api.baekjoonrooms.com/room', {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            "userId": 1,
        }
    }).then((response) => {
        return response.data;
    }
    ).catch((error) => {
        console.log(error);
    });
}