const pool = require('./config');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

const USERS = require('./User');


const lognin = (req, res) => {
    const returnMessage = {
        isError: true,
        data: null,
        message: "Error occured",
  };
  

  const saltRounds = 10;
  const myPlaintextPassword = '$2b$10$nbCUS4VYBYS0D3v3lxOpQ.hOZ5YBxH/.RTEoUeIn6UGlSw3tShY2u';

  //  bcrypt.genSalt(saltRounds,(err, salt) => {
  //    if (err) throw err;
  //   bcrypt.hash(password, salt,(err, hash) => {
  //     if (err) throw err;
  //         // Store hash in your password DB.
  //       console.log(hash);
  //     bcrypt.compare(password, hash,(err, result)=> {
  //       if (err) throw err;
  //       obj.pwd = result;
  //       console.log( obj);
  //       return obj;
       
  //     });
  //     });
  //  });

    if (validateUser(req.body) ) {
        let token = jwt.sign({ data: req.body }, "secret", { expiresIn: "7d" });
        returnMessage.isError = false;
        returnMessage.message = `Successfully Login ${req.body.email}`;
      returnMessage.data = { token };
      // res.cookie('JWT', token);
        res.status(200).json(returnMessage);
        res.end();
    } else {
        returnMessage.isError = true;
        returnMessage.message = "Invalid username / password.";
        res.status(400).json(returnMessage);
  }
  
  
 
}

function validateUser(user) {
  for (let index in USERS) {
    if (
      user.email == USERS[index].email && user.password == USERS[index].password
        ) {
          console.log("user Found data");
          return true;
        } else {
          null;
        }
      }
    
}

const logout = async (req,res) => {
  const returnMessage = {
    isError: true,
    data: null,
    message: "Error occured",
  };
  res.send("Successfully Logout!");
  
}

module.exports = {
  lognin,
  logout
}