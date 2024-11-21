import { useState } from "react";
import axios from "axios"
import{useNavigate} from "react-router-dom"
import indianStates from "../Helping Componjents/indianstates"

function SignUp_Page(){

    const [userinputs,setuserinputs]=useState({
        fname:"",
        lname:"",
        password:"",
        phone:null,
        state:"",
        pincode:null
    })

    // const navigate=useNavigate();

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
            const senddata=await axios.post("http://127.0.0.1:5000/farmer/sign-up/",userinputs)
            if(!(senddata.data.success)){
                alert(senddata.data.msg)
                console.log(senddata.data);
                
            }
            else{
                alert(senddata.data.msg);
                const jwttoken=senddata.data.token;
                localStorage.setItem('token',jwttoken)
                navigate("/dashboard")
            }

        }catch (err){
            alert("some error occured")
            console.log(err.response);
            
        }

        alert("Logged In");
    }

    return <div className=" w-screen h-screen bg-[url('/images1.jpeg')]  bg-cover bg-no-repeat bg-center flex justify-center items-center">
        
        <div className="from bg-white bg-opacity-60 w-2/5 sm:w-2/6 p-4 rounded-xl shadow-2xl">
            <div className="topbar ">
                <div className="flex justify-center">
                    <p className="font-bold text-4xl text-green-700">
                    {/* Sign Up */}
                    साइन अप करें
                    </p>
                </div>
                <div className="text-center mt-2 text-zinc-700 text-sm">
                    <p className="text-green-700">
                    खाता बनाने के लिए अपनी जानकारी दर्ज करें
                        {/* Enter Your information to create an account\ */}
                    </p>
                </div>
            </div>
            
            <form onSubmit={handlesubmit} className="">

                <label htmlFor="fname" className="font-bold text-lg text-green-700">First Name</label><br />
                <input 
                type="text" 
                id="fname" 
                placeholder="अपना पहला नाम"
                name="fname"
                value={userinputs.fname}
                onChange={handleonchange}
                className="border-2 px-3 py-1 border-green-500 w-full rounded-lg my-2"
                /><br />

                <label htmlFor="lname" className="font-bold text-lg text-green-700">Last Name</label><br />
                <input 
                type="text" 
                id="lname" 
                placeholder="आपका अंतिम नाम"
                name="lname"
                value={userinputs.lname}
                onChange={handleonchange}
                className="border-2 px-3 py-1 border-green-500 w-full rounded-lg my-2"
                /><br />

                <label htmlFor="phone" className="font-bold text-lg text-green-700">Phone No.</label>
                <input 
                type="number" 
                id="phone"
                placeholder="आपका फोन नंबर"
                name="phone"
                value={userinputs.phone}
                onChange={handleonchange}
                maxLength={10}
                className="border-2 px-3 py-1 border-green-500 w-full rounded-lg my-2"
                /><br />

                <label htmlFor="password" className="font-bold text-lg text-green-700">Password</label><br />
                <input 
                type="text" 
                id="password"
                placeholder="अब आपका पासवर्ड"
                name="password"
                value={userinputs.password}
                onChange={handleonchange}
                className="border-2 px-3 py-1 border-green-500 w-full rounded-lg my-2"
                /><br />

                

                <label htmlFor="state" className="font-bold text-lg text-green-700">State</label><br />
                    <select
                        id="state"
                        name="state"
                        value={userinputs.state}
                        onChange={handleonchange}
                        className="border-2 px-3 py-1 border-green-500 w-full rounded-lg my-2"
                    >
                       {indianStates.map((state)=>{
                        return <option value={state} key={state}>{state}</option>
                       })}
                    </select><br />

                <label htmlFor="pincode" className="font-bold text-lg text-green-700">Area PIN CODE</label><br />
                <input 
                type="number" 
                id="pincode"
                placeholder="आपके क्षेत्र का पिन कोड"
                name="pincode"
                value={userinputs.pincode}
                onChange={handleonchange}
                className="border-2 px-3 py-1 border-green-500 w-full rounded-lg my-2"
                /><br />


                <div className="flex justify-center my-2">
                    <button type="submit" className="w-full text-white bg-green-400 py-2 rounded-lg">Sign Up</button>
                </div>

                <div className="flex flex-col lg:flex-row justify-center gap-2 font-semibold pt-1 items-center text-green-700">
                    Already Have an account ? <a href="http://localhost:5174/farmer"><u>Login</u></a>
                </div>


            </form>
        </div>
    </div>
}


export default SignUp_Page;