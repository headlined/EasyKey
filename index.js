/**
 * 
 *  EasyKey Key System Secured API
 * 
 *  Last Updated: 12 - 31 - 2024
 * 
 */

// Dependencies

const Express = require("express");

// Variables

const APP  = Express();
const PORT = 3000;

// Routes

const StatusRoute = require("./routes/GET/status");
const LunorNode   = require("./routes/POST/services/lunor");

// Endpoints

APP.use("/POST/services/Lunor", LunorNode);
APP.use("/GET/status", StatusRoute);

APP.listen(PORT, () => {
    console.log(`Server is returning @ :${PORT}`);
});