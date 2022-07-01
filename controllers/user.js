const bcrypt= require('bcrypt')
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

/* REGEX */
const strongPasswordRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
const mailFormatRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

/* NODEMAILER */
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // hostname
  auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PW
  }
});
  
exports.signup = (req, res, next) => {
    
    if(!req.body.nickname.length){
      return res.status(400).json({
        message: 'Please enter a nickname.'
      })
    }
    if(!req.body.email.match(mailFormatRegex) || !req.body.email.includes("")){
      return res.status(400).json({
        message: 'Please use valid email format.'
      });
    }

    if(!req.body.password.match(strongPasswordRegex) || !req.body.password.includes("")){
      return res.status(400).json({
        message: 'Please use a password that contains at least one upper case letter, one lower case letter, one number, one special character and is at least 8 characters long.'
      });
    }

    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          nickname:req.body.nickname,
          email: req.body.email,
          password: hash,
          avatar:`${req.protocol}://${req.get('host')}/images/default_avatar.png`
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Congratulations, you just created your account, please login now !' }))
          .catch(() => res.status(400).json({ message: 'Email or Nickname already used !' }));
      })
      .catch(() => res.status(500).json({ message: 'Server error !' }));
};


exports.login = (req, res, next) => {

    if(!req.body.email.match(mailFormatRegex) || !req.body.email.includes("")){
      return res.status(400).json({
         message: 'Please use valid email format.'
        });
    }

    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: 'Unable to connect, you have entered the wrong access !' 
          });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({
                 message: 'Unable to connect, you have entered the wrong access !' 
                });
            }
            res.status(200).json({
                message: 'User connected !',
                nickname: user.nickname,
                user_id:user._id,
                avatar:user.avatar,
                token: jwt.sign(
                    { user_id: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                  )
            });
          })
          .catch(() => res.status(500).json({ message: 'Server error !' }));
      })
      .catch(() => res.status(500).json({ message: 'Server error !' }));
  };

exports.modifyAvatar = (req,res) =>{
  User.findOne({ _id: req.params.id  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
           message: 'User not found !' 
          });
      }
      User.updateOne({_id:req.params.id},{$set: {
          "avatar": `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        }})
        .then(() => res.status(201).json({
           message: 'Avatar changed !' 
          }))
        .catch(() => res.status(500).json({
            message: 'Server error !' 
          }));
      })
    .catch(() => res.status(500).json({
       message: 'Server error !' 
    }));
  }



exports.forgotPassword = (req, res) => {

    if(!req.body.email.match(mailFormatRegex) || !req.body.email.includes("")){
      return res.status(400).json({
         message: 'Please use valid email format.'
        });
    }

    User.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            return res.status(401).json({
               message: 'User not found !' 
              });
          }
          
          const randomNumber = Math.floor(100000 + Math.random() * 900000);
          const output = `<p>Secret code to verify your email address :${randomNumber}</p>`;

          user.resetPasswordNumber = randomNumber
          user.save()

          let mailOptions = {
          from: process.env.MAILER_USER, 
          to: req.body.email, 
          subject: 'Reset password mon-cinema', 
          html: output
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            res.status(200).json({
              message: 'Email sent to your email address !',
            });

        });
      })
      .catch(() => res.status(500).json({ message: 'Server error !' }));
}


exports.verifyNumber = (req,res) =>{
    if(req.body.resetPasswordNumber === "" || !req.body.resetPasswordNumber.match(/^[0-9]{1,6}$/)){
      return res.status(400).json({
          message: 'Please enter your 6 numbers secret code !'
        });
    } 
    User.findOne({ resetPasswordNumber: req.body.resetPasswordNumber })
      .then(user => {
        if (!user || user.resetPasswordNumber === null) {
          return res.status(401).json({ message: 'Wrong code !' });
        }
        user.resetPasswordNumber = ""
        user.save();
        res.status(200).json({
          message: 'Code correct, you can now modify your password !',
          _id:user._id
        });
    })
    .catch(() => res.status(500).json({ message: 'Server error !' }));
    

}

exports.modifyPassword = (req,res) =>{
    
    if(!req.body.password.match(strongPasswordRegex) || !req.body.password.includes("")){
      return res.status(400).json({
        message: 'Please use a password that contains at least one upper case letter, one lower case letter, one number, one special character and is at least 8 characters long.'
      });
    }

    User.findOne({ _id: req.body._id  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
           message: 'User not found !' 
          });
      }
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
      user.password = hash
      user.save()
        .then(() => res.status(201).json({
           message: 'Password changed, You can now Sign in !' 
          }))
        .catch(() => res.status(500).json({
            message: 'Server error !' 
          }));
    })
    .catch(() => res.status(500).json({
       message: 'Server error !' 
      }));
  })
}

exports.verifyToken = (req,res) =>{ 
  
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const user_id = decodedToken.user_id;
    if (req.body.user_id && req.body.user_id !== user_id) {
      return res.status(400).json({
        message: 'Your session has expired, please login !' 
      })
    } else {
      return res.status(201).json({
        message:'Your jwt is valid'
      })
      
    }
}

exports.getAvatar = (req,res) => {
  User.findOne({ _id: req.params.id  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
           message: 'User not found !' 
          });
      }
      res.status(200).json({
        avatar:user.avatar,
      });
    })
    .catch(err=>{
      return res.status(500).json({message:"Server error, please try again later !"})
    });
  }
