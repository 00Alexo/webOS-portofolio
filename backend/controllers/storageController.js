const userModel = require('../models/userModel');

const setUserVolume = async (req, res) =>{
    try{
        const { username, volume } = req.body;

        if (!username || volume === undefined) {
            return res.status(400).json({ error: 'Username and volume are required.' });
        }

        const user = await userModel.findOneAndUpdate(
            {username: username.toLowerCase()}, 
            {$set: { volume },}, 
            { new: true}
        );

        if(!user){
            return res.status(400).json({ error: 'User not found.' });
        }

        return res.status(200).json(user.volume);
    }catch(err){
        console.error(err.message);
        return res.status(400).json(err.message);
    }
}

const setUserBrightness = async (req, res) =>{
    try{
        const { username, brightness } = req.body;

        if (!username || brightness === undefined) {
            return res.status(400).json({ error: 'Username and brightness are required.' });
        }

        const user = await userModel.findOneAndUpdate(
            {username: username.toLowerCase()}, 
            {$set: { brightness },}, 
            { new: true}
        );

        if(!user){
            return res.status(400).json({ error: 'User not found.' });
        }

        return res.status(200).json(user.brightness);
    }catch(err){
        console.error(err.message);
        return res.status(400).json(err.message);
    }
}

const getUserVolume = async (req, res) =>{
    try{
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ error: 'Username is required.' });
        }

        const user = await userModel.findOne({username: username.toLowerCase()});

        if(!user){
            return res.status(400).json({ error: 'User not found.' });
        }

        return res.status(200).json(user.volume);
    }catch(err){
        console.error(err.message);
        return res.status(400).json(err.message);
    }
}

const getUserBrightness = async (req, res) =>{
    try{
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ error: 'Username is required.' });
        }

        const user = await userModel.findOne({username: username.toLowerCase()});

        if(!user){
            return res.status(400).json({ error: 'User not found.' });
        }

        return res.status(200).json(user.brightness);
    }catch(err){
        console.error(err.message);
        return res.status(400).json(err.message);
    }
}

module.exports = {
    setUserVolume,
    getUserVolume,
    getUserBrightness,
    setUserBrightness
}