import axios from "axios";

export default async function configureAxios(): Promise<void> {
    axios.defaults.baseURL = "http://localhost:8000";

    axios.defaults.timeout = 3000;
}
