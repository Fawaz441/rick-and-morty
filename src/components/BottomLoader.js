import React from 'react'


const BottomLoader = ({ isLoading, hasReachedEnd }) => (
    <div className='h-[100px] flex items-center justify-center'>
        {isLoading &&
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        }
        {hasReachedEnd && <span className='text-white font-bold text-center uppercase'>the end</span>}
    </div>
)

export default BottomLoader