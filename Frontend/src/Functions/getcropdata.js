import axios  from "axios";

async function getcropdata(){

    try {
        
        const cropdata=await axios.get("http://localhost:3000/farmer/crops",{
            headers:{
                'phone':12345
            }
        });
        console.log(cropdata.data);
        
        return cropdata.data

    } catch (error) {
        console.log("Error is -->> "+error);
        alert("error occured at getcropdata")
    }

}

export default getcropdata;