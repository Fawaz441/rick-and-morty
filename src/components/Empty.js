import React from 'react'
import avatars from '../assets/images/empty.jpeg'


const Empty = ({ error }) => {
    const displayableError = error ? typeof error === "string" ?
        error :
        typeof error === "object" ?
            error?.error
            : JSON.stringify(error) : ""
    return (
        <div className='w-full h-full flex flex-col items-center justify-center space-y-4'>
            <img src={avatars} alt="Empty" />
            <p className='text-white text-center'>{displayableError || 'Nothing here to show!'}</p>
        </div>
    )
}

export default Empty