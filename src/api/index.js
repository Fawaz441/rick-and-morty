import axios from "./axios";

const api = {
    fetchCharacters: (params) => axios.get("/character", { params }),
    fetchLocations: params => axios.get("/location", { params }),
    fetchFilteredCharacters: characters => axios.get(`/character/${characters}`)
}

export default api