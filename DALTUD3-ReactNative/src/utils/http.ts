import axios, {AxiosInstance} from 'axios';

const IPAddress = '192.168.1.143';
class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: `http://${IPAddress}:4000`,
            timeout: 10000,
            headers: {'Content-Type': 'application/json'},
        });
    }
}

const http = new Http().instance;

export default http;
