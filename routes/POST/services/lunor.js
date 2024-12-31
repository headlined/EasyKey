/**
 * 
 *  Official Key System Backend for Lunor
 * 
 *  -> Service provided by:   `EasyKey`
 *  -> Project using EasyKey: `Lunor`
 * 
 *  API last updated 12 - 31 - 2024
 * 
 */

// Dependencies

const Express = require("express");
const { checkKey } = require("../../../modules/checkKey");

// Variables

const Router = Express.Router();

const API_KEY    = "3000e5d166ad2a7eba9288a59e8528f0c6d1669b3653e158a634";
const PROJECT_ID = "317de064314bfad4b987464e87fc5c4a";

// Endpoints

Router.post("/whitelist", async (Request, Response) => {
    const { USER_KEY } = Request.query;

    if (!USER_KEY) {
        return Response.status(400).json({
            message: "Missing *required parameter(s)."
        });
    }

    try {
        const Message = await checkKey(USER_KEY, API_KEY, PROJECT_ID);

        Response.send(Message);
    } catch (Error) {
        console.error(Error);

        Response.status(500).json({
            message: "Internal Server Issue."
        });
    }
});

module.exports = Router;