import { useNavigate } from "react-router-dom";
import farmerimg from "../../public/farmerphoto.avif";
import buyerphoto from "../../public/buyerphoto.avif";

export default function FarmerorBuyer({ setwho }) {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center"
    >
      <div className="flex space-x-10 p-10 bg-white shadow-2xl rounded-lg">
        {/* Farmer Section */}
        <div
          onClick={() => {
            navigate("/farmer");
            setwho("farmer");
          }}
          className="cursor-pointer transform transition-transform hover:scale-105"
        >
          <div className="relative w-[400px] h-[500px] rounded-lg overflow-hidden shadow-lg">
            <img
              src={farmerimg}
              alt="Farmer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">FARMER</span>
            </div>
          </div>
        </div>

        {/* Buyer Section */}
        <div
          onClick={() => {
            navigate("/user");
            setwho("user");
          }}
          className="cursor-pointer transform transition-transform hover:scale-105"
        >
          <div className="relative w-[400px] h-[500px] rounded-lg overflow-hidden shadow-lg">
            <img
              src={buyerphoto}
              alt="Buyer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">BUYER</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
