/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Empty, Header, LocationItem } from '../components'
import BottomLoader from '../components/BottomLoader';
import ScreenLoader from '../components/ScreenLoader';
import useInterSectionObserver from '../hooks/useIntersectionObserver';
import mainReducerSlice from '../store/main'
import { useHistory } from 'react-router-dom'
import { routes } from '../utils/constants';
import { toast } from 'react-hot-toast';

const { actions } = mainReducerSlice;

const Locations = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { locations, error, loadingLocations, locationsInfo } = useSelector(state => state)
    const bottomRef = useRef();
    const hasReachedBottom = useInterSectionObserver(bottomRef)

    useEffect(() => {
        window.scroll(0, 0)
        dispatch(actions.fetchLocations())
        return () => dispatch(actions.clearLocations())
    }, [])

    useEffect(() => {
        if (hasReachedBottom && !loadingLocations && locationsInfo?.next) {
            dispatch(actions.fetchLocations({ url: locationsInfo.next }))
        }
    }, [hasReachedBottom])

    const onLocationClick = location => {
        if (location.residents.length === 0) {
            toast.error("No residents!.")
            return
        }
        const residents = location.residents.map(resident => resident.split("/").at(-1))
        dispatch(actions.setFilteredCharacters({ location: location.name, characters: residents.join(',') }))
        history.push(routes.home)
    }

    return (
        <div className='flex flex-col min-h-screen relative'>
            <Header />
            <div className='item-container pt-[85px] px-10 flex flex-col md:flex-row md:justify-between md:flex-wrap'>
                {locations.map(location => (
                    <LocationItem key={location.id}
                        location={location}
                        onClick={() => onLocationClick(location)}
                    />
                ))}
            </div>
            {error && <Empty error={error} />}
            <div className="mt-auto" ref={bottomRef} />
            <BottomLoader
                hasReachedEnd={Object.keys(locationsInfo).length > 0 && !locationsInfo.next}
                isLoading={loadingLocations && locations.length > 0} />
            <ScreenLoader isLoading={loadingLocations && locations.length === 0} />

        </div>
    )
}

export default Locations