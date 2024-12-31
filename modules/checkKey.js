/**
 * 
 *  Local function to check the validity of the given key
 * 
 *  @param {string} userKey
 *  @param {string} apiKey
 *  @param {string} projectId
 * 
 *  @returns {Promise<string>}
 * 
 */

// Dependencies

const Axios = require("axios");

// Functions

async function checkKey(userKey, apiKey, projectId) {
    const URL = `https://api.luarmor.net/v3/projects/${projectId}/users?user_key=${userKey}`;

    try {
        const Result = await Axios.get(URL, {
            headers: {
                "Authorization": apiKey,
                "Content-Type": "application/json"
            }
        });

        if (Result.status === 200) {
            const Data = Result.data;

            if (Data.success) {
                const Users = Data.users || [];

                if (Users.length === 0) {
                    return "Invalid Key.";
                } else {
                    const userInfo = Users[0];
                    const Expiration = userInfo.auth_expire || -1;

                    if (Expiration === -1) {
                        return "Key is valid and permanent";
                    } else {
                        const currentTime = Math.floor(Date.now() / 1000);

                        if (Expiration > currentTime) {
                            const Remaining = Expiration - currentTime;
                            const Hours = Math.floor(Remaining / 3600);
                            const Minutes = Math.floor((Remaining % 3600) / 60);

                            return `Key is valid and expires in ${Hours}h ${Minutes}m`;
                        } else {
                            return "Key has expired";
                        }
                    }
                }
            } else {
                return `Error: ${Data.message || 'Unknown error'}`;
            }
        } else {
            return `Error: Unable to check key. Status Code: ${Result.status}`;
        }
    } catch (Error) {
        console.error(Error);

        return "Internal Server Issue";
    }
}

exports.checkKey = checkKey;