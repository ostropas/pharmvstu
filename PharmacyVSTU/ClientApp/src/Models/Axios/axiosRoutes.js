import axios from "../Axios/axios.js"

class DevAxios
{
    post(url, data, expetedResponse) {
        console.log("POST")
        console.log("Url: " + url);
        console.log("Data: " + JSON.stringify(data));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let res = {data:expetedResponse}
                resolve(res)
            }, 2000);            
        })
    }

    get(url, expetedResponse) {
        console.log("GET")
        console.log("Url: " + url);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let res = {data:expetedResponse}
                resolve(res)
            }, 2000);            
        })
    }

    put(url, data, expetedResponse) {
        console.log("PUT")
        console.log("Url: " + url);
        console.log("Data: " + JSON.stringify(data));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let res = {data:expetedResponse}
                resolve(res)
            }, 2000);            
        })
    }
}

class Routes {
    sender = process.env.NODE_ENV === 'development' ? new DevAxios() : axios;

    signIn(email, pass)
    {
        return this.sender.post("/auth", {email: email, password: pass}, "jwttoken")
    }

    signUp(email, pass, fio, isDoctor)
    {
        return this.sender.post("/reg", {email: email, password: pass, fio: fio, doctor:isDoctor}, "jwttoken")
    }

    getUserData()
    {
        return this.sender.get("/user", {
            "id": 1,
            "email": "test@test.ru",
            "fio": "Иванов Иван Иванович",
            "doctor": true
          })
    }

    getDoctorData(doctorId)
    {
        return this.sender.get(`/doctor/info?doctorId=${doctorId}`, {
            "doctorId": 1,
            "fio": "Иванов Иван Иванович",
            "info": "Такой крутой парень"
          })
    }

    updatePatientData(data)
    {
        return this.sender.put("/patient/info", data, {
            "succsess": true
          })
    }


    updateDoctorData(data)
    {
        return this.sender.put("/doctor/info", data, {
            "succsess": true
          })
    }
}

export default new Routes;
