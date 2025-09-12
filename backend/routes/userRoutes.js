const express = require('express');
const{
    signup,
    signin,
    getUser,
    updateUserSettings
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/user/:username', getUser);
router.patch('/user/:username/settings', updateUserSettings);

module.exports= router;