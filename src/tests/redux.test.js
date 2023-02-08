import MockAdapter from "axios-mock-adapter";
import { runSaga } from "redux-saga";
import api from "../api";
import axios from "../api/axios";
import store from "../store";
import mainReducerSlice from "../store/main";

const { actions } = mainReducerSlice

test('The initial store values should be empty data values', () => {
    const state = store.getState()
    expect(state.characters).toEqual([])
    expect(state.locations).toEqual([])
    expect(state.charactersInfo).toEqual({})
    expect(state.locationsInfo).toEqual({})
    expect(state.loadingCharacters).toBeFalsy()
    expect(state.loadingLocations).toBeFalsy()
    expect(state.error).toBeFalsy()
    expect(state.filters).toEqual({})
    expect(state.query).toBe(null)
    expect(state.filteredCharacters).toBe(null)
})

const mockCharacter = { "id": 1, "name": "Rick Sanchez", "status": "Alive", "species": "Human", "type": "", "gender": "Male", "origin": { "name": "Earth (C-137)", "url": "https://rickandmortyapi.com/api/location/1" }, "location": { "name": "Citadel of Ricks", "url": "https://rickandmortyapi.com/api/location/3" }, "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg", "episode": ["https://rickandmortyapi.com/api/episode/1", "https://rickandmortyapi.com/api/episode/2", "https://rickandmortyapi.com/api/episode/3", "https://rickandmortyapi.com/api/episode/4", "https://rickandmortyapi.com/api/episode/5", "https://rickandmortyapi.com/api/episode/6", "https://rickandmortyapi.com/api/episode/7", "https://rickandmortyapi.com/api/episode/8", "https://rickandmortyapi.com/api/episode/9", "https://rickandmortyapi.com/api/episode/10", "https://rickandmortyapi.com/api/episode/11", "https://rickandmortyapi.com/api/episode/12", "https://rickandmortyapi.com/api/episode/13", "https://rickandmortyapi.com/api/episode/14", "https://rickandmortyapi.com/api/episode/15", "https://rickandmortyapi.com/api/episode/16", "https://rickandmortyapi.com/api/episode/17", "https://rickandmortyapi.com/api/episode/18", "https://rickandmortyapi.com/api/episode/19", "https://rickandmortyapi.com/api/episode/20", "https://rickandmortyapi.com/api/episode/21", "https://rickandmortyapi.com/api/episode/22", "https://rickandmortyapi.com/api/episode/23", "https://rickandmortyapi.com/api/episode/24", "https://rickandmortyapi.com/api/episode/25", "https://rickandmortyapi.com/api/episode/26", "https://rickandmortyapi.com/api/episode/27", "https://rickandmortyapi.com/api/episode/28", "https://rickandmortyapi.com/api/episode/29", "https://rickandmortyapi.com/api/episode/30", "https://rickandmortyapi.com/api/episode/31", "https://rickandmortyapi.com/api/episode/32", "https://rickandmortyapi.com/api/episode/33", "https://rickandmortyapi.com/api/episode/34", "https://rickandmortyapi.com/api/episode/35", "https://rickandmortyapi.com/api/episode/36", "https://rickandmortyapi.com/api/episode/37", "https://rickandmortyapi.com/api/episode/38", "https://rickandmortyapi.com/api/episode/39", "https://rickandmortyapi.com/api/episode/40", "https://rickandmortyapi.com/api/episode/41", "https://rickandmortyapi.com/api/episode/42", "https://rickandmortyapi.com/api/episode/43", "https://rickandmortyapi.com/api/episode/44", "https://rickandmortyapi.com/api/episode/45", "https://rickandmortyapi.com/api/episode/46", "https://rickandmortyapi.com/api/episode/47", "https://rickandmortyapi.com/api/episode/48", "https://rickandmortyapi.com/api/episode/49", "https://rickandmortyapi.com/api/episode/50", "https://rickandmortyapi.com/api/episode/51"], "url": "https://rickandmortyapi.com/api/character/1", "created": "2017-11-04T18:48:46.250Z" }
const mockInfo = {
    count: 826,
    next: "https://rickandmortyapi.com/api/character?page=2",
    pages: 42,
    prev: null
}

const mockLocationResponse = {
    "info": {
        "count": 1, "pages": 7, "next": "https://rickandmortyapi.com/api/location?page=2", "prev": null
    }, "results": [{
        "id": 1, "name": "Earth (C-137)", "type": "Planet", "dimension": "Dimension C-137",
        "residents": ["https://rickandmortyapi.com/api/character/38"],
        "created": "2017-11-10T12:42:04162Z"
    }
    ]
}

const mockResponse = () => {
    const mock = new MockAdapter(axios)
    mock.onGet("/character").reply(200, {
        results: [mockCharacter],
        info: mockInfo
    })
    mock.onGet("/character?name=rick").reply(200, [mockCharacter])
    mock.onGet("/location").reply(200, mockLocationResponse)
}


describe('Testing dispatching the action creators', () => {
    beforeAll(() => {
        mockResponse()
    })

    test("Testing fetching all characters", async () => {
        const { data } = await api.fetchCharacters()
        store.dispatch(actions.fetchCharactersSuccess(data))
        expect(store.getState().characters[0].id).toEqual(mockCharacter.id)
    })

    test("Searching for a character", async () => {
        const { data } = await api.fetchCharacters({ query: "rick" })
        store.dispatch(actions.fetchCharactersSuccess(data))
        expect(store.getState().characters[0].id).toEqual(mockCharacter.id)
    })

    test("Fetching Locations", async () => {
        const { data } = await api.fetchLocations()
        store.dispatch(actions.fetchLocationsSuccess(data))
        const state = store.getState()
        expect(state.locationsInfo.next).toEqual(mockLocationResponse.info.next)
    })


})