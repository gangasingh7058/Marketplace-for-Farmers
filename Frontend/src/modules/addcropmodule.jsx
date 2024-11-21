// import React from 'react';
// import { useSetRecoilState } from 'recoil';
// import {showaddcropmodule} from "../atoms/showaddcropmodule"
// import axios  from 'axios';
// import { useState } from 'react';
// import {dataadded} from "../atoms/dataadded"
// import { languageatom } from '../atoms/languageatom';

// export default function Addcropmodule() {


    
//     const curdate=new Date();
//     const fullDate = curdate.toLocaleDateString();
//     const closemodule=useSetRecoilState(showaddcropmodule)
//     const setdataadded=useSetRecoilState(dataadded);

//     const [cropdata,setcropdata]=useState({
//         mobile:1234567899,
//         crop:"",
//         quantity:null,
//         date:fullDate,
//         price:null
//     })

//     function handleonchange(e){
//         const {name,value}=e.target;

//         setcropdata(prevdata=>({
//             ...prevdata,
//             [name]:value
//         }))
//     }

//     async function handleonSubmit(e){
//         e.preventDefault();

//         try {

//             if (!cropdata.crop || !cropdata.quantity || !cropdata.price){
//                 alert("Fill All FIELDS");
//                 return
//             }

//             const response=await axios.post("http://localhost:3000/farmers/addcropdata",cropdata)

//             if(response.data.success){
//                 alert("Crops Added Successfully")
//                 setdataadded(c=>!c);
//                 closemodule(c=>!c);
                
//             }
//             else{
//                 throw error;
//             }
            
//         } catch (error) {
//             alert("error occured in posting crop data");
//             console.error("Error occured at posting cropdata => "+error);
            
//         }
//     }

   

//     try {
        
//     } catch (error) {
//         alert("Error Occured at AddcropModule");
//         console.error("Error at Addcropmodule is ->" +error);
        
//     }

//     function handleclosebuttonclick(){
//         closemodule(c=>!c);
//     }

//     return (
//         <div
//             className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70"
//             style={{ minHeight: 'calc(100vh - 80px)' }} // Adjusting height to account for navbar
//         >
//             <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//                 <div className="text-center mb-6">
//                     <h1 className="text-2xl font-bold">ADD CROP</h1>
//                     <p className="text-lg">ENTER DETAILS</p>
//                 </div>
//                 <form onSubmit={handleonSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="crop" className="block text-sm font-semibold mb-2">CROP</label>
//                         <select
//                             id="crop"
//                             className="w-full p-2 border rounded"
//                             name='crop'
//                             value={cropdata.crop}
//                             onChange={handleonchange}
//                         >
//                             <option value="">Select a crop</option>
//                             <option value="wheat">Wheat</option>
//                             <option value="rice">Rice</option>
//                         </select>
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="quantity" className="block text-sm font-semibold mb-2">Quantity (Quintal)</label>
//                         <input
//                             type="number"
//                             placeholder="Quantity (Quintal)"
//                             id="quantity"
//                             className="w-full p-2 border rounded"
//                             name='quantity'
//                             value={cropdata.quantity}
//                             onChange={handleonchange}
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label htmlFor="price" className="block text-sm font-semibold mb-2">Price per Quintal</label>
//                         <input
//                             type="number"
//                             placeholder="Price / Quintal"
//                             id="price"
//                             className="w-full p-2 border rounded"
//                             name='price'
//                             value={cropdata.price}
//                             onChange={handleonchange}
//                         />
//                     </div>
//                     <div>
//                         <button
//                             type="submit"
//                             className="w-full p-3 bg-green-600 text-white rounded shadow"
//                         >
//                             SUBMIT
//                         </button>
//                     </div>
//                 </form>
//                 <div className="mt-4">
//                     <button
//                         className="w-full p-3 bg-gray-500 text-white rounded shadow"
//                         onClick={handleclosebuttonclick}
//                     >
//                         CANCEL
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { showaddcropmodule } from "../atoms/showaddcropmodule";
import axios from 'axios';
import { useState } from 'react';
import { dataadded } from "../atoms/dataadded";
import { languageatom } from '../atoms/languageatom';

