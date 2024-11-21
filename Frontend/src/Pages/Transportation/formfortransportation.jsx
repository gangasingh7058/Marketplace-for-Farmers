import { useState } from "react";
import { useRecoilValue } from "recoil";
import { languageatom } from "../../atoms/languageatom";

function Formfortransportation({ onSubmit }) {
    const language = useRecoilValue(languageatom); // Language management (English / Hindi)
    
    const [transportdetails, setTransportdetails] = useState({
        pickup: "",
        drop: "",
        weight: 0,
        unit: "Quintal",
    });

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setTransportdetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleonSubmit = (e) => {
        e.preventDefault();
        console.log(transportdetails);  // Debugging - Log form data
        onSubmit(transportdetails); // Send form data to the parent
        setTransportdetails({
            pickup: "",
            drop: "",
            weight: 0,
            unit: "Quintal",
        });
    };

    return (
        <div className="w-full h-full flex justify-center items-center bg-gray-100">
            <div className="w-[500px] bg-white shadow-lg rounded-lg p-8">
                <div className="flex justify-center text-3xl font-bold mb-6 text-gray-700">
                    {language ? "Add Details" : "विवरण जोड़ें"}
                </div>
                <form className="space-y-6" onSubmit={handleonSubmit}>
                    {/* Pickup Location */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="pickup" className="text-xl font-semibold text-gray-700">
                            {language ? "Pick Up Location" : "पिकअप स्थान"}
                        </label>
                        <input
                            type="text"
                            id="pickup"
                            name="pickup"
                            value={transportdetails.pickup}
                            onChange={handleOnchange}
                            placeholder="e.g., Khairpur, Hisar Road, Sirsa"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Drop Location */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="drop" className="text-xl font-semibold text-gray-700">
                            {language ? "Drop Location" : "ड्रॉप स्थान"}
                        </label>
                        <input
                            type="text"
                            id="drop"
                            name="drop"
                            value={transportdetails.drop}
                            onChange={handleOnchange}
                            placeholder="e.g., Golden Avenue, Ludhiana"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Weight and Unit */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="weight" className="text-xl font-semibold text-gray-700">
                            {language ? "Select Weight" : "वजन चुनें"}
                        </label>
                        <div className="flex space-x-4">
                            <input
                                type="number"
                                id="weight"
                                name="weight" // Corrected here
                                value={transportdetails.weight}
                                onChange={handleOnchange}
                                placeholder="e.g., 50"
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <select
                                name="unit"
                                id="unit"
                                value={transportdetails.unit}
                                onChange={handleOnchange}
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="Quintal">Quintal</option>
                                <option value="Kg">Kg</option>
                                <option value="Ton">Ton</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-800 transition duration-300"
                    >
                        {language ? "Submit" : "जमा करें"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Formfortransportation;
