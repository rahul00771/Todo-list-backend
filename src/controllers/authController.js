
//file which contains the user registration logic(basically the (req, res) function)

import users from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {jwtSecret} from '../config/keys.js'
import { json } from "stream/consumers";


  //controller for the register api
export  const register = async(req, res) => {
      
      //check if there is already a user that exists with the email
      try{        

        //get the email and pass form the request body
        const {userMail, userPass} = req.body;
        const existingUser = await users.findOne({userMail});

        //500error check(1nov)
        // console.log("Entering the register Function", userMail, userPass);


        //if user found then  400 res code
        if(existingUser){

            console.log("Account already exists")
            return res.json(null);

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
        return res.json(token);



        //1nov check for 500 error
        // console.log("Exiting the register function")

    }
    catch(error){
        res.status(500).json({message: "Server error"});
    }
    
    
}

//controller for the login api
export const login = async(req, res) => {
    
    //retrieving the userMail ans userPass from the request
    
    try{
        
        const {userMail, userPass} = req.body;
        //check if user is present or not
        const user = await users.findOne({userMail});

        if(!user)
        {
            console.log("No user found")
            // return res.status(401).json({message: 'User not found'});
            return res.json(null);
        }

        //if user present then comparing the provided pass with hashed stored pass
        const passwordMatch = await bcrypt.compare(userPass, user.userPass);
        if (!passwordMatch) {
            // return res.status(401).json({ message: 'Authentication failed' });
            return res.json({"message": "authFailed"});
        }

        //if password is matched generate a jwt token
        const token = jwt.sign({userId: user._id}, jwtSecret.jwtSecretKey);

        //sending the token to the client
        res.status(200).json({token, userMail});

    }
    catch(error){
        res.status(500).json({message: "Server error"});
    }

}


