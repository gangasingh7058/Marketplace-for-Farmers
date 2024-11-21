import { useState } from "react";
import Formfortransportation from "./formfortransportation";
import truck from "../../../public/truck.avif";
import truck2 from "../../../public/truck2.avif";
import truck3 from "../../../public/truck3.webp";
import getTransportProviders from "./gettransportprovider";

export default function TransportationPage() {
    const [showform, setShowForm] = useState(true); // Initially show the form
    const [providers, setProviders] = useState([]); // Providers data
    const [userdata, setUserdata] = useState(null); // Store user form data

    const handleFormSubmit = (data) => {
        // Get provider data based on form data
        const providerData = getTransportProviders(data);
        setProviders(providerData); // Set the providers data
        setShowForm(false); // Hide the form after submission
    };

    return (
        <>
            <div className="flex justify-between w-full overflow-y-hidden">
                <div className="bg-black w-1/4 grid grid-rows-3" style={{ height: "calc(100vh - 70px)" }}>
                    <img className="w-full h-full object-cover" src={truck} alt="Truck image" />
                    <img className="w-full h-full object-cover" src={truck2} alt="Truck2 Img" />
                    <img className="w-full h-full object-cover" src={truck3} alt="Truck3 Img" />
                </div>

                <div className="bg-green-600 w-3/4" style={{ height: "calc(100vh - 70px)" }}>
                    {showform ? (
                        <Formfortransportation onSubmit={handleFormSubmit} />
                    ) : (
                        <div className="gap-4 space-y-10 p-4">
                            {providers.length > 0 ? (
                                providers.map((provider, index) => (
                                    <div className="border p-4 rounded-lg shadow-lg bg-white flex justify-between items-center">
                                            <div className="">
                                                <div key={index} className=" space-y-2">
                                                <h3 className="text-2xl font-semibold">{provider.provider}</h3>
                                                <p className="text-xl">Cost: ₹{provider.cost}</p>
                                                <p className="text-lg">ETA: {provider.eta}</p>
                                                </div>
                                        </div>
                                        <div>
                                            <button className="text-xl font-bold text-green-200 bg-green-800 h-[80px] px-4 rounded-full">Connect</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No providers available.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
