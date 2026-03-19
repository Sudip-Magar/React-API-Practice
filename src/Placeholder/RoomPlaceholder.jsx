import React from 'react'

const RoomPlaceholder = () => {
    return (


            <div className="flex flex-col lg:flex-row gap-4">

                {/* Filter Sidebar Skeleton */}
                <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-sm p-4 space-y-3">

                    <div className="h-5 bg-gray-200 w-24 rounded"></div>

                    <div className="h-8 bg-gray-200 rounded"></div>

                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 w-32 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                    </div>

                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 w-24 rounded"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                    </div>

                </div>


                {/* Room Cards Skeleton */}
                <div className="flex-1 flex flex-col gap-4">

                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row"
                        >

                            {/* Image */}
                            <div className="w-full sm:w-48 h-40 bg-gray-200"></div>

                            {/* Details */}
                            <div className="p-3 flex flex-col justify-between flex-1 space-y-2">

                                <div className="h-4 bg-gray-200 w-40 rounded"></div>

                                <div className="h-3 bg-gray-200 w-32 rounded"></div>

                                <div className="flex gap-2">
                                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                </div>

                                <div className="flex justify-between mt-2">
                                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
    )
}

export default RoomPlaceholder
