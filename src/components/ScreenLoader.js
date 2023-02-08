import React from 'react'


const ScreenLoader = ({ isLoading }) => (
    isLoading ?
        <div className='fixed z-[6] bg-black/[.8] top-0 left-0 h-full w-full flex items-center justify-center'>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div> :
        null
)

export default ScreenLoader