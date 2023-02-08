import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as Cancel } from "../assets/icons/cancel.svg"
import mainReducerSlice from '../store/main'

const { actions } = mainReducerSlice

const SearchModal = ({ onClose }) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')

    const onChange = (event) => setValue(event.target.value)

    const onSearch = (e) => {
        if (e) {
            e.preventDefault()
        }
        dispatch(actions.fetchCharacters({ query: value }))
        onClose()
    }


    return (
        <div data-testid="search-modal" className='transition duration-150 h-screen w-screen fixed z-[5] bg-black/[.7]'>
            <div className='bg-black/[.7] blur-md absolute top-0 left-0 h-full w-full' />
            <div className='absolute top-0 left-0 h-full w-full flex justify-center self-start'>
                <div className="bg-black self-start rounded-lg p-5 mt-[40px] w-[500px]">
                    <div className="flex justify-between items-center px-8">
                        <h4 className='text-white'>Search</h4>
                        <button data-testid="search-cancel" type="button" className="h-5 w-5 rounded-full" onClick={onClose}>
                            <Cancel className="h-8 w-8" />
                        </button>
                    </div>
                    <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        onSubmit={onSearch}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="q">
                                Enter search term...
                            </label>
                            <input
                                required
                                autoFocus
                                onChange={e => onChange(e)}
                                value={value}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="q"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={onSearch}
                                disabled={value?.trim()?.length === 0} className="disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Go!
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchModal