import axios from 'axios';

async function putRequest(url: string, updatedData: object, setState: React.Dispatch<React.SetStateAction<any>>  ) {
    try {
        const response = await axios.put(url, updatedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            setState(response.data);
        }
    } catch (err) {
        console.error(err);
    }
}

export default putRequest;