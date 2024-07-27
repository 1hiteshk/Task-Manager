// validate the token which a client is sending in our request as a bearer token , we have to validate this token we
// to verify that token is a correct token and it is associated with a correct user
// whenever a user is sending a request the token is actually passed in the header section
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req?.headers?.Authorization || req?.headers?.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Token is not valid user is not authorized");
      }
      req.user = decoded.user; // this will be the info of our current user
      next();
      console.log(decoded);
    });

    if (!token) {
      res.status(401);
      throw new Error("No token provided");
    }
  }
});

module.exports = validateToken;
