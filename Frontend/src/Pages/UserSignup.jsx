import { useState } from "react";
import indianStates from "../Helping Componjents/indianstates";
import { useRecoilValue } from "recoil";
import { languageatom } from "../atoms/languageatom";

function User_SignUp_Page() {
  const [userinputs, setuserinputs] = useState({
    fname: "",
    lname: "",
    password: "",
    phone: "",
    state: "",
    pincode: "",
  });

  const language = useRecoilValue(languageatom);

  function handleonchange(e) {
    const { name, value } = e.target;
    setuserinputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handlesubmit(e) {
    e.preventDefault();
    alert(language ? "Account Created Successfully" : "खाता सफलतापूर्वक बनाया गया");
  }

  return (
    <div className="w-screen h-[calc(100vh-70px)] bg-[url('/images1.jpeg')] bg-cover bg-no-repeat bg-center flex justify-center items-center">
      <div className="bg-white bg-opacity-60 w-2/5 sm:w-2/6 p-4 rounded-xl shadow-2xl">
        <div className="topbar">
          <div className="flex justify-center">
            <p className="font-bold text-4xl text-[#00b4d8]">
              {language ? "Sign Up" : "साइन अप करें"}
            </p>
          </div>
          <div className="text-center mt-2 text-zinc-700 text-sm">
            <p className="text-[#00b4d8]">
              {language
                ? "Enter Your Information to Create an Account"
                : "खाता बनाने के लिए अपनी जानकारी दर्ज करें"}
            </p>
          </div>
        </div>

        <form onSubmit={handlesubmit}>
          <label
            htmlFor="fname"
            className="font-bold text-lg text-[#00b4d8]"
          >
            {language ? "First Name" : "पहला नाम"}
          </label>
          <input
            type="text"
            id="fname"
            placeholder={language ? "Enter Your First Name" : "अपना पहला नाम"}
            name="fname"
            value={userinputs.fname}
            onChange={handleonchange}
            className="border-2 px-3 py-1 border-[#00b4d8] w-full rounded-lg my-2 focus:border-[#0077b6]"
          />

          <label
            htmlFor="lname"
            className="font-bold text-lg text-[#00b4d8]"
          >
            {language ? "Last Name" : "अंतिम नाम"}
          </label>
          <input
            type="text"
            id="lname"
            placeholder={language ? "Enter Your Last Name" : "अपना अंतिम नाम"}
            name="lname"
            value={userinputs.lname}
            onChange={handleonchange}
            className="border-2 px-3 py-1 border-[#00b4d8] w-full rounded-lg my-2"
          />

          <label htmlFor="phone" className="font-bold text-lg text-[#00b4d8]">
            {language ? "Phone Number" : "फोन नंबर"}
          </label>
          <input
            type="text"
            id="phone"
            placeholder={language ? "Enter Your Phone Number" : "आपका फोन नंबर"}
            name="phone"
            value={userinputs.phone}
            onChange={handleonchange}
            className="border-2 px-3 py-1 border-[#00b4d8] w-full rounded-lg my-2"
          />

          <label
            htmlFor="password"
            className="font-bold text-lg text-[#00b4d8]"
          >
            {language ? "Password" : "पासवर्ड"}
          </label>
          <input
            type="password"
            id="password"
            placeholder={language ? "Enter Your Password" : "अपना पासवर्ड दर्ज करें"}
            name="password"
            value={userinputs.password}
            onChange={handleonchange}
            className="border-2 px-3 py-1 border-[#00b4d8] w-full rounded-lg my-2"
          />

          <label htmlFor="state" className="font-bold text-lg text-[#00b4d8]">
            {language ? "State" : "राज्य"}
          </label>
          <select
            id="state"
            name="state"
            value={userinputs.state}
            onChange={handleonchange}
            className="border-2 px-3 py-1 border-[#00b4d8] w-full rounded-lg my-2"
          >
            <option value="">{language ? "Select Your State" : "अपना राज्य चुनें"}</option>
            {indianStates.map((state) => (
              <option value={state} key={state}>
                {state}
              </option>
            ))}
          </select>

          <label htmlFor="pincode" className="font-bold text-lg text-[#00b4d8]">
            {language ? "Pincode" : "पिन कोड"}
          </label>
          <input
            type="text"
            id="pincode"
            placeholder={language ? "Enter Your Area Pincode" : "अपने क्षेत्र का पिन कोड"}
            name="pincode"
            value={userinputs.pincode}
            onChange={handleonchange}
            className="border-2 px-3 py-1 border-[#00b4d8] w-full rounded-lg my-2"
          />

          <div className="flex justify-center my-2">
            <button
              type="submit"
              className="w-full text-white bg-[#00b4d8] hover:bg-[#0077b6] py-2 rounded-lg"
            >
              {language ? "Sign Up" : "साइन अप करें"}
            </button>
          </div>

          <div className="flex justify-center gap-2 font-semibold pt-1 text-green-700">
            {language ? "Already have an account?" : "पहले से ही खाता है?"}{" "}
            <a href="http://localhost:5174/user">
              <u>{language ? "Login" : "लॉग इन करें"}</u>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default User_SignUp_Page;
