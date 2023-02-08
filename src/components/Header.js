import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../utils/constants'

const Header = () => {
    const isHomePage = window.location.pathname === routes.home
    return (
        <div className='h-[80px] fixed flex flex-col space-y-2 md:space-y-0 md:flex-row items-center bg-black w-screen px-5 md:px-10 pt-3 pb-2 md:justify-between'>
            <h3 className='text-white text-[30px] '>Rick & Morty!</h3>
            {isHomePage ?
                <Link to={routes.locations}>
                    <span className='text-[#d1e239] text-sm'>Check out locations!</span>
                </Link> :
                <Link to={routes.home}>
                    <span className='text-[#d1e239] text-sm'>Check out the characters!</span>
                </Link>
            }
        </div>
    )
}

export default Header