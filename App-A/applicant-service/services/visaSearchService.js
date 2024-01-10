const axios = require("axios");
const visaAuthServiceHostname = "visa-auth-service";
const visaAuthServicePort = "9000";

exports.searchVisa = async (
  sourceCountry,
  destinationCountry,
  purposeOfTravel
) => {
  try {
    const queryParams = new URLSearchParams({
      sourceCountry,
      destinationCountry,
      purposeOfTravel,
    }).toString();

    console.log(queryParams);
    const url = `http://${visaAuthServiceHostname}:${visaAuthServicePort}/api/visa-search?${queryParams}`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error in visa search service:", error);
    throw error;
  }
};
