import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/user.model.js';


async function authenticate(req, res){
  try { 
    const {email, password} = req.body;
    let user = await User.findOne({email});
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
             res.status(401).json({message:'Invalid Credentials'})
             return;
        } else {
             const payload = {
               user: {
                 id: user.id,
               },
             };
             jwt.sign(payload, config.get('jwt_secret'), { expiresIn: 3600 }, (err, token) => {
               if (err) throw err;
               res.status(200).json({token});
             });
        }
    } else {
        res.status(401).json({message:'Invalid Credentials'})
          
          return;
    }
  } catch (err) {
    res.status(400)

  }
};


export {
    authenticate
};