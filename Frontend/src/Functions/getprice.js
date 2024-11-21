import axios from "axios";

async function getprices(commodityprop) {
  const apiKey = '579b464db66ec23bdd000001e7b7e3cb3076489247e29501e69f8cf3';
  const resourceID = '9ef84268-d588-465a-a308-a864a43d0070';
//   const state = stateprop; // Specify the state
  const commodity=commodityprop;

  const url = `https://api.data.gov.in/resource/${resourceID}`;

  try {
    const params = {
      'api-key': apiKey,
      format: 'json',
      limit: 20,
      offset: 0,
    };

    // Conditionally add the state filter if it's not an empty string
    // if (state) {
    //   params['filters[state]'] = state;
    // }
    if(commodity){
        params['filters[commodity]']=commodity
    }

    const response = await axios.get(url, { params });
    return response.data.records; // Return the data
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return []; // Return an empty array or handle the error accordingly
  }
}

export default getprices;
