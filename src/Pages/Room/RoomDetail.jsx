import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { fetchRoom } from '../../redux/slice/roomApi'
import parse from 'html-react-parser';
import RoomDetailPlaceholder from '../../Placeholder/RoomDetailPlaceholder';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const guest = searchParams.get("guest");

  const { data, isLoading } = useSelector((state) => state.room);

  // If data is empty, fetch again
  useEffect(() => {
    if (!checkin || !checkout) return

    if (!data || data.length === 0) {
      dispatch(fetchRoom({
        checkin,
        checkout,
        roomNo: guest
      }));
    }
  }, [dispatch, checkin, checkout, guest]);

  const room = data?.find((r) => r.id === Number(id));
  
  const handleNavigation = () => {
    navigate(`/room/${id}/booking/?checkin=${checkin}&checkout=${checkout}${guest ? `&guest=${guest}` : ''}`, {
      state:{
        name: 'hello'
      }
    })
    
  } 



  if (isLoading) {
    return (
      <RoomDetailPlaceholder />
    )
  }

  if (!room) {
    return <p className="p-6">Room Could not found</p>
  }
  if (!room.descriptions || room.descriptions.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Room {room.name_en}
        </h1>
        <p className="text-sm text-gray-500">
          {room.category?.name_en} • {room.block?.name_en} Block • {room.floor?.name_en}
        </p>
      </div>


      {/* Main Layout */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-4">

          {/* Main Image */}
          <div className="rounded-lg overflow-hidden">
            <img
              src={room.feature_image_url}
              alt="Room"
              className="w-full h-80 object-cover"
            />
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {room.images_url?.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Room"
                className="h-20 w-full object-cover rounded-md cursor-pointer hover:opacity-80"
              />
            ))}
          </div>


          {/* Description */}
          {room.descriptions.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm">

              {/* Tabs */}
              <div className="flex border-b overflow-x-auto">
                {room.descriptions.map((desc, index) => (
                  <button
                    key={desc.id}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition cursor-pointer
                ${activeTab === index
                        ? "border-b-2 border-emerald-700 text-emerald-700"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {desc.basic_setup?.name_en || 'General Information'}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-4 text-sm text-gray-600 leading-relaxed">
                {parse(room.descriptions[activeTab]?.description || "")}
              </div>

            </div>
          )}
        </div>


        {/* RIGHT SIDE */}
        <div className="space-y-4">

          {/* Booking Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm">

            <p className="text-2xl font-bold text-green-600 mb-3">
              Rs. {room.price}
            </p>

            <button onClick={handleNavigation} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium cursor-pointer">
              Book Now
            </button>

          </div>


          {/* Room Information */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3 text-gray-700">
              Room Information
            </h3>

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">

              <p><span className="font-medium">Category:</span> {room.category?.name_en}</p>
              <p><span className="font-medium">Block:</span> {room.block?.name_en}</p>

              <p><span className="font-medium">Floor:</span> {room.floor?.name_en}</p>
              <p><span className="font-medium">Guests:</span> {room.max_guest}</p>

              <p><span className="font-medium">Smoking:</span> {room.is_smoking ? "Yes" : "No"}</p>
              <p><span className="font-medium">Phone:</span> {room.phone_ext1}</p>

              <p className="col-span-2">
                <span className="font-medium">Status:</span>
                <span className="text-green-600 ml-1">{room.room_status}</span>
              </p>

            </div>
          </div>


          {/* Features */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2 text-gray-700">
              Features
            </h3>

            <div className="flex flex-wrap gap-2">
              {room.features?.map((feature) => (
                <span
                  key={feature.id}
                  className="bg-emerald-200 text-emerald-800 px-2 py-1 text-xs rounded-md">
                  {feature.name_en}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default RoomDetail