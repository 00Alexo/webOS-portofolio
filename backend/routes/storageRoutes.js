const express = require('express');
const{
    setUserVolume,
    setUserBrightness
} = require('../controllers/storageController');

const router = express.Router();

router.post('/setUserVolume', setUserVolume);
router.post('/setUserBrightness', setUserBrightness);

module.exports= router;