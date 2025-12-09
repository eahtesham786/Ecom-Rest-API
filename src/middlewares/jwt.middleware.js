import jwt from "jsonwebtoken";
const jwtAuth = (req, res, next) => {
  //Read the token from Authorization header
  console.log("Authorization Header:", req.headers["authorization"]);
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized: No token provided" });
  }
  //check if the token is valid
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Payload:", payload);
    req.userId = payload.id;
    console.log("User ID from token:", req.userId);
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
  //if valid, proceed to next middleware/controller
  next();
};
export default jwtAuth;
