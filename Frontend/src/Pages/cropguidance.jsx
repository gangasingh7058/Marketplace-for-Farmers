import { useState } from "react";
import axios from "axios";

export default function CropGuidancePage() {
    const [soilDetails, setSoilDetails] = useState({
        n: 0,
        p: 0,
        k: 0,
        crop: "rice",
    });

    const [recommendation, setRecommendation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showform, setShowForm] = useState(true); // Control visibility of form

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSoilDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    async function handleonSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        

        try {
            const response = await axios.post(
                "https://4h97vhr4-5000.asse.devtunnels.ms/get_fertilizer",
                soilDetails
            );
            console.log("API Response: ", response.data);

            // Clean the HTML tags like </b>, <br/> etc., and split the text by \n for individual recommendations
            const cleanedRecommendation = response.data.result
                .replace(/<\/?[^>]+(>|$)/g, "") // Remove any HTML tags
                .replace(/\n/g, "<br/>"); // Ensure line breaks for better formatting

            if (cleanedRecommendation) {
                setShowForm(false);
                setRecommendation(cleanedRecommendation);
            } else {
                setError("No recommendation available.");
            }
        } catch (error) {
            setError("Some error occurred while fetching data.");
            console.error("Error: ", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            
            <div className="main">
                <div className="form-container">
                    <h2 className="text-3xl font-semibold mb-4">Enter Soil Details</h2>

                    {showform && (
                        <form onSubmit={handleonSubmit} className="form">
                            <div className="form-group">
                                <label htmlFor="n">Enter Nitrogen Content </label>
                                <select
                                    name="n"
                                    id="n"
                                    value={soilDetails.n}
                                    onChange={handleChange}
                                >
                                    {[...Array(51)].map((_, i) => (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="p">Enter Phosphorus Content </label>
                                <select
                                    name="p"
                                    id="p"
                                    value={soilDetails.p}
                                    onChange={handleChange}
                                >
                                    {[...Array(101)].map((_, i) => (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="k">Enter Potassium Content </label>
                                <select
                                    name="k"
                                    id="k"
                                    value={soilDetails.k}
                                    onChange={handleChange}
                                >
                                    {[...Array(501)].map((_, i) => (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="crop">Select Crop</label>
                                <select
                                    name="crop"
                                    id="crop"
                                    value={soilDetails.crop}
                                    onChange={handleChange}
                                >
                                    <option value="rice">Rice</option>
                                    <option value="maize">Maize</option>
                                    <option value="chickpea">Chickpea</option>
                                    <option value="kidneybeans">Kidney Beans</option>
                                    <option value="pigeonpeas">Pigeon Peas</option>
                                    <option value="mothbeans">Moth Beans</option>
                                    <option value="mungbean">Mung Bean</option>
                                    <option value="blackgram">Black Gram</option>
                                    <option value="lentil">Lentil</option>
                                    <option value="pomegranate">Pomegranate</option>
                                    <option value="banana">Banana</option>
                                    <option value="mango">Mango</option>
                                    <option value="grapes">Grapes</option>
                                    <option value="watermelon">Watermelon</option>
                                    <option value="muskmelon">Muskmelon</option>
                                    <option value="apple">Apple</option>
                                    <option value="orange">Orange</option>
                                    <option value="papaya">Papaya</option>
                                    <option value="coconut">Coconut</option>
                                    <option value="cotton">Cotton</option>
                                    <option value="jute">Jute</option>
                                    <option value="coffee">Coffee</option>
                                </select>
                            </div>

                            <button type="submit" className="submit-btn">
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </form>
                    )}
                </div>

                <div className="data">
                    <h3>Soil Details</h3>
                    <p>Nitrogen: {soilDetails.n}</p>
                    <p>Phosphorus: {soilDetails.p}</p>
                    <p>Potassium: {soilDetails.k}</p>
                    <p>Crop: {soilDetails.crop}</p>

                    <h4>Recommendation:</h4>
                    {error && <p>{error}</p>}
                    {recommendation && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: recommendation,
                            }}
                        />
                    )}
                </div>
            </div>

            <style jsx>{`
                .top-bar {
                    background-color: #2c3e50;
                    color: white;
                    padding: 20px;
                    text-align: center;
                }

                .main {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                }

                .form-container {
                    background-color: #ecf0f1;
                    padding: 20px;
                    border-radius: 8px;
                    width: 100%;
                    max-width: 600px;
                }

                .form h2 {
                    text-align: center;
                    color: #34495e;
                }

                .form-group {
                    margin-bottom: 15px;
                }

                .form-group label {
                    display: block;
                    font-size: 14px;
                    margin-bottom: 5px;
                    color: #2c3e50;
                }

                .form-group select {
                    width: 100%;
                    padding: 8px;
                    font-size: 14px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    background-color: white;
                }

                .submit-btn {
                    background-color: #2980b9;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    width: 100%;
                    font-size: 16px;
                }

                .submit-btn:hover {
                    background-color: #3498db;
                }

                .data {
                    margin-top: 20px;
                    padding: 10px;
                    background-color: #f4f4f4;
                    border-radius: 8px;
                    width: 100%;
                    max-width: 600px;
                }

                .data h3 {
                    color: #34495e;
                }

                .data p {
                    font-size: 14px;
                    color: #2c3e50;
                }

                .data ul {
                    list-style-type: disc;
                    margin-left: 20px;
                }

                .data li {
                    font-size: 14px;
                    color: #2c3e50;
                }
            `}</style>
        </>
    );
}
