import axios from 'axios';

async function getRequest(url: string, setState: React.Dispatch<React.SetStateAction<any>>  ) {
    try {
        const response = await axios.get(url);
        setState(response.data);
    } catch (err) {
        console.error(err);
    }
}

export default getRequest;