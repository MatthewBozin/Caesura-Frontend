import axios from "axios";

const URL = axios.create({
    baseURL: "http://localhost:8000",
    headers: {"Content-type": "application/json"}
})

class DataService {
    test() {
        return URL.post(`/signup`, {
            userName: 'testo',
            email: 'testo@testo.com',
            password: 'testotesto',
            confirmPassword: 'testotesto',
            chef: 'on'
        })
    }
}

export default new DataService();