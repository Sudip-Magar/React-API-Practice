import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { fetchRoom } from '../redux/slice/roomApi';
import Slider from 'react-slick';
import { useForm } from 'react-hook-form';
import { bookingCreate } from '../redux/slice/bookingSlice';
import NepaliDate from "nepali-date-converter";

const Booking = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const location = useLocation();
    const { id } = useParams();
    const [searchParams] = useSearchParams()

    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const guest = searchParams.get('guest');

    const checkinObj = new Date(checkin)
    const checkoutObj = new Date(checkout)

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const checkinDayName = days[checkinObj.getDay()];
    const checkinMonthName = months[checkinObj.getMonth()];
    const checkinDate = checkinObj.getDate();
    const checkinYear = checkinObj.getFullYear();

    const checkoutDayName = days[checkoutObj.getDay()];
    const checkoutMonthName = months[checkoutObj.getMonth()];
    const checkoutDate = checkoutObj.getDate();
    const checkoutYear = checkoutObj.getFullYear();

    const diffTime = checkoutObj - checkinObj;
    const totalNights = diffTime / (1000 * 60 * 60 * 24);



    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.room)

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
    }

    useEffect(() => {
        if (!checkin || !checkout) return;

        if (!data || data.length === 0) {
            dispatch(fetchRoom({
                checkin,
                checkout,
                roomNo: guest
            }));
        }
    }, [dispatch, checkin, checkout, guest])

    const room = data?.find((r) => r.id === Number(id));
    const { name } = location.state || {};

    const [checkinNepali, setCheckinNepali] = useState(null);
    const [checkoutNepali, setCheckoutNepali] = useState(null);

    useEffect(() => {
        if (!checkinObj || !checkoutObj) return;

        setTimeout(() => {
            const bsCheckin = new NepaliDate(checkinObj);
            const bsCheckout = new NepaliDate(checkoutObj);

            setCheckinNepali(bsCheckin.format("YYYY-MM-DD"));
            setCheckoutNepali(bsCheckout.format("YYYY-MM-DD"));
        }, 0)
    }, [])

    const onSubmit = async (data) => {
        try {
            console.log("nepali checkin", checkinNepali);
            console.log("nepali checkout", checkoutNepali);
            console.log("checkout", checkin);
            console.log("checkout", checkout);

            const finalData = {
                ...data,
                total_nights: totalNights,
                booking_date_en: checkinObj,
                arrival_date_en: checkinObj,
                departure_date_en: checkoutObj,
                room_id: id
            }
            console.log(finalData);

            const response = await dispatch(bookingCreate(finalData)).unwrap();
        } catch (error) {
            console.log("catch", error.errors);
            if (error.errors) {
                Object.keys(error.errors).forEach((field) => {
                    setError(field, {
                        type: 'server',
                        message: error.errors[field][0],
                    });
                });
            };
        }
    }


    //  Loading state
    if (isLoading) {
        return <p className="text-center mt-10">Loading...</p>
    }

    //  Safety check
    if (!room) {
        return <p className="text-center mt-10">Room not found</p>
    }

    return (
        <div className='w-[90%] md:w-[60%] mx-auto my-5'>
            <div className='flex flex-col md:flex-row gap-6 justify-between'>

                {/* User Info */}
                <div className='w-full md:w-[60%] '>
                    <form onSubmit={handleSubmit(onSubmit)} className='text-xs'>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='mb-2'>
                                <label className='mb-1 inline-block ms-1' htmlFor="name">Name:</label>
                                <input {...register('booked_by', { required: "Guest Name is Required!" })}
                                    className='w-full border border-gray-300 rounded-lg py-2 px-3'
                                    type="text" id='name'
                                    placeholder='Enter Name'
                                />
                                {errors.booked_by && (
                                    <p className='text-xs text-red-500 mt-1 mx-2'>{errors.booked_by.message}</p>
                                )}
                            </div>

                            <div className='mb-2'>
                                <label className='mb-1 inline-block ms-1' htmlFor="email">Email:</label>
                                <input {...register('email', { required: "Email Address is Required!" })}
                                    className='w-full border border-gray-300 rounded-md text-xs py-2 px-3'
                                    type="email" id='email'
                                    placeholder='Enter Email'
                                />
                                {errors.email && (
                                    <p className='text-xs text-red-500 mt-2'>{errors.email.message}</p>
                                )}
                            </div>

                            <div className='mb-2'>
                                <label className='mb-1 inline-block ms-1' htmlFor="phone">Phone:</label>
                                <input {...register('phone', { required: "Phone Number is required!" })}
                                    className='w-full border border-gray-300 rounded-md text-xs py-2 px-3'
                                    type="number" id='phone'
                                    placeholder='Enter Phone Number'
                                />
                                {errors.phone && (
                                    <p className='text-xs text-red-500 mt-2'>{errors.phone.message}</p>
                                )}
                            </div>

                            <div className='mb-2'>
                                <label className='mb-1 inline-block ms-1' htmlFor="food_type">Food Type:</label>
                                <input {...register('food_type', { required: "Food Type is Required!" })}
                                    className='w-full border border-gray-300 rounded-md text-xs py-2 px-3'
                                    type="text" id='food_type'
                                    placeholder='Enter Food Type'
                                />
                                {errors.food_type && (
                                    <p className='text-xs text-red-500 mt-2'>{errors.food_type.message}</p>
                                )}
                            </div>

                            <div className='mb-2'>
                                <label className='mb-1 inline-block ms-1' htmlFor="arrival_time">Arrival Time:</label>
                                <input {...register('arrival_time', { required: "Arrival Time is Required!" })}
                                    className='w-full border border-gray-300 rounded-md text-xs py-1.75 px-3'
                                    type="time" id='arrival_time'
                                    placeholder='Enter Arrival time' />
                                {errors.arrival_time && (
                                    <p className='text-xs text-red-500 mt-2'>{errors.arrival_time.message}</p>
                                )}
                            </div>

                            <div className='mb-2'>
                                <label className='mb-1 inline-block ms-1' htmlFor="departure_time">Arrival Time:</label>
                                <input {...register('departure_time', { required: "Departure time is Required!" })}
                                    className='w-full border border-gray-300 rounded-md text-xs py-1.75 px-3'
                                    type="time" id='departure_time'
                                    placeholder='Enter departure Time' />
                                {errors.departure_time && (
                                    <p className='text-xs text-red-500 mt-2'>{errors.departure_time.message}</p>
                                )}
                            </div>

                            <div className='mb-2'>
                                <label className='mb-1 inline-block ms-1' htmlFor="no_of_adults">No. of Adults:</label>
                                <input {...register('no_of_adults', { required: "No. of Adult field is Required!" })}
                                    className='w-full border border-gray-300 rounded-md text-xs py-2 px-3'
                                    type="number" id='no_of_adults'
                                    placeholder='Enter No. of Adults'
                                />
                                {errors.no_of_adults && (
                                    <p className='text-xs text-red-500 mt-2'>{errors.no_of_adults.message}</p>
                                )}
                            </div>

                            <div className='mb-2'>
                                <label className='mb-1 inline-block ms-1' htmlFor="no_of_children">No. of Children:</label>
                                <input {...register('no_of_children', { required: "No. of children is Required!" })}
                                    className='w-full border border-gray-300 rounded-md text-xs py-2 px-3'
                                    type="number" id='no_of_children'
                                    placeholder='Enter No. of Children'
                                />
                                {errors.no_of_children && (
                                    <p className='text-xs text-red-500 mt-2'>{errors.no_of_children.message}</p>
                                )}
                            </div>

                            <div className='mb-2'>
                                <label className='mb-1 inline-block ms-1' htmlFor="pickup_address">Pickup Address:</label>
                                <input {...register('pickup_address')}
                                    className='w-full border border-gray-300 rounded-md text-xs py-2 px-3'
                                    type="text" id='pickup_address'
                                    placeholder='Enter Pickup Address'
                                />
                            </div>

                            <div className='mb-2'>
                                <label className='mb-1 inline-block ms-1' htmlFor="drop_address">Drop Address:</label>
                                <input {...register('drop_address')}
                                    className='w-full border border-gray-300 rounded-md text-xs py-2 px-3'
                                    type="text" id='drop_address'
                                    placeholder='Enter Drop Address'
                                />
                            </div>
                        </div>

                        <div className='mt-3'>
                            <div className='mb-2'>
                                <label className='mb-1 inline-block ms-1' htmlFor="amount">Enter Amount to Pay:</label>
                                <input {...register('amount')}
                                    className='w-full border border-gray-300 rounded-md text-xs py-2 px-3'
                                    type="number" id='amount'
                                    placeholder='Enter Amount Number'
                                />
                            </div>
                        </div>

                        <div className='text-xs text-end'>
                            <button className='inline-block bg-blue-500 text-white py-2 px-4 font-semibold rounded-lg cursor-pointer hover:bg-blue-600 duration-150'>Book Room</button>
                        </div>
                    </form>
                </div>

                {/* Room Images */}
                <div className='w-full md:w-[40%]'>
                    <div className='bg-gray-100 p-2 shadow-md'>
                        <Slider {...settings}>
                            {room.images_url?.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={image}
                                        alt={`room-${index}`}
                                        className="w-full h-50 object-cover rounded-xl"
                                    />
                                </div>
                            ))}
                        </Slider>

                        {/* chekin, checkout and total night */}
                        <div className='mt-7 border-t border-gray-300'>
                            <div className='bg-gray-200 px-3 rounded-md'>
                                <h2 className='mt-2 text-lg font-semibold'>Room: {room.name_en}</h2>
                                <p className='text-sm text-gray-500'>{room.category.name_en} • {room.block.name_en} Block • {room.floor.name_en}</p>
                            </div>

                            <div className='bg-gray-200 mt-3 rounded-md py-2 px-3 flex justify-between shadow-md'>
                                <div>
                                    <p className='text-xs'>check-in</p>
                                    <p className='text-xs font-semibold'>{checkinDayName}, {checkinMonthName} {checkinDate}, {checkinYear}</p>
                                </div>

                                <div>
                                    <p className='text-xs'>check-out</p>
                                    <p className='text-xs font-semibold'>{checkoutDayName}, {checkoutMonthName} {checkoutDate}, {checkinYear}</p>
                                </div>

                                <div>
                                    <p className='text-xs'>Nights</p>
                                    <p className='text-xs font-semibold'>{totalNights}</p>
                                </div>
                            </div>
                        </div>

                        {/* Aminities */}
                        <div className='px-3 py-2 mt-3 bg-gray-200 shadow-md rounded-md'>
                            <h2 className='text-xs font-semibold mb-1'>Amenities</h2>
                            <div className='text-xs grid grid-cols-2'>
                                {
                                    room?.features?.map((feature) => (
                                        <p key={feature.id}>{feature.name_en}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className='my-3 bg-gray-100 py-1 px-2 rounded-md shadow-md'>
                        <h2 className='text-sm  font-semibold'>Price Detail</h2>
                        <p className='text-xs'>{totalNights} nights x Rs. {room.price} = Rs. {totalNights * room.price}</p>
                        <div className='border-t border-gray-400 mt-3'>
                            <div className='mt-3'>
                                <p className='flex justify-between font-semibold text-xs'><span>Total:</span> <span>Rs. {totalNights * room.price}</span></p>
                                <p className='flex justify-between text-xs mt-1.5'><span>Paid:</span> <span>Rs. 0</span></p>
                                <p className='flex justify-between text-xs mt-1.5'><span>Due:</span> <span>Rs. {totalNights * room.price}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Booking