import { useSetRecoilState, useRecoilValue } from "recoil";
import { languageatom } from "../atoms/languageatom";
import { FaPhoneAlt } from "react-icons/fa";;

export default function NavBar() {
    const language = useRecoilValue(languageatom);
    const setLanguage = useSetRecoilState(languageatom);

    function handleOnClick() {
        setLanguage((prevLanguage) => !prevLanguage);
    }

    return (
        <div className="w-full h-[70px] bg-green-900 flex justify-between items-center px-5">
            <div className="text-white text-2xl">
                {language ? "WELCOME, KISAN" : "स्वागत है, किसान"}
            </div>
            <div className="flex items-center gap-5">
                <button
                    onClick={handleOnClick}
                    className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded-xl font-bold font-mono border-2 border-white"
                >
                    Change To {language ? "Hindi" : "English"}
                </button>
                <div className="flex gap-2">
                    <div className="text-white font-bold text-xl">
                        {language?"Call US":"कॉल करें"}
                    </div>
                    <FaPhoneAlt className="text-white w-[45px] h-[25px] "/>
                </div>
            </div>
        </div>
    );
}
