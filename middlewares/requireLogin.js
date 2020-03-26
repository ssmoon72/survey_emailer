//next is a function we call when middleware is finished running, passes request off to next middleware
module.exports = (req, res, next) => {
  if(!req.user) {
    //401 status forbidden, send error message, terminate request
    return res.status(401).send({ error: 'You must log in' })
  }

  next();
};
