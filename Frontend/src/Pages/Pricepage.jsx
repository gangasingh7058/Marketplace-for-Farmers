import { useEffect, useState } from "react"
import getprices from "../Functions/getprice";
import commoditylist from "../Helping Componjents/commoditylist";
import { languageatom } from "../atoms/languageatom";
import { useRecoilValue } from "recoil";

export default function PricePage(){

    const language=useRecoilValue(languageatom);

    const[date,setdate]=useState({
        day:"",
        date:"",
        month:"",
        year:""
    });

    const[commodity,setcommodity]=useState({
        commodity:""
    })

    const [pricelist,setpricelist]=useState([]);

    useEffect(()=>{
        const currentdate=new Date();
        const datestring=currentdate.toString();
        const currentdate2=datestring.split(" ");
        // console.log(typeof(currentdate));
        setdate({
            day:currentdate2[0],
            month:currentdate2[1],
            date:currentdate2[2],
            year:currentdate2[3]
        })
        },[])

        useEffect(()=>{
            console.log(pricelist);
            
        },[pricelist])

       
          function handlecommoditychange(e){
            const {value}=e.target;

            setcommodity({commodity:value})
          }
        

          function handleonsubmit(e){
            e.preventDefault();

            // alert("submitted")

            async function fetchprices(){
                console.log(commodity.commodity);
                
                const prices=await getprices(commodity.commodity);
                
                setpricelist(prices);
                // console.log("Prices are -> ", pricelist);
                
            }
            fetchprices();
          }
    

    return <div className=" mt-9">
        <div className="flex justify-center text-4xl md:text-5xl bg-green-500 py-3 rounded-full font-semibold">{language?"Mandi Price":"मंडी मूल्य"} {date.day} , {date.date} {date.month} {date.year}</div>
        <div className="ml-5 mt-2  gap-5 items-center">
            <div className=" justify-center align-middle">
                <div>
                <form onSubmit={handleonsubmit} className="">
                    <select 
                    name="commodity" 
                    id="commodity"
                    value={commodity.commodity}
                    onChange={handlecommoditychange}
                    className="border-2 border-black w-[150px] h-[40px]"
                    >
                        {commoditylist.map((commodity)=>{
                            return <option value={commodity} key={commodity}>{commodity}</option>
                        })}
                    </select>

                    <button className="bg-green-600 border-2 border-black px-4 py-2 rounded-2xl mx-3" type="submit">
                        {language?"Find":"खोजना"}</button>
                </form>
                </div>
                <div>

                </div>
            </div>
            <div className="">
                    {pricelist.length > 0 ? (
                        <table className="min-w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="px-4 py-2 border">{language?"Commodity":"फसल"}</th>
                                    <th className="px-4 py-2 border">{language?"State":"राज्य"}</th>
                                    <th className="px-4 py-2 border">{language?"Market":"बाज़ार"}</th>
                                    <th className="px-4 py-2 border">{language?"Modal Price":"औसत मूल्य"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pricelist.map((e, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2 border">{e.commodity}</td>
                                        <td className="px-4 py-2 border">{e.state}</td>
                                        <td className="px-4 py-2 border">{e.market}</td>
                                        <td className="px-4 py-2 border">{e.modal_price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                                ) : (
                                    <div>{language?"Select a Commodity":"एक फसल चुनें"}</div>
                                )}
                </div>
        </div>
    </div>
}

