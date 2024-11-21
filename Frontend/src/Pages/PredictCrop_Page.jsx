import { useState } from "react";
import axios from "axios";
import "./PredictCropPage.css";  // Import the CSS file for styling

export default function PredictCrop_Page() {
    const [userdata, setuserdata] = useState({
        n: 0,
        p: 0,
        k: 0,
        temperature: 0,
        humidity: 0,
        ph: 0,
        rainfall: 0
    });

    const [prediction, setprediction] = useState("");

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserdata((prevState) => ({
            ...prevState,
            [name]: Number(value), 
        }));
    };

    async function handleonSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("https://4h97vhr4-5000.asse.devtunnels.ms/get_crop", userdata);
            console.log(response.data);
            setprediction(response.data.prediction);
        } catch (error) {
            alert("Error While Fetching");
            console.log(error);
        }
    }

    return (
        <>
            <div className="form-container">
                <h2 className="text-4xl">Predict Crop Yield</h2>
                <form onSubmit={handleonSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="temperature">Temperature (°C):</label>
                        <select
                            id="temperature"
                            name="temperature"
                            value={userdata.temperature}
                            onChange={handleChange}
                            className="input-field"
                        >
                            {[...Array(51)].map((_, i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="humidity">Humidity (%):</label>
                        <select
                            id="humidity"
                            name="humidity"
                            value={userdata.humidity}
                            onChange={handleChange}
                            className="input-field"
                        >
                            {[...Array(101)].map((_, i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="ph">pH Level:</label>
                        <select
                            id="ph"
                            name="ph"
                            value={userdata.ph}
                            onChange={handleChange}
                            className="input-field"
                        >
                            {[...Array(15)].map((_, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="rainfall">Rainfall (mm):</label>
                        <select
                            id="rainfall"
                            name="rainfall"
                            value={userdata.rainfall}
                            onChange={handleChange}
                            className="input-field"
                        >
                            {[...Array(501)].map((_, i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="n">Nitrogen (ppm):</label>
                        <select
                            id="n"
                            name="n"
                            value={userdata.n}
                            onChange={handleChange}
                            className="input-field"
                        >
                            {[...Array(101)].map((_, i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="p">Phosphorus (ppm):</label>
                        <select
                            id="p"
                            name="p"
                            value={userdata.p}
                            onChange={handleChange}
                            className="input-field"
                        >
                            {[...Array(101)].map((_, i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="k">Potassium (ppm):</label>
                        <select
                            id="k"
                            name="k"
                            value={userdata.k}
                            onChange={handleChange}
                            className="input-field"
                        >
                            {[...Array(101)].map((_, i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="submit-btn">Predict</button>
                </form>
            </div>

            <div className="prediction-result">
                <h3>Prediction Result:</h3>
                {prediction && <p>{prediction}</p>}
            </div>
        </>
    );
}
