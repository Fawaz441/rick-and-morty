import { ReactComponent as Search } from '../assets/icons/search.svg'
import { ReactComponent as Filter } from '../assets/icons/filter.svg'
import { ReactComponent as Cancel } from '../assets/icons/cancel.svg'
import { useDispatch, useSelector } from 'react-redux'
import mainReducerSlice from '../store/main'

const { actions } = mainReducerSlice

export const SearchAction = ({ onClick }) => {
    const { query } = useSelector(state => state)
    const dispatch = useDispatch()


    const onCancel = e => {
        e.stopPropagation()
        dispatch(actions.resetCharacters())
    }

    return (
        <>
            <button data-testid="search-btn" onClick={onClick} type="button" className={`h-[50px] w-[50px] rounded-full action bg-white flex items-center justify-center fixed bottom-[30px] left-[10px] md:left-[30px] ${query ? '!bg-[#d1e239]' : ''}`}>
                <Search className='w-[30px]' />
                {query && <button type="button" className='absolute right-[-10px] top-[-10px]'
                    onClick={onCancel}
                >
                    <Cancel className='h-5 w-5' />
                </button>
                }
            </button>
            {query && <div className='action fixed bottom-[100px] left-[10px] md:left-[30px]'>
                <span className='text-white'>{`"${query}"`}</span>
            </div>}
        </>
    )
}

export const FilterAction = ({ onClick }) => {
    const { filters, filteredCharacters } = useSelector(state => state)
    const dispatch = useDispatch()
    const hasFilters = Object.keys(filters).length > 0 || filteredCharacters

    const onCancel = e => {
        e.stopPropagation()
        dispatch(actions.resetCharacters())
    }

    return (
        <>
            <button onClick={onClick} type="button" data-testid="filter-btn"
                className={`h-[50px] w-[50px] rounded-full action bg-white flex items-center justify-center fixed bottom-[30px] right-[10px] md:right-[30px] ${hasFilters ? '!bg-[#d1e239]' : ''}`}>
                <Filter className={`w-[30px] ${hasFilters ? ' stroke-white' : ''}`} />
                {hasFilters && <button type="button" className='absolute right-[-10px] top-[-10px]'
                    onClick={onCancel}
                >
                    <Cancel className='h-5 w-5' />
                </button>
                }
            </button>
            {hasFilters && <ul className='action fixed bottom-[100px] right-[10px] md:right-[30px]'>
                {Object.keys(filters).map((filter, index) => (
                    <li className='text-white text-sm' key={index}>
                        <span>{filter} : {filters[filter]}</span>
                    </li>
                ))}
            </ul>}
        </>
    )
}

