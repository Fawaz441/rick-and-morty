import React from 'react'


const LocationItem = ({ location, onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button" className='w-full md:w-[calc(25%_-_12px)] rounded overflow-hidden shadow-lg  md:mr-1 mb-2 bg-white'>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{location.name}</div>
                <p className="text-gray-700 text-base">
                    Type: <b>{location.type}</b>
                </p>
                <p className="text-gray-700 text-base">
                    Dimension: <b>{location.dimension}</b>
                </p>
                <p className="text-gray-700 text-base">
                    Number of Residents: <b>{location.residents?.length}</b>
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{location.dimension}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{location.type}</span>
            </div>
        </button>
    )
}

export default LocationItem