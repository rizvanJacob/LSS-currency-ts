import axios from 'axios';

async function postRequest(url: string, data: object, setState: React.Dispatch<React.SetStateAction<any>>  ) {
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            setState(response.data);
        }
        console.log(response.data);
    } catch (err) {
        console.error(err);
    }
}

export default postRequest;