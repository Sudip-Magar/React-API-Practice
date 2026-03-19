import React from 'react'
import SearchRoom from '../../Component/SearchRoom';
import RoomList from './RoomList';
const Room = () => {
    return (
        <div className='w-[85%] lg:w-[60%] mx-auto py-4'>
            <div className='my-3'>
                <SearchRoom />
            </div>

            <div>
                <RoomList />
            </div>

        </div>
    )
}

export default Room
