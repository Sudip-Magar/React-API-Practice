import React, { useEffect, useState, useMemo } from 'react';
import RoomPlaceholder from '../../Placeholder/RoomPlaceholder';
import ReloadRoom from '../../Reload/ReloadRoom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoom } from '../../redux/slice/roomApi';

const RoomList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");
    const guest = searchParams.get("guest");

    const [checkinDate, setCheckinDate] = useState(checkin ? new Date(checkin) : null);
    const [checkoutDate, setCheckoutDate] = useState(checkout ? new Date(checkout) : null);
    const [guestNo, setGuestNo] = useState(guest ?? "");

    // Price filter state
    const [minPrice, setMinPrice] = useState(500);
    const [maxPrice, setMaxPrice] = useState(500000);

    // Category, floor, block filters
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFloors, setSelectedFloors] = useState([]);
    const [selectedBlocks, setSelectedBlocks] = useState([]);

    const { data, isLoading, isError } = useSelector((state) => state.room);

    // Get unique categories, floors, blocks
    const categories = Array.from(new Map(data.filter(r => r.category).map(r => [r.category.id, r.category])).values());
    const floors = Array.from(new Map(data.filter(r => r.floor).map(r => [r.floor.id, r.floor])).values());
    const blocks = Array.from(new Map(data.filter(r => r.block).map(r => [r.block.id, r.block])).values());

    useEffect(() => {
        if (!checkinDate || !checkoutDate) return;

        dispatch(fetchRoom({
            checkin: checkinDate,
            checkout: checkoutDate,
            roomNo: guestNo,
        }));
    }, [checkinDate, checkoutDate, guestNo]);

    // Filtered rooms
    const filteredRooms = useMemo(() => {
        return data.filter(room => {
            // Price filter
            if (room.price < minPrice || room.price > maxPrice) return false;

            // Category filter
            if (selectedCategories.length > 0 && !selectedCategories.includes(room.category?.id)) return false;

            // Floor filter
            if (selectedFloors.length > 0 && !selectedFloors.includes(room.floor?.id)) return false;

            // Block filter
            if (selectedBlocks.length > 0 && !selectedBlocks.includes(room.block?.id)) return false;

            return true;
        });
    }, [data, minPrice, maxPrice, selectedCategories, selectedFloors, selectedBlocks]);

    const handleClick = (id) => {
        navigate(`/room/${id}?checkin=${checkin}&checkout=${checkout}${guest ? `&guest=${guest}` : ''}`);
    };

    const handleCheckboxChange = (value, setState, state) => {
        if (state.includes(value)) {
            setState(state.filter(v => v !== value));
        } else {
            setState([...state, value]);
        }
    };

    return (

        <div>
            {isLoading && <RoomPlaceholder />}
            {isError && <ReloadRoom checkin={checkin} checkout={checkout} guest={guest} />}
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Filter Sidebar */}
                <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-sm p-4 h-fit">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Filters</h2>

                    {/* Price Range */}
                    <div className="mb-4">
                        <h3 className="font-semibold mb-1 text-sm">Price Range</h3>
                        <p className='mb-1 text-xs'>Price: ({minPrice ?? 0} - {maxPrice ?? 0})</p>
                        <div className="flex gap-1">
                            <input
                                type="number"
                                placeholder="Min"
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                                value={minPrice}
                                className="w-1/2 border border-gray-300 rounded-md p-1 text-xs focus:ring-1 focus:ring-green-500"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                value={maxPrice}
                                className="w-1/2 border border-gray-300 rounded-md p-1 text-xs focus:ring-1 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-4">
                        <h3 className="font-semibold mb-1 text-sm">Category</h3>
                        <div className="flex flex-col gap-1 text-gray-700 text-xs">
                            {categories.map(c => (
                                <label key={c.id} className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(c.id)}
                                        onChange={() => handleCheckboxChange(c.id, setSelectedCategories, selectedCategories)}
                                    />
                                    {c.name_en}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Floor Filter */}
                    <div className="mb-4">
                        <h3 className="font-semibold mb-1 text-sm">Floor</h3>
                        <div className="flex flex-col gap-1 text-gray-700 text-xs">
                            {floors.map(f => (
                                <label key={f.id} className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedFloors.includes(f.id)}
                                        onChange={() => handleCheckboxChange(f.id, setSelectedFloors, selectedFloors)}
                                    />
                                    {f.name_en}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Block Filter */}
                    <div className="mb-4">
                        <h3 className="font-semibold mb-1 text-sm">Block</h3>
                        <div className="flex flex-col gap-1 text-gray-700 text-xs">
                            {blocks.map(b => (
                                <label key={b.id} className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedBlocks.includes(b.id)}
                                        onChange={() => handleCheckboxChange(b.id, setSelectedBlocks, selectedBlocks)}
                                    />
                                    Block {b.name_en}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Rooms List */}
                <div className="flex-1 flex flex-col gap-4">
                    {filteredRooms.length === 0 && (
                       <div className='flex justify-center items-center w-full h-full '>
                         <p className="text-gray-500 text-sm font-semibold">No rooms match your filters.</p>
                       </div>
                    )}
                    {filteredRooms.map(room => (
                        <div
                            key={room.id}
                            className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row cursor-pointer"
                            onClick={() => handleClick(room.id)}
                        >
                            <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0 overflow-hidden">
                                <img
                                    src={room.images_url?.[0]}
                                    alt={room.name_en}
                                    className="w-full h-full object-cover"
                                />
                                {room.room_status === "AVAILABLE" && (
                                    <span className="absolute top-2 left-2 bg-green-600 text-white px-1 py-0.5 text-xs font-bold rounded">
                                        Available
                                    </span>
                                )}
                            </div>
                            <div className="p-3 flex flex-col justify-between flex-1">
                                <div>
                                    <h3 className="font-semibold text-sm text-gray-800">{room.category?.name_en} Room</h3>
                                    <p className="text-gray-600 text-xs mt-0.5">
                                        Room {room.name_en} • Max {room.max_guest} Guests
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {room.features?.map(feature => (
                                            <span
                                                key={feature.id}
                                                className="bg-green-50 text-green-700 text-xs px-1 py-0.5 rounded-full"
                                            >
                                                {feature.name_en}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-2 text-xs">
                                    <span className="text-gray-500">Status: <span className="text-green-600 font-medium">{room.room_status}</span></span>
                                    <span className="text-green-700 font-bold text-sm">Rs. {room.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoomList;