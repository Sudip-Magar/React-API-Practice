route for API Call
Route::middleware(['tenant'])->get('/room', [\App\Http\Controllers\MasterSetup\SearchReportController::class, 'room'] );
Route::middleware(['tenant'])->post('/booking/create', [\App\Http\Controllers\MasterSetup\SearchReportController::class, 'createBooking'] );

controller for API in laravel
public function room(Request $request)
    {
        $checkin = Carbon::parse($request->checkin)->format('Y-m-d');
        $checkout = Carbon::parse($request->checkout)->format('Y-m-d');
    $guest = $request->guest;

    $rooms = HotelRoom::query()

        // ✅ select only needed room columns
        ->select(
            'id',
            'name_en',
            'name_np',
            'category_id',
            'block_id',
            'floor_id',
            'room_id',
            'price',
            'max_guest'
        )

        ->with([
            'category:id,name_en,name_np',
            'block:id,name_en,name_np',
            'floor:id,name_en,name_np',

            'features:id,name_en,name_np',

            'images:id,imageable_id,media_name',
            'featureImage:id,imageable_id,media_name',

            'connectedRoom:id,name_en',

            'descriptions:id,room_id,description,basic_setup_id',
            'descriptions.basicSetup:id,name_en,name_np',
        ])

        // ✅ guest filter
        ->when($guest, function ($q) use ($guest) {
            $q->where('max_guest', '=', $guest);
        })

        // ✅ availability filter (IMPORTANT 🔥)
        ->whereNotIn('id', function ($query) use ($checkin, $checkout) {

            // bookings
            $query->select('room_id')
                ->from('hotel_bookings')
                ->where('arrival_date_en', '<', $checkout)
                ->where('departure_date_en', '>', $checkin)

                ->union(

                    // checkins
                    \DB::table('hotel_checkins')
                        ->select('room_id')
                        ->where('checkin_date_en', '<', $checkout)
                        ->where('departure_date_en', '>', $checkin)
                );
        })

        ->get();

        return response()->json([
            'status' => true,
            'data' => $rooms
        ]);
    }

    public function createBooking(Request $request){
        $validated = $request->validate([
            'guest_id' => 'required',
            'booking_date_np' => 'required',
            'arrival_date_np' => 'required',
            'booked_by' => 'required',
            'arrival_time' => 'required',
            'departure_date_np' => 'required',
            'departure_time' => 'required',
            'total_nights' => 'required',
            'no_of_adults' => 'required',
            'no_of_children' => 'required',
            'room_id' => 'required',
            'document_number_id' => 'required',
            'booking_status' => 'required',
            'advance_amt' => 'nullable|numeric|min:0',
            'booking_date_en' => ['required', 'date', 'after_or_equal:today'],
            'arrival_date_en' => ['required', 'date', 'after_or_equal:today'],
            'departure_date_en' => ['required', 'date', 'after_or_equal:arrival_date_en'],

        ]);

        return response()->json([
             'status' => true,
            'data' => $request->json('drop_address'),
        ],200);
    }