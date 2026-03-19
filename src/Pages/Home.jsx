import SearchRoom from '../Component/SearchRoom'
import Room from './Room/RoomList'
import hotelImg from "../assets/images/hotel-image.webp";

const Home = () => {
    return (
        <div>
            <div
                className="relative bg-cover bg-center min-h-125 flex items-center justify-center px-4"
                style={{ backgroundImage: `url(${hotelImg})` }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 w-full max-w-5xl text-center">
                    <h2 className="text-white text-3xl md:text-5xl font-bold mb-6 md:mb-10">
                        Book Your Room Here
                    </h2>
                    <SearchRoom />
                </div>
            </div>

            {/* <Room /> */}
        </div>
    )
}

export default Home
