// import axios for HTTP-requests
const axios= require("axios");
// basis-URL for challenges API
const CHALLENGES_API = "https://g5qrhxi4ni.execute-api.eu-west-1.amazonaws.com/Prod";

// async function to create a challenge
async function createChallenge(type){
    try{
        // log that we are creating a challenge 
        console.log(`${type.toUpperCase()} CHALLENGE - Creating challenge...`);
        // send a POST-request to the API to create new challenge
        const response = await axios.post(`${CHALLENGES_API}/${type}`);
        // log the created challenge with its ID
        console.log(`${type.toUpperCase()} CHALLENGE - Challenge created : ${response.data.challengeId}`);
        // return the data that we have created
        return response.data;
    } catch(err){
        // log an error message if it could not create a challenge
        console.error(`${type.toUpperCase()} CHALLENGE - Can't create challenge` + err.message);
    }
}

// async function to delete a challenge
async function deleteChallenge(payload, challengeID, type){
    try {
        // log that we are deleting a challenge
        console.log(`${type.toUpperCase()} CHALLENGE - Deleting challenge: ${challengeID}`);
        // send a DELETE-request to the API to delete the challenge
        axios.delete(`${CHALLENGES_API}/${type}/${challengeID}`, { data : payload });
        // log that the challenge is deleted
        console.log(`${type.toUpperCase()} CHALLENGE - ${challengeID} deleted!`);
    } catch (error) {
        // log an error message if it could not delete the challenge
        console.error(`${type.toUpperCase()} CHALLENGE - Not able to delete challenge` + err.message);
    }
}

// export the function to create and delete the challenges
module.exports = { createChallenge, deleteChallenge };