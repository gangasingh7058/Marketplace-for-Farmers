import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { languageatom } from "../atoms/languageatom";
import {showaddcropmodule} from "../atoms/showaddcropmodule";
import { useNavigate } from "react-router-dom";
import getcropdata from "../Functions/getcropdata";
import Addcropmodule from "../modules/addcropmodule";
import {dataadded} from "../atoms/dataadded"
import axios from "axios";

export default function HomePage() {
    const [cropArray, setCropArray] = useState([]);
    const navigate = useNavigate();

    const[deleted,setdeleted]=useState(true);

    const language = useRecoilValue(languageatom);
    const [cropmodule, setCropModule] = useRecoilState(showaddcropmodule);
    const dataadded2=useRecoilValue(dataadded);

    function handlepricebuttonclick() {
        navigate("/farmer/MandiPrice");
    }

    function returncroppng(crop) {
        if (crop === "Wheat" || crop === "wheat") {
            return <img className="w-[80px] h-[80px]" src="/wheat.png" alt="wheat" />;
        }
        if (crop === "rice" || crop === "Rice") {
            return <img className="w-[80px] h-[80px]" src="/rice.png" alt="rice" />;
        }
    }

    useEffect(() => {
        async function fetchCropData() {
            try {
                const cropData = await getcropdata();
                setCropArray(cropData.crops);
            } catch (error) {
                console.error("Failed to fetch crop data", error);
            }
        }

        fetchCropData();
    }, [dataadded2,deleted]);

    function handleaddcropbuttonclick() {
        setCropModule(prev => !prev);
    }

    function handlegovtscremmonclick(){
       window.open("https://sbi.co.in/hi/web/agri-rural/agriculture-banking/government-schemes")
    }

    function handleweatherbuttonOnClick(){
        window.open("https://mausam.imd.gov.in/hindinew/indexhi.php")
    }

    function handlepredictcrop(){
        navigate("/predictcrop")
    }

    function handlecroptimeline(){
        navigate("/croptimeline")
    }

    function handlesropdetails(){
        navigate("/cropguidance")
    }

    async function handledeletebuttonclick(cid){
        console.log(cid);
        
        try {

            const response=await axios.post("http://localhost:3000/farmer/deletecrop",{cid:cid})

            if(response.data.success){
                alert("Crop Deleted SuccessFully");
                setdeleted(!deleted);
            }
            else {
                alert("Unable To Delete")
                console.log(response.data);
                
            }
            
        } catch (error) {
            alert("Some Error Occured While Deleting");
            console.log(error);
            
        }
    }

    return (
        <div className="flex justify-between px-2 mt-4">
           <div className="bg-green-500 h-5/6 w-1/4 md:w-[200px] rounded-xl px-2 py-5 fixed flex flex-col space-y-4 ">
                
                <div>
                    <button onClick={handlesropdetails} className="font-bold text-lg uppercase tracking-wide py-3 px-6 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-lg">
                        {language ? "AI Soil Helthify" : "एआई मिट्टी स्वास्थ्य सुधार"}
                    </button>
                </div>

                <div>
                    <button onClick={handlepredictcrop} className="font-bold text-lg uppercase tracking-wide py-3 px-6 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-lg">
                        {language ? "AI Predict Crop" : "एआई फसल भविष्यवाणी"}
                    </button>
                </div>
                
                <div>
                    <button onClick={handlepricebuttonclick} className="font-bold text-lg uppercase tracking-wide py-3 px-6 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-lg">
                        {language ? "Get Latest Mandi Price of Crop" : "फसल की नवीनतम मंडी कीमत प्राप्त करें"}
                    </button>
                </div>

                

                <div>
                    <button onClick={handlecroptimeline} className="font-bold text-lg uppercase tracking-wide py-3 px-6 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-lg">
                        {language ? "Get Crop TimeLine" : "फसल समयरेखा प्राप्त क"}
                    </button>
                </div>

                

                <div>
                    <button onClick={handleweatherbuttonOnClick} className="font-bold text-lg uppercase tracking-wide py-3 px-6 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-lg">
                        {language ? "Weather Forcast for Crops" : "फसलों के लिए मौसम पूर्वानुमान"}
                    </button>
                </div>
                
                <div>
                    <button onClick={handlegovtscremmonclick} className="font-bold text-lg uppercase tracking-wide py-3 px-6 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-lg">
                        {language ? "Know About Government Policies" : "सरकारी नीतियों के बारे में जानें"}
                    </button>
                </div>
            </div>


            <div className="ml-[30%] md:ml-[15%] w-full mr-2">
                <div className="topdiv bg-gray-300 w-full h-16 rounded-3xl flex justify-end items-center">
                    <button className="mr-8 font-semibold text-xl uppercase tracking-wide py-2 px-3 rounded-3xl text-white bg-green-600 hover:bg-green-700 shadow-lg" onClick={handleaddcropbuttonclick}>
                        {language ? "Add Crop" : "फसल जोड़ें"}
                    </button>
                </div>

                <div className="bottomdiv grid grid-cols-12 border-2 gap-8 mt-10">
                    <div className="col-span-1 py-2 flex items-center justify-center font-semibold text-green-700 text-2xl hover:text-green-900">{language ? "Crop" : "फसल"}</div>
                    <div className="col-span-2 py-2 flex items-center justify-center font-semibold text-green-700 text-2xl hover:text-green-900">{language ? "Name" : "नाम"}</div>
                    <div className="col-span-2 py-2 flex items-center justify-center font-semibold text-green-700 text-2xl hover:text-green-900">{language ? "Date" : "तारीख"}</div>
                    <div className="col-span-2 py-2 flex items-center justify-center font-semibold text-green-700 text-2xl hover:text-green-900">{language ? "Quantity" : "मात्रा"}</div>
                    <div className="col-span-2 py-2 flex items-center justify-center font-semibold text-green-700 text-2xl hover:text-green-900">{language ? "Price/Quintillion" : "कीमत/क्विंटल"}</div>
                    <div className="col-span-2 py-2 flex items-center justify-center font-semibold text-green-700 text-2xl hover:text-green-900">{language ? "Total Price" : "कुल कीमत"}</div>
                    <div className="col-span-1 py-2 flex items-center justify-center font-semibold text-green-700 text-2xl hover:text-green-900">{language ? "Delete" : "हटाएँ"}</div>

                    {cropArray.length > 0 ? (
                        cropArray.map((crop, index) => (
                            <React.Fragment key={index}>
                                <div className="col-span-1 flex items-center justify-center text-xl text-green-800">{returncroppng(crop.crop)}</div>
                                <div className="col-span-2 flex items-center justify-center text-xl text-green-800">{crop.crop}</div>
                                <div className="col-span-2 flex items-center justify-center text-xl text-green-800">{crop.date.split("T")[0]}</div>
                                <div className="col-span-2 flex items-center justify-center text-xl text-green-800">{crop.quantity} {language ? "Quintal" : "क्विंटल"}</div>
                                <div className="col-span-2 flex items-center justify-center text-xl text-green-800">₹{crop.price}</div>
                                <div className="col-span-2 flex items-center justify-center text-xl text-green-800">₹{crop.price * crop.quantity}</div>
                                <button onClick={()=>{handledeletebuttonclick(crop.id)}} className="col-span-1 flex items-center justify-center text-xl text-green-800 hover:text-green-900">{language ? "Delete" : "हटाएँ"}</button>
                            </React.Fragment>
                        ))
                    ) : (
                        <div className="col-span-12 flex items-center justify-center text-xl text-green-800">
                            {language ? "No crop data available" : "कोई फसल डेटा उपलब्ध नहीं है"}
                        </div>
                    )}
                </div>
            </div>

            {cropmodule && <Addcropmodule />}
        </div>
    );
}
