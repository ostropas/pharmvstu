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
    devAxios = new DevAxios()
    useDev = process.env.NODE_ENV === 'development';

    post(url, data, expectedResponse)
    {
        if (this.useDev)
        {
            return this.devAxios.post(url, data, expectedResponse);
        }
        else
        {
            return axios.post(url, data)
        }
    }


    put(url, data, expectedResponse)
    {
        if (this.useDev)
        {
            return this.devAxios.put(url, data, expectedResponse);
        }
        else
        {
            return axios.put(url, data)
        }
    }
    get(url, expectedResponse)
    {
        if (this.useDev)
        {
            return this.devAxios.get(url, expectedResponse);
        }
        else
        {
            return axios.get(url)
        }
    }

    signIn(email, pass)
    {
        return this.post("/auth", {email: email, password: pass}, {access_token: "jwttoken"})
    }

    signUp(email, pass, fio, isDoctor)
    {
        return this.post("/reg", {email: email, password: pass, fio: fio, doctor:isDoctor}, {access_token: "jwttoken"})
    }

    getUserData()
    {
        return this.get("/user", {
            "id": 1,
            "email": "test@test.ru",
            "fio": "Иванов Иван Иванович",
            "doctor": true
          })
    }

    getDoctorData(doctorId)
    {
        return this.get(`/doctor/info?doctorId=${doctorId}`, {
            "doctorId": 1,
            "fio": "Иванов Иван Иванович",
            "info": "Такой крутой парень"
          })
    }

    updatePatientData(data)
    {
        return this.put("/patient/info", data, {
            "succsess": true
          })
    }


    updateDoctorData(data)
    {
        return this.put("/doctor/info", data, {
            "succsess": true
          })
    }

    getAllDoctors()
    {
        return this.get("/doctor/all", 
            [
                {
                    "doctorId": 1,
                    "fio": "Иванов Иван Иванович",
                    "info": "Такой крутой парень"
                },
                {
                    "doctorId": 2,
                    "fio": "Иванов Иван Иванович",
                    "info": "Такой крутой парень"
                }
            ]
        )
    }

    getWorkingTime(doctorId)
    {
        return this.get(`doctor/workingTime?doctorId=${doctorId}`, {
            workingTime: [
            {
                "day": 1,
                "start": "08:00",
                "end": "17:00"
            },
            {
                "day": 2,
                "start": "08:00",
                "end": "17:00"
            },
            {
                "day": 3,
                "start": "08:00",
                "end": "17:00"
            },
            {
                "day": 4,
                "start": "08:00",
                "end": "17:00"
            },
            {
                "day": 5,
                "start": "08:00",
                "end": "17:00"
            }
        ]
    })
    }

    updateWorkingTime(data)
    {
        return this.put(`doctor/workingTime`, data, {
            succsess: "true"
        })
    }

    getAllActualPatients()
    {
        return this.get("/doctor/patients", 
            [
                {
                    "id": 1,
                    "cartId": 1,
                    "email": "test@test.ru",
                    "fio": "Иванов Иван Иванович"
                },
                {
                    "id": 2,
                    "cartId": 2,
                    "email": "test@test.ru",
                    "fio": "Сидоров Семен Семенович"
                }
            ]
        )
    }

    getCard(cardId)
    {
        return this.get(`/patient/card?cartId${cardId}`, 
        [
            {
                "doctorId": 1,
                "date": "18:02:2021",
                "info": "У меня растет 3я рука",
                "recomendation": "Отрежте её"
            },
            {
                "doctorId": 1,
                "date": "19:02:2021",
                "info": "А теперь 2я голова",
                "recomendation": "И её отрежте"
            }
        ]
    )
    }
}

export default new Routes;
