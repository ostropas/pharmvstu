import axios from "../Axios/axios.js"

class Routes {
    signIn(email, pass)
    {
        return axios.post("/auth", {email: email, password: pass})
    }

    signUp(email, pass, fio)
    {
        return axios.post("/reg", {email: email, password: pass, fio: fio})
    }
}

export default new Routes;
