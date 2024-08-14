import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import sendToken from "../utils/sendToken.js";

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    console.log("hm hi hai user");
    console.log(user);
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User does not exist! Please register",
      });
    }

    // Validate password
    console.log("ye kya ho gya hai");
    console.log(typeof password);
    console.log(typeof user.password);
    const isValid = await bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(400).json({
        status: "Error",
        message: "Password does not match",
      });
    }

    // Generate JWT token
    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    sendToken(user, 200, token, res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error"); // Handle server error
  }
};


const createUser = async(req, res) => {

    const {email,password,name} = req.body;
    //delete this line
    console.log(name + '/n' + password + '/n' + name);
     if (!email || !password || !name) {
       res.status(400).json({
         status: "Error",
         message: "Email or Password not provided",
       });
     }

     try{
        let user = await User.findOne({email});
        if(user){
             return res.status(400).json({
                status: "Error",
                message: "User already exists! Please login",
            });
        }
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password,salt);
        user = await User.create({ email, password: hashPassword, name });
        // Generate JWT token
        const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        sendToken(user, 200, token, res);
     }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
     } 
};
const getUser = async (req, res) => {
  try {
    const user = req.body.user;
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
export default{createUser,getUser,login};
