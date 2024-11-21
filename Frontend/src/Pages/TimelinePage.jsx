import React, { useState } from "react";
import { demodatafortimeline_punjab_wheat, demodatafortimelinehindi_punjab_wheat, demodatafortimeline_punjab_rice, demodatafortimelinehindi_punjab_rice } from "../Helping Componjents/croptimelinedemodata";
import { languageatom } from "../atoms/languageatom";
import { useRecoilValue } from "recoil";

export default function TimeLine_Page() {
    const language = useRecoilValue(languageatom);
    const [showcontent, setshowcontent] = useState(false);
    const [croptimelist, setcroptimelist] = useState(demodatafortimeline_punjab_wheat);

    const [userselection, setuserselection] = useState({
        crop: "wheat",
        state: "punjab",
    });

    function handleOnChange(e) {
        const { name, value } = e.target;
        setuserselection({
            ...userselection,
            [name]: value,
        });
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(userselection);

        if (userselection.crop === "wheat" && userselection.state === "punjab") {
            language ? setcroptimelist(demodatafortimeline_punjab_wheat) : setcroptimelist(demodatafortimelinehindi_punjab_wheat);
            setshowcontent(true);
        }

        if (userselection.crop === "rice" && userselection.state === "punjab") {
            language ? setcroptimelist(demodatafortimeline_punjab_rice) : setcroptimelist(demodatafortimelinehindi_punjab_rice);
            setshowcontent(true);
        }
    }

    let s = 1;

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Crop Timeline Selection</h2>

                {/* Form Section */}
                <form onSubmit={handleOnSubmit} className="space-y-6">
                    {/* Crop Selection */}
                    <div>
                        <label htmlFor="crop" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Crop
                        </label>
                        <select
                            name="crop"
                            id="crop"
                            value={userselection.crop}
                            onChange={handleOnChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="wheat">Wheat</option>
                            <option value="rice">Rice</option>
                        </select>
                    </div>

                    {/* State Selection */}
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            Select State
                        </label>
                        <select
                            name="state"
                            id="state"
                            value={userselection.state}
                            onChange={handleOnChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="punjab">Punjab</option>
                            
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Content Section */}
            {showcontent && (
                <div className="w-full max-w-4xl mt-8">
                    <div className="grid grid-cols-7 border-2 border-gray-300 rounded-lg overflow-hidden">
                        {/* Header Row */}
                        <div className="col-span-1 py-4 bg-gray-100 font-semibold text-sm sm:text-base text-center border-b">
                            Sr No.
                        </div>
                        <div className="col-span-1 py-4 bg-gray-100 font-semibold text-sm sm:text-base text-center border-b">
                            Stage
                        </div>
                        <div className="col-span-3 py-4 bg-gray-100 font-semibold text-sm sm:text-base text-center border-b">
                            Preparation
                        </div>
                        <div className="col-span-2 py-4 bg-gray-100 font-semibold text-sm sm:text-base text-center border-b">
                            Time
                        </div>

                        {/* Data Rows */}
                        {croptimelist.map((m, key) => (
                            <React.Fragment key={key}>
                                <div className="col-span-1 py-2 text-center border-b">
                                    {s++}.
                                </div>
                                <div className="col-span-1 py-2 text-center border-b">
                                    {m.Stage}
                                </div>
                                <div className="col-span-3 py-2 text-center border-b">
                                    {m.Activity}
                                </div>
                                <div className="col-span-2 py-2 text-center border-b">
                                    {m.Timeframe}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
