import React from 'react'
import { ReactComponent as Dead } from "../assets/icons/dead.svg"

const Character = ({ character }) => (
    <div className="flex justify-center w-[85%] mx-auto md:w-[calc(50%_-_16px)] mb-8">
        <div className="rounded-lg shadow-lg bg-white w-[400px] transition duration-150">
            <img src={character.image} alt={character.name} className="w-full rounded-t-lg" />
            <div className="p-6">
                <div className='flex items-center justify-between'>
                    <h5 className="text-gray-900 text-xl font-bold mb-2">{character.name}</h5>
                    {character.status === "Dead" && <Dead className='h-4 w-4' />}
                </div>
                <ul className='space-y-1'>
                    <li>
                        <span className='font-bold text-[14px] text-base'>Status: </span>
                        <span className='text-gray-700 text-base mb-4'>{character.status}</span>
                    </li>
                    <li>
                        <span className='font-bold text-[14px] text-base'>Species: </span>
                        <span className='text-gray-700 text-base mb-4'>{character.species}</span>
                    </li>
                    <li>
                        <span className='font-bold text-[14px] text-base'>Gender: </span>
                        <span className='text-gray-700 text-base mb-4'>{character.gender}</span>
                    </li>
                    <li>
                        <span className='font-bold text-[14px] text-base'>Origin: </span>
                        <span className='text-gray-700 text-base mb-4'>{character?.origin?.name}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
)

export default Character