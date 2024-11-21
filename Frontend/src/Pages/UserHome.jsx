import React, { useEffect, useState } from "react";
import cropquantitylist from "../Helping Componjents/cropquantitylist";
import { languageatom } from "../atoms/languageatom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import democropDataofuser from "../Helping Componjents/democroparrayforuser";
import { useNavigate } from "react-router-dom";

export default function User_Home() {

   const navigate=useNavigate();

    const [cropArray, setcropArray] = useState([]);
    const [tempcroarray, settempcroparray] = useState([]);
    const [userselection, setuserselection] = useState({
        crop: "wheat",
        quantity: 0
    });

    useEffect(() => {
        settempcroparray(democropDataofuser);
    }, []);

    function handleonchange(e) {
        const { name, value } = e.target;
        setuserselection({ ...userselection, [name]: value });
    }

    function handleonSubmit(e) {

        e.preventDefault();

        async function getcropforuser() {
            console.log("Here");
            
            try {
                const response = await axios.post("http://localhost:3000/user/getcrops", userselection);
                ;
                
                if (response.data.success) {
                    console.log(response.data);
                    
                    setcropArray(response.data.response);
                } else {
                    alert("Some Error Occured While Fetching data");
                }
            } catch (error) {
                alert("Some Error Occured While Fetching data");
                console.log(error);
            }
        }
        getcropforuser();
    }

    const language = useRecoilValue(languageatom);

    function handleonConnect() {
        alert("Request sent! The farmer will connect with you.");
    }

    function returncroppng(crop) {
        if (crop === "Wheat" || crop === "wheat") {
            return <img className="w-[80px] h-[80px]" src="/wheat.png" alt="wheat" />;
        }
        if (crop === "rice" || crop === "Rice") {
            return <img className="w-[80px] h-[80px]" src="/rice.png" alt="rice" />;
        }
    }


    function handletransportationclick(){
        console.log("Transportation Pressed");
        
        navigate("/transportation")
      }

    return (
        <>
            <div className="parent flex justify-between px-2 mt-4">
                
                {/*Left Part */}

                <div className="bg-[#0096c7] w-1/4 md:w-[20%] rounded-xl px-2 py-5 flex flex-col space-y-4 min-h-screen">
                <div>
                    <button onClick={handletransportationclick} className="font-bold text-lg uppercase tracking-wide py-3 px-6 rounded-full bg-[#023e8a] text-white hover:bg-[#023e8a] shadow-lg">
                        {language ? "Connect To Transportation with ONDC" : "फसल की नवीनतम मंडी कीमत प्राप्त करें"}
                    </button>
                </div>
            </div>





                {/*Right Part */}



                <div className="rightbar ml-[5%] md:ml-[5%] w-full mr-2">
                    <div className="topdiv bg-gray-300 gap-2 w-full h-16 rounded-3xl flex justify-start items-center px-8">
                        <form className="flex gap-8" onSubmit={handleonSubmit}>
                            <div className="flex items-center">
                                <label htmlFor="commodity" className="mr-2">Select Commodity</label>
                                <select name="crop" id="crop" className="rounded-md p-1" value={userselection.crop} onChange={handleonchange}>
                                    <option value="wheat">Wheat</option>
                                    <option value="rice">Rice</option>
                                </select>
                            </div>

                            <div className="flex items-center">
                                <label htmlFor="quantity" className="mr-2">Select Quantity</label>
                                <select name="quantity" id="quantity" className="rounded-md p-1" value={userselection.quantity} onChange={handleonchange}>
                                    {cropquantitylist.map((c) => (
                                        <option value={c} key={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit"  className="bg-[#00b4d8] w-20 h-14 rounded-3xl text-white font-semibold">
                                Search
                            </button>
                        </form>
                    </div>

                    <div className="croplist grid grid-cols-12 border-2 gap-8 mt-10">
                        <div className="col-span-1 flex items-center justify-center font-semibold text-[#00b4d8] text-2xl hover:text-[#0077b6]">{language ? "Crop" : "फसल"}</div>
                        <div className="col-span-1 flex items-center justify-center font-semibold text-[#00b4d8] text-2xl hover:text-[#0077b6]">{language ? "State" : "राज्य"}</div>
                        <div className="col-span-2 flex items-center justify-center font-semibold text-[#00b4d8] text-2xl hover:text-[#0077b6]">{language ? "Farmer Name" : "किसान का नाम"}</div>
                        <div className="col-span-2 flex items-center justify-center font-semibold text-[#00b4d8] text-2xl hover:text-[#0077b6]">{language ? "Quantity" : "मात्रा"}</div>
                        <div className="col-span-2 flex items-center justify-center font-semibold text-[#00b4d8] text-2xl hover:text-[#0077b6]">{language ? "Price/Quintillion" : "कीमत/क्विंटल"}</div>
                        <div className="col-span-2 flex items-center justify-center font-semibold text-[#00b4d8] text-2xl hover:text-[#0077b6]">{language ? "Total Price" : "कुल कीमत"}</div>
                        <div className="col-span-2 flex items-center justify-center font-semibold text-[#00b4d8] text-2xl hover:text-[#0077b6]">{language ? "Connect" : "किसान से जुड़ें"}</div>

                        {cropArray.length > 0 ? (
                            cropArray.map((crop, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-span-1 flex items-center justify-center text-xl text-[#00b4d8]">{returncroppng(crop.crop)}</div>
                                    <div className="col-span-1 flex items-center justify-center text-xl text-[#00b4d8]">{crop.farmer.state}</div>
                                    <div className="col-span-2 flex items-center justify-center text-xl text-[#00b4d8]">{crop.farmer.fname}</div>
                                    <div className="col-span-2 flex items-center justify-center text-xl text-[#00b4d8]">{crop.quantity} {language ? "Quintal" : "क्विंटल"}</div>
                                    <div className="col-span-2 flex items-center justify-center text-xl text-[#00b4d8]">₹{crop.price}</div>
                                    <div className="col-span-2 flex items-center justify-center text-xl text-[#00b4d8]">₹{crop.price * crop.quantity}</div>
                                    <button onClick={handleonConnect} className="col-span-2 flex items-center justify-center text-xl text-[#00b4d8] hover:text-[#0077b6]">{language ? "Connect" : "किसान से जुड़ें"}</button>
                                </React.Fragment>
                            ))
                        ) : (
                            <div className="col-span-12 flex items-center justify-center text-xl text-[#00b4d8]">
                                {language ? "No crop data available" : "कोई फसल डेटा उपलब्ध नहीं है"}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
