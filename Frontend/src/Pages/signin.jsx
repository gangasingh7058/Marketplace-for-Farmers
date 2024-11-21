import { useState } from "react";
import axios from "axios";
import{useNavigate} from "react-router-dom"
import { useRecoilValue } from "recoil";
import {languageatom} from "../atoms/languageatom"

function SignIn_Page(){

    const navigate=useNavigate()

    const language=useRecoilValue(languageatom);

    const [userinputs,setuserinputs]=useState({
        phone:null,
        password:""
    })

    function handleonchange(e){
        const {name,value}=e.target;
        setuserinputs((userinputs)=>(
            {...userinputs,
                [name]:value
            }
        ))
        
    }


    async function handlesubmit(e){

        e.preventDefault();

        try{
            const senddata=await axios.post("http://localhost:3000/farmer/signin",userinputs)
            console.log(senddata.data);
            
            if((senddata.data.success)){
                alert("WELCOME")
                // console.log(senddata.data);
                navigate("/farmer/homepage")
            }
            else{
                alert("InValid Inputs")
                console.log(senddata.data.error);
                
            }

        }catch (err){
            alert("some error occured")
            console.log(err);            
        }

        
    }

    return <div className="bckground w-full h-screen bg-[url('/images1.jpeg')]  bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center overflow-x-hidden ">
                <div className="bg-white bg-opacity-60 max-w-lg w-full sm:w-2/3 p-4 rounded-xl shadow-2xl" >
                
                        <div className="toppart mt-4">
                            <div className="flex justify-center">
                                <p className="font-bold text-4xl text-green-700">{language?"Sign In":"साइन इन"}</p>
                            </div>
                            <div className="text-center text-sm mt-2 text-gray-500">
                                <p className="text-green-700">{language?"Enter your credentials to access your account":"अपने खाते तक पहुँचने के लिए अपनी साख दर्ज करें"}</p>
                            </div><br />
                        </div>
                        <div className="formpaer mt-2 ">
                            <form onSubmit={handlesubmit} className="">
                                
                            <label htmlFor="phone" className="font-bold text-lg text-green-700">{language?"Phone No.":"फोन नंबर"}</label>
                                <input 
                                type="number" 
                                id="phone"
                                placeholder={language?"Enter Your Phone No.":"आपका फोन नंबर"}
                                name="phone"
                                value={userinputs.phone}
                                onChange={handleonchange}
                                maxLength={10}
                                className="border-2 px-3 py-1 border-green-500 w-full rounded-lg my-2"
                                /><br />

                            <label htmlFor="password" className="font-bold text-lg text-green-700">{language?"Password":"आपका पासवर्ड"}</label><br />
                                    <input 
                                            type="text" 
                                            id="password"
                                            placeholder={language?"Password":"अब आपका पासवर्ड"}
                                            name="password"
                                            value={userinputs.password}
                                            onChange={handleonchange}
                                            className="border-2 px-3 py-1 border-green-500 w-full rounded-lg my-2"
                                    /><br />

                                   
                                <div className="flex justify-center my-2">
                                    <button type="submit" className="w-full text-white bg-green-400 py-2 rounded-lg">{language?"Sign In":"साइन इन"}</button>   
                                </div>
                                
                                <div className="flex justify-center gap-2 font-semibold pt-1 text-green-700">
                                    {language?"Don't have an account?":"क्या आपका खाता नहीं है?"} <a href="http://localhost:5174/farmer/signup" ><u>{language?"Sign_UP":"साइन अप"}</u></a>
                                </div>            
                            </form>
                        </div>
        
    </div>
    </div> 
    
}

export default SignIn_Page;