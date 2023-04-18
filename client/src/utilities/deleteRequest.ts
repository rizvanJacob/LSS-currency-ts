import axios from 'axios';
import { UserProps } from "../@types/@types.UserProps"
async function deleteRequest(url: string, id: string, setState: React.Dispatch<React.SetStateAction<any>>) {
    try {
        await axios.delete(url, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        setState((
            prevState: {[key: string]: any}[]) =>
            prevState.filter((state: any) => state.openId !== id)
        );
    } catch (err) {
        console.error(err);
    }
}

export default deleteRequest;