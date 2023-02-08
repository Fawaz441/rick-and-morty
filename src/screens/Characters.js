/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Empty, Header } from '../components'
import { FilterAction, SearchAction } from '../components/Actions'
import BottomLoader from '../components/BottomLoader'
import Character from '../components/Character'
import FilterModal from '../components/FilterModal'
import SearchModal from '../components/SearchModal'
import ScreenLoader from '../components/ScreenLoader'
import useInterSectionObserver from '../hooks/useIntersectionObserver'
import mainReducerSlice from '../store/main'
import { actions as ACTIONS } from "../utils/constants"

const { actions } = mainReducerSlice

const Characters = () => {
    const [activeAction, setActiveAction] = useState(null)
    const dispatch = useDispatch()
    const bottomRef = useRef();
    const hasReachedBottom = useInterSectionObserver(bottomRef)
    const { characters, error, filteredCharacters, loadingCharacters, charactersInfo } = useSelector(state => state)


    useEffect(() => {
        window.scroll(0, 0)
        if (filteredCharacters) {
            dispatch(actions.fetchFilteredCharacters({ characters: filteredCharacters }))
        }
        else {
            dispatch(actions.fetchCharacters())
        }
        return () => dispatch(actions.resetCharacters())
    }, [])

    useEffect(() => {
        if (hasReachedBottom && !loadingCharacters && charactersInfo?.next && !filteredCharacters && characters.length > 0) {
            dispatch(actions.fetchCharacters({ url: charactersInfo.next }))
        }
    }, [hasReachedBottom])

    const clearAction = () => setActiveAction(null)

    return (
        <div className='flex flex-col min-h-screen relative'>
            <Header />
            <div className='item-container pt-[85px] flex flex-col md:flex-row md:justify-between md:flex-wrap'>
                {characters.map((character, index) => (
                    <Character character={character} key={index} />
                ))}
            </div>
            {error && <Empty error={error} />}
            <div className="mt-auto" ref={bottomRef} />
            <BottomLoader
                hasReachedEnd={Object.keys(charactersInfo).length > 0 && !charactersInfo.next}
                isLoading={loadingCharacters && characters.length > 0} />
            <ScreenLoader isLoading={loadingCharacters && characters.length === 0} />
            <FilterAction onClick={() => setActiveAction(ACTIONS.filter)} />
            <SearchAction onClick={() => setActiveAction(ACTIONS.search)} />
            {activeAction === ACTIONS.filter && <FilterModal
                onClose={clearAction}
            />}
            {activeAction === ACTIONS.search && <SearchModal
                onClose={clearAction}
            />}
        </div>
    )
}

export default Characters