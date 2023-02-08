import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as Cancel } from "../assets/icons/cancel.svg"
import mainReducerSlice from '../store/main'
import { gender, species, statuses } from '../utils/constants'

const { actions } = mainReducerSlice

const FilterModal = ({ onClose }) => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        status: '-',
        species: '-',
        gender: '-'
    })

    const onChange = (key, event) => setValues({ ...values, [key]: event.target.value })
    const isInvalid = useMemo(() => values.status === "-" && values.species === "-" && values.gender === "-", [values])

    const onFilter = () => {
        const filterValues = {}
        Object.keys(values).forEach(key => {
            if (values[key] !== "-") {
                filterValues[key] = values[key]
            }
        })
        dispatch(actions.fetchCharacters({ params: filterValues }))
        onClose()
    }


    return (
        <div data-testid="filter-modal" className='transition duration-150 h-screen w-screen fixed z-[5] bg-black/[.7]'>
            <div className='bg-black/[.7] blur-md absolute top-0 left-0 h-full w-full' />
            <div className='absolute top-0 left-0 h-full w-full flex justify-center self-start'>
                <div className="bg-black self-start rounded-lg p-5 mt-[40px] w-[500px]">
                    <div className="flex justify-between items-center px-8">
                        <h4 className='text-white'>Filter</h4>
                        <button data-testid="filter-cancel" type="button" className="h-5 w-5 rounded-full" onClick={onClose}>
                            <Cancel className="h-8 w-8" />
                        </button>
                    </div>
                    <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                                Status
                            </label>
                            <select
                                onChange={e => onChange("status", e)}
                                value={values.status}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="status">
                                <option value="-">-</option>
                                {statuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                                Gender
                            </label>
                            <select
                                onChange={e => onChange("gender", e)}
                                value={values.gender}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gender">
                                <option value="-">-</option>

                                {gender.map(g => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="species">
                                Species
                            </label>
                            <select
                                onChange={e => onChange("species", e)}
                                value={values.species}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="species">
                                <option value="-">-</option>
                                {species.map(specie => (
                                    <option key={specie} value={specie}>{specie}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={onFilter}
                                disabled={isInvalid} className="disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Filter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FilterModal