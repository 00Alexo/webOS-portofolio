const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
var schema = new passwordValidator();
schema
.is().min(8)
.has().uppercase()
.has().lowercase()
.has().digits(1)

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '2h'})
}

const signup = async(req, res) =>{
    try{
        const {username, password, confirmPassword} = req.body;
        const saltRounds = 12; let errorFields = [];

        if (!password) errorFields.push({field: "pass", error: "This field is required!"});
        if (!confirmPassword) errorFields.push({field: "cpass", error: "This field is required!"});
        if (!username) errorFields.push({field: "username", error: "This field is required!"});

        if (errorFields.length > 0) 
            return res.status(400).json({error: 'All fields are required!', errorFields: errorFields});
        

        const existingUser = await userModel.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
        if(existingUser){
            errorFields.push({field: "username", error: "Username is already in use!"});
            return res.status(400).json({error:'Username is already in use!', errorFields: errorFields})
        }

        if(!schema.validate(password)){
            errorFields.push({field: "pass", error: "Password must be at least 8 characters long, contain an uppercase letter and a number!"});
            errorFields.push({field: "cpass", error: ""});
            return res.status(400).json({error: 'Password must be at least 8 characters long, contain an uppercase letter and a number!', errorFields: errorFields})
        }

        if(password !== confirmPassword){
            errorFields.push({field: "pass", error: "Passwords do not match!"});
            errorFields.push({field: "cpass", error: ""});
            return res.status(400).json({error:"Passwords do not match!", errorFields: errorFields});
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const data = {
            username: username.toLowerCase(),
            password: hashedPassword,
            volume: 100,
            brightness: 100,
            bgImage: '',
            starterImage: ''
        }

        const user = await userModel.create(data);
        const token = createToken(user._id);

        res.status(200).json({username:data.username, token});
    }catch(error){
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const signin = async(req, res)=>{
    try{
        const {username, password} = req.body;
        let errorFields = [];

        if (!username) errorFields.push({field: "username", error: "This field is required!"});
        if (!password) errorFields.push({field: "pass", error: "This field is required!"});
        if (errorFields.length > 0) {
            return res.status(400).json({error: 'All fields are required!', errorFields: errorFields});
        }

        user = await userModel.findOne({username: username.toLowerCase()});

        if(user){
            const passMatch = await bcrypt.compare(password, user.password);

            if(passMatch){
                const token = createToken(user._id)

                res.status(200).json({username:user.username, token});
            }
            else{
                errorFields.push({field: "pass", error: "Incorrect password!"});
                return res.status(400).json({error: 'Incorrect password!', errorFields});
            }
        }
        else
            return res.status(400).json({error: 'Account does not exist!', errorFields: [{field:"username", error:"This account does not exist!"}]} );
    }catch(error){
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const getUser = async (req, res) => {
    try{
        const { username } = req.params;

        const user = await userModel.findOne({ username: username.toLowerCase() }).select('-password -_id -__v');

       if(!user){
           return res.status(400).json({ error: 'User not found.' });
       }

       return res.status(200).json(user);
    }catch(err){
        console.error(err.message);
        return res.status(400).json(err.message);
    }
}

const updateUserSettings = async (req, res) => {
    try {
        const { username } = req.params;
        const { volume, brightness } = req.body;

        const user = await userModel.findOne({ username: username.toLowerCase() });

        if (!user) {
            return res.status(400).json({ error: 'User not found.' });
        }

        if (volume !== undefined) user.volume = volume;
        if (brightness !== undefined) user.brightness = brightness;

        await user.save();

        return res.status(200).json({
            volume: user.volume,
            brightness: user.brightness
        });

    } catch (err) {
        console.error(err.message);
        return res.status(400).json(err.message);
    }
}

module.exports = {
    signup,
    signin,
    getUser,
    updateUserSettings
}