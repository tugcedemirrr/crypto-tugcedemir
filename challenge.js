const axios= require("axios");
const CHALLENGES_API = "https://g5qrhxi4ni.execute-api.eu-west-1.amazonaws.com/Prod";

async function createChallenge(type){
    try{
        // try createing a challenge
        console.log(`${type.toUpperCase()} CHALLENGE - Creating challenge...`);
        const response = await axios.post(`${CHALLENGES_API}/${type}`);
        console.log(`${type.toUpperCase()} CHALLENGE - Challenge created : ${response.data.challengeId}`);
        return response.data;
    } catch(err){
        console.error(`${type.toUpperCase()} CHALLENGE - Can't create challenge` + err.message);
    }
}

async function deleteChallenge(payload, challengeID, type){
    try {
        console.log(`${type.toUpperCase()} CHALLENGE - Deleting challenge: ${challengeID}`);
        axios.delete(`${CHALLENGES_API}/${type}/${challengeID}`, { data : payload });
        console.log(`${type.toUpperCase()} CHALLENGE - ${challengeID} deleted!`);
    } catch (error) {
        console.error(`${type.toUpperCase()} CHALLENGE - Not able to delete challenge` + err.message);
    }
}

module.exports = { createChallenge, deleteChallenge };