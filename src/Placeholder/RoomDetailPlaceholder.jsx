import React from 'react'

const RoomDetailPlaceholder = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6 animate-pulse">

            {/* Header */}
            <div className="mb-4">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>

            {/* Layout */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-4">

                    {/* Main Image */}
                    <div className="w-full h-80 bg-gray-200 rounded-lg"></div>

                    {/* Image Gallery */}
                    <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-20 bg-gray-200 rounded-md"></div>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
                        <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
                        <div className="h-3 bg-gray-200 w-full rounded"></div>
                        <div className="h-3 bg-gray-200 w-5/6 rounded"></div>
                        <div className="h-3 bg-gray-200 w-4/6 rounded"></div>
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-4">

                    {/* Booking Card */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="h-6 bg-gray-200 w-1/3 mb-4 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>

                    {/* Info */}
                    <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-3 bg-gray-200 rounded"></div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default RoomDetailPlaceholder
