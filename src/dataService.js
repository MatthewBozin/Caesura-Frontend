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
            confirmPassword: 'testotesto'
        })
    }
    signup(msg) {
        return URL.post(`/signup`, msg)
    }
    checkLogin(msg) {
        return URL.get(`/login`, msg)
    }
    login(msg) {
        return URL.post(`/login`, msg)
    }
    logout(msg) {
        return URL.get(`/logout`, msg)
    }
}

export default new DataService();