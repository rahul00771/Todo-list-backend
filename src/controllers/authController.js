
//file which contains the user registration logic(basically the (req, res) function)

import users from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {jwtSecret} from '../config/keys.js'


  const register = async(req, res) => {

      
      //check if there is already a user that exists with the email
      try{
        //get the email and pass form the request body
        const {userMail, userPass} = req.body;
        const existingUser = await users.findOne({userMail});

        //if user found then  400 res code
        if(existingUser){
            return res.status(400).json({message: 'Account already exists.'})            
        }

        //hashing the password using bcrypt with 10 as salt
        const hashedPass = await bcrypt.hash(userPass, 10);

        //create a new entry(user) using the email provided and hashed password
        const newUser = new users({
            userMail,
            userPass: hashedPass
        })

        //saving the entry to the collection users
        await newUser.save();

        //generating th jwt for the user
        const token = jwt.sign({userId: newUser._id}, jwtSecret.jwtSecretKey);

        //sending the token to the client
        res.json(token);

    }
    catch(error){
        res.status(500).json({message: "Server error"});
    }

}

export default register;
