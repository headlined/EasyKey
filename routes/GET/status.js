/**
 * 
 *  Returns server status
 * 
 *  --> EX: 200 OK
 *  -->     500 Internal Server Error
 *  -->     404 Not Found
 * 
 *  ... & more
 * 
 */

// Dependencies

const Express = require("express");

// Variables

const Router = Express.Router();

// Endpoints

Router.get("/", (_, Response) => {
    Response.json({
        message: "Status is OK",
    });
});

module.exports = Router;