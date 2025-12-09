import fs from "fs";
import winston from "winston";
const fsPromise = fs.promises;
// async function log(logData) {
//   try {
//     logData = "\n" + new Date().toISOString() + " - " + logData + "\n";
//     await fsPromise.appendFile("logs.txt", logData);
//   } catch (err) {
//     console.log("Error logging data", err);
//   }
// }

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});

const loggerMiddleware = async (req, res, next) => {
  //log the request body
  if (!req.url.includes("signin") && !req.url.includes("signup")) {
    const logData = `Request URL: ${req.url}, Method: ${
      req.method
    }-${JSON.stringify(req.body)}`;
    // await log(logData);
    console.log(logData);
    logger.info(logData);
  }
  next();
};
export default loggerMiddleware;
