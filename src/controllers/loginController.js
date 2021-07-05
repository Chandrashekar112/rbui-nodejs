const pool = require('./config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const USERS = [
    { email: "surajit.mitra@ness.com", password: "12345" },
    {email:"vadivel.devarajan@ness.com",password:"12345"},
    { email: "chandrashekar.sukkali@ness.com", password: "12345" },
    { email: "pritam.shinde@ness.com", password: "12345" },
   
    
  ];
  
const login = async (req, res) => {
    const returnMessage = {
        isError: true,
        data: null,
        message: "Error occured",
  };
  
  const password = req.body.password;
  const saltRounds = 10;
const myPlaintextPassword = '$2b$10$.hVFokPR0kNZUHs63dGEYOB3Wsm/m3rqk7XE4e0JerBr/wT/z.tc.';

  bcrypt.genSalt(saltRounds,(err, salt)=> {
    bcrypt.hash(myPlaintextPassword, salt,(err, hash)=> {
        // Store hash in your password DB.
      console.log(hash);
      bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        // result == true
        console.log(result);
    });
    });
  });
  



    if (validateUser(req.body)) {
      let token = jwt.sign({ data: req.body }, "secret", { expiresIn: "1h" });
      var decoded = jwt.decode(token);
      // console.log(token, decoded);
        returnMessage.isError = false;
        returnMessage.message = `Successfully Login ${req.body.email}`;
        returnMessage.data = {jwt:token};
        res.status(200).json(returnMessage);
        res.end();
    } else {
        returnMessage.isError = true;
        returnMessage.message = "Invalid Credentails";
        res.status(400).json(returnMessage);
  }
  
  
 
}

const validateUser = (user) => {
  for (let index in USERS) {
        if (
          user.email == USERS[index].email &&
          user.password == USERS[index].password
        ) {
          console.log("user Found data");
          return true;
        } else {
          null;
        }
      }
    
}

module.exports = {
    login
}