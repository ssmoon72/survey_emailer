//middleware to ensure the user has enough credits to send out surveys
module.exports = (req, res, next) => {
  if(req.user.credits < 1) {
    return res.status(403).send({error: "Not enough credits"})
  }

  next();
};
