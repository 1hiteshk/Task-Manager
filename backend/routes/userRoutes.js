const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userControllers');
const validateToken = require('../middlewares/validateTokenHandler');
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/current', validateToken,currentUser);
// we have used the token to make a route private , whenever someone is requesting current user info. we need to 
// goto db. in mongodb & then we need to fetch the info. & provide it as a response 

module.exports = router;
