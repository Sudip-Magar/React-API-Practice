import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchRoom } from "../redux/slice/roomApi";

const ReloadRoom = ({checkin, checkout, guest}) => {
    const dispatch = useDispatch();

    const handleFetchRoom = (e) => {
        e.preventDefault();

        dispatch(fetchRoom({
            checkin: checkin,
            checkout: checkout,
            roomNo: guest
        }))
    }
    return (
        <div className="w-full flex items-center justify-center py-20">
            <div className="bg-white shadow-md rounded-xl p-8 text-center max-w-md">

                {/* Icon */}
                <div className="text-red-500 text-4xl mb-4">
                    ⚠️
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Failed to Load Rooms
                </h2>

                {/* Message */}
                <p className="text-sm text-gray-500 mb-6">
                    Something went wrong while loading the room data. Please try again.
                </p>

                {/* Retry Button */}
                <button onClick={handleFetchRoom}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition cursor-pointer">
                    Retry
                </button>

            </div>
        </div>
    )
}

export default ReloadRoom
