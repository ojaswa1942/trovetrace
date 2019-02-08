const jwt = require('jsonwebtoken');
const secret = 'iAmVeryBadAtThis';

const timeCheck = (req, res, next) => {

  const now = new Date();
  var startTime = new Date('09/02/2019 01:00:00 AM');
  var endTime = new Date('09/02/2019 03:00:00 AM');
  if(now<startTime || now>endTime){
    res.status(301).json('Now is not the time');
    next();
  }
  else
    next();
}

module.exports = timeCheck;