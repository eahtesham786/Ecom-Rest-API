import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  //check if authorization header is present or not
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send({ message: "Authorization header is missing" });
  }
  console.log(authHeader);
  //Extract base64 encoded credentials from header
  const base64Credentials = authHeader.replace("Basic ", "");
  console.log(base64Credentials);
  //decode the base64 string to get username and password
  const decodedCredentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  console.log(decodedCredentials);
  const [username, password] = decodedCredentials.split(":");
  console.log(username);
  console.log(password);
  const user = UserModel.getAll().find((u) => {
    return u.email === username && u.password === password;
  });
  if (user) {
    next();
  } else {
    return res
      .status(401)
      .send({ message: "Invalid Authentication Credentials" });
  }
};
export default basicAuthorizer;
