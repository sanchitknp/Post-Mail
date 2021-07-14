import jwt from 'jsonwebtoken';
import {User} from './models/Usermodels.js';

const AuthController = {
  async googleOauth(req, res) {
    if (!req.user) {
      return res.status(400).send('Authentication failed!');
    }
    const { email } = req.user;
    const user = await User.findOne({ where: { email } });
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET);
    return res.status(200).send({ token, user });
  }
};
export default AuthController;