export default function Addcropmodule() {

    const curdate = new Date();
    const fullDate = curdate.toLocaleDateString();
    const closemodule = useSetRecoilState(showaddcropmodule);
    const setdataadded = useSetRecoilState(dataadded);
    const language = useRecoilValue(languageatom); // Get the current language setting

    const [cropdata, setcropdata] = useState({
        phone:12345,
        crop: "",
        quantity: null,
        date: fullDate,
        price: null
    });


    function handleonchange(e) {
        const { name, value } = e.target;

        setcropdata(prevdata => ({
            ...prevdata,
            [name]: value
        }));
    }

    async function handleonSubmit(e) {
        e.preventDefault();

        try {
            // confirm("Confirm Listing");
            if (!cropdata.crop || cropdata.quantity === null || cropdata.price === null) {
                alert(!language ? "सभी फ़ील्ड भरें" : "Fill All FIELDS");
                return;
            }

            const response = await axios.post("http://localhost:3000/farmer/crops", cropdata);

            if (response.data.success) {
                alert(!language ? "फसलों को सफलतापूर्वक जोड़ा गया" : "Crops Added Successfully");
                setdataadded(c => !c);
                closemodule(c => !c);
            } else {
                throw new Error('Failed to add crop data');
            }
        } catch (error) {
            alert(!language ? "फसल डेटा पोस्ट करने में त्रुटि हुई" : "Error occurred in posting crop data");
            console.error("Error occurred at posting cropdata => " + error);
        }
    }

    function handleclosebuttonclick() {
        closemodule(c => !c);
    }

    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70"
            style={{ minHeight: 'calc(100vh - 80px)' }} // Adjusting height to account for navbar
        >
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">{!language ? "फसल जोड़ें" : "ADD CROP"}</h1>
                    <p className="text-lg">{!language ? "विवरण दर्ज करें" : "ENTER DETAILS"}</p>
                </div>
                <form onSubmit={handleonSubmit}>
                    <div className="mb-4">
                        <label htmlFor="crop" className="block text-sm font-semibold mb-2">{language ? "फसल" : "CROP"}</label>
                        <select
                            id="crop"
                            className="w-full p-2 border rounded"
                            name='crop'
                            value={cropdata.crop}
                            onChange={handleonchange}
                        >
                            <option value="">{!language ? "फसल चुनें" : "Select a crop"}</option>
                            <option value="wheat">{!language ? "गेहूं" : "Wheat"}</option>
                            <option value="rice">{!language ? "चावल" : "Rice"}</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-sm font-semibold mb-2">{!language ? "मात्रा (क्विंटल)" : "Quantity (Quintal)"}</label>
                        <input
                            type="number"
                            placeholder={!language ? "मात्रा (क्विंटल)" : "Quantity (Quintal)"}
                            id="quantity"
                            className="w-full p-2 border rounded"
                            name='quantity'
                            value={cropdata.quantity || ''}
                            onChange={handleonchange}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="price" className="block text-sm font-semibold mb-2">{!language ? "कीमत प्रति क्विंटल" : "Price per Quintal"}</label>
                        <input
                            type="number"
                            placeholder={!language ? "कीमत / क्विंटल" : "Price / Quintal"}
                            id="price"
                            className="w-full p-2 border rounded"
                            name='price'
                            value={cropdata.price || ''}
                            onChange={handleonchange}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full p-3 bg-green-600 text-white rounded shadow"
                        >
                            {!language ? "सबमिट करें" : "SUBMIT"}
                        </button>
                    </div>
                </form>
                <div className="mt-4">
                    <button
                        className="w-full p-3 bg-gray-500 text-white rounded shadow"
                        onClick={handleclosebuttonclick}
                    >
                        {!language ? "रद्द करें" : "CANCEL"}
                    </button>
                </div>
            </div>
        </div>
    );
}

