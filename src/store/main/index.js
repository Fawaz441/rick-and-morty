import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    characters: [],
    locations: [],
    charactersInfo: {},
    locationsInfo: {},
    loadingCharacters: false,
    loadingLocations: false,
    error: null,
    filters: {},
    query: null,
    filteredCharacters: null
}

const mainReducerSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        fetchFilteredCharacters: (state, action) => {
            state.loadingCharacters = true;
            state.error = null
        },
        fetchCharacters: (state, action) => {
            state.loadingCharacters = true;
            state.error = null
            if (action.payload?.params) {
                state.characters = []
                state.filteredCharacters = null
            }
            if (action.payload?.query) {
                state.characters = []
                state.filters = {}
                state.filteredCharacters = null
                state.charactersInfo = {}
                state.query = action.payload.query
            }
        },
        resetCharacters: (state) => {
            state.loadingCharacters = true;
            state.error = null
            state.filters = {}
            state.characters = []
            state.query = null;
            state.filteredCharacters = null
        },
        fetchFilteredCharactersSuccess: (state, action) => {
            state.loadingCharacters = false;
            state.error = null;
            state.characters = Array.isArray(action.payload) ? action.payload : [action.payload]
        },
        fetchCharactersSuccess: (state, action) => {
            state.loadingCharacters = false;
            state.error = null;
            state.charactersInfo = action.payload.info
            if (action.payload?.filters) {
                state.filters = action.payload?.filters
                state.query = null;
            }
            state.characters = [...state.characters, ...action.payload.results]
        },
        fetchCharactersError: (state, action) => {
            state.loadingCharacters = false;
            state.error = action.payload;
        },
        fetchLocations: (state, action) => {
            state.loadingLocations = true;
            state.error = null;
            state.filters = {}
            state.query = null;
        },
        fetchLocationsSuccess: (state, action) => {
            state.loadingLocations = false;
            state.error = null;
            state.locationsInfo = action.payload.info
            state.locations = [...state.locations, ...action.payload.results]
        },
        fetchLocationsError: (state, action) => {
            state.loadingLocations = false;
            state.error = action.payload
        },
        setFilteredCharacters: (state, action) => {
            state.filteredCharacters = action.payload.characters
            state.filters = { location: action.payload.location }
        },
        clearLocations: (state) => {
            state.locations = []
            state.locationsInfo = {}
        }
    }
})

export default mainReducerSlice