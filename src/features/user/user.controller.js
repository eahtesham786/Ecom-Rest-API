import UserModel from "./user.model.js";
export default class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const newUser = UserModel.signUp(name, email, password, type);
    res.status(201).send(newUser);
  }
  signIn(req, res) {
    const { email, password } = req.body;
    const user = UserModel.signIn(email, password);
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    } else {
      return res.status(200).send(user);
    }
  }
}
