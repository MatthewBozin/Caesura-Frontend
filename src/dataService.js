import axios from "axios";

const URL = axios.create({
    withCredentials: true,
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
    checkLogin() {
        return URL.get(`/login`)
    }
    login(msg) {
        return URL.post(`/login`, msg)
    }
    logout() {
        return URL.get(`/logout`)
    }
}

export default new DataService();