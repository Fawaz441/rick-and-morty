import mainAxios from 'axios'

const axios = mainAxios.create({
    baseURL: "https://rickandmortyapi.com/api"
})

export default axios