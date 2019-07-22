import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.config();
const secret = process.env.SECRET;
const Auth = {

  /** * Get token
   * @param {Object} user user’s object
   * @returns {Boolean} true or false
   */
  getToken(user) { // research on jwt tokens
    const userToken = jwt.sign({
      userId: user.id,
      roleId: user.roleId,
    },
      secret, { expiresIn: '7d' },
    );
    return userToken;
  },
  /**
   * verifyToken - Verifies Token sent from the consumer
   * @param {object} req  request Object
   * @param {object} res  response Object
   * @param {callback} next callback to the next middleware or function
   * @returns {Object | void} token validity response | void
   */
  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized Access' });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.decoded = decoded;
      next();
    });
  },

  /**
   * verifyAdmin - Verifies if user is an Admin
   * @param {object} req request Object
   * @param {object} res response Object
   * @param {callback} next callback to the next middleware or function
   * @returns {void}
   */
  verifyAdmin(req, res, next) {
    db.Roles.findById(req.decoded.roleId)
       .then((role) => {
         if (role.title === 'admin') {
           next();
         } else {
           return res.status(403)
           .send({ message: 'You dont have access to delete user' });
         }
       });
  },

};

export default Auth;
