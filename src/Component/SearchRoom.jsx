import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchRoom } from "../redux/slice/roomApi";
import { useLayoutEffect } from "react";

const SearchRoom = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const checkin = searchParams.get("checkin") || null;
  const checkout = searchParams.get("checkout") || null;
  const guest = searchParams.get("guest") || null;

  const checkinRef = useRef(null);
  const checkoutRef = useRef(null);
  const isInitialized = useRef(false);


  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [guestNo, setGuestNo] = useState(1);

  useEffect(() => {
    let checkinObj = checkin ? new Date(checkin) : new Date;
    let checkoutObj;
    let guestNumber = guest ? Number(guest) : 1;

    if (checkout) {
      checkoutObj = new Date(checkout);
    } else {
      checkoutObj = new Date();
      checkoutObj.setDate(checkinObj.getDate() + 7);
    }

    setCheckinDate(checkinObj);
    setCheckoutDate(checkoutObj);
    setGuestNo(guestNumber);
  }, [])

  useEffect(() => {
    if (!checkinRef.current || !checkoutRef.current) return;
    if (!checkinDate || !checkoutDate) return;

    setTimeout(() => {
      const bsCheckin = NepaliFunctions.AD2BS({
        year: checkinDate.getFullYear(),
        month: checkinDate.getMonth() + 1,
        day: checkinDate.getDate(),
      });

      const bsCheckout = NepaliFunctions.AD2BS({
        year: checkoutDate.getFullYear(),
        month: checkoutDate.getMonth() + 1,
        day: checkoutDate.getDate(),
      });

      const checkinStr = `${bsCheckin.year}-${bsCheckin.month}-${bsCheckin.day}`;
      const checkoutStr = `${bsCheckout.year}-${bsCheckout.month}-${bsCheckout.day}`;

      checkinRef.current.value = checkinStr;
      checkoutRef.current.value = checkoutStr;
    }, 0);

  }, [checkinDate, checkoutDate]);

  useLayoutEffect(() => {
    if (isInitialized.current) return;
    if (!checkinRef.current || !checkoutRef.current) return;

    isInitialized.current = true;
    // CHECKIN DATEPICKER
    checkinRef.current.NepaliDatePicker({
      miniEnglishDates: true,
      onSelect: function () {

        setTimeout(() => {

          const value = checkinRef.current.value;
          if (!value) return;

          const [y, m, d] = value.split("-");

          const ad = NepaliFunctions.BS2AD({
            year: Number(y),
            month: Number(m),
            day: Number(d),
          });

          setCheckinDate(new Date(ad.year, ad.month - 1, ad.day));

        }, 0);

      },
    });

    // CHECKOUT DATEPICKER
    checkoutRef.current.NepaliDatePicker({
      miniEnglishDates: true,
      onSelect: function () {

        setTimeout(() => {

          const value = checkoutRef.current.value;
          if (!value) return;

          const [y, m, d] = value.split("-");

          const ad = NepaliFunctions.BS2AD({
            year: Number(y),
            month: Number(m),
            day: Number(d),
          });

          setCheckoutDate(new Date(ad.year, ad.month - 1, ad.day));

        }, 0);

      },
    });
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkinDate || !checkoutDate) return;


    dispatch(fetchRoom({
      checkin: checkinDate,
      checkout: checkoutDate,
      roomNo: guestNo,
    }));

    let checkinStr = checkinDate.getFullYear() + '-' + (checkinDate.getMonth() + 1) + '-' + checkinDate.getDate();
    let checkoutStr = checkoutDate.getFullYear() + '-' + (checkoutDate.getMonth() + 1) + '-' + checkoutDate.getDate();

    navigate(
      `/room?checkin=${checkinStr}&checkout=${checkoutStr}&guest=${guestNo}`
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mx-auto text-sm">

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end"
      >

        {/* Check-in */}
        <div className="flex flex-col text-left">
          <label className="text-sm font-medium mb-2">
            Booking from Date
          </label>

          <input
            ref={checkinRef}
            type="text"
            className="border rounded-lg px-3 py-1 w-full"
          />
        </div>

        {/* Check-out */}
        <div className="flex flex-col text-left">
          <label className="text-sm font-medium mb-2">
            Booking to Date
          </label>

          <input
            ref={checkoutRef}
            type="text"
            className="border rounded-lg px-3 py-1 w-full"
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col text-left">
          <label className="text-sm font-medium mb-1">
            Guests
          </label>

          <input
            type="number"
            min="1"
            value={guestNo}
            onChange={(e) => setGuestNo(e.target.value)}
            className="border rounded-lg px-3 py-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 rounded-lg font-medium cursor-pointer"
        >
          Search
        </button>

      </form>

    </div>
  );
};

export default SearchRoom;