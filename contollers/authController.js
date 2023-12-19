const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

exports.creatUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (name==="" && email ===""&& password==="") {
      
      res.status(200).json({ succuss: false, message: "Wrong Credential" });
    } else {
      console.log(req.file);
      const user = await User.findOne({ email: email });
      if (!user) {
        // hashing of password
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
          userImage: req.file ? req.file.filename : "",
        });
        res
          .status(200)
          .json({ succuss: true, message: "User Registrated Successfully" });
      } else {
        res
          .status(200)
          .json({ succuss: false, message: "You are already registered" });
      }
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email,password)
    if (email==="" && password==="") {
     
      res
        .status(400)
        .json({ succuss: false, message: "Not get Invalid Credential" });
    } else {
      const user = await User.findOne({ email: email });
      // const all = await User.find({  });
//  console.log(all);
      if (
        user &&
        user.email === email &&
        (await bcrypt.compare(password, user.password))
      ) {
        // token generate
        const token = jwt.sign({ userId: user._id }, process.env.JWTSecretKey);
        const userP = await User.findOne({ email: email }).select("-password");
        res.status(200).json({
          succuss: true,
          message: "User Login Successfully",
          token,
          user: userP,
        });
      } else {
        res.status(400).json({ succuss: false, message: "Invalid Credential" });
      }
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: "error" });
  }
};

// Authentication needed

module.exports.changePassword = async function (req, res) {
  // checkAuth
  try {
    const { email, newPassword, confirmPassword } = req.body;
   
    if (
      email &&
      newPassword &&
      confirmPassword &&
      newPassword === confirmPassword
    ) {
      const genSalt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, genSalt);
      const user = await User.findOne({ email: email });
     
      if(user){
        await User.findByIdAndUpdate(user._id, {
          password: hashedPassword,
        });
  
        res
          .status(200)
          .json({ succuss: true, message: "Password change succussfully" });
      }else{
        res.status(400).json({ succuss: false, message: "User Not present" });

      }
     
    } else {
      res.status(400).json({ succuss: false, message: "Wrong Credential" });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json({ succuss: false, message: error });
  }
};

module.exports.update = async function (req, res) {
  // checkAuth
  try {
    const { name, email, userImage } = req.body;
    if (name ===""&& email==="") {
     
      res.status(200).json({ succuss: false, message: "Wrong Credential" });
    } else {
      const newUser = await User.findByIdAndUpdate(req.user._id, {
        name,
        email,
        userImage: req.file ? req.file.filename : userImage,
      });
      newUser.save();
      const user = await User.findById(req.user._id).select("-password");

      const token = jwt.sign(
        { userId: req.user._id },
        process.env.JWTSecretKey
      );
      res
        .status(200)
        .json({
          succuss: true,
          message: "Updated succussfully",
          token,
          user: user,
        });
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};

module.exports.getUserProfile = async function (req, res) {
  res
    .status(200)
    .json({ succuss: true, message: "succussfully", user: req.user });
};

module.exports.search = async function (req, res) {
  // checkAuth
  try {
    const { name } = req.query;
    if (name) {
      const user = await User.find({ name: name }).select("-password");

      if (user) {
        res.status(200).json({ succuss: true, message: "found", user });
      } else {
        res.status(400).json({ succuss: false, message: "Not found" });
      }
    } else {
      res.status(400).json({ succuss: false, message: "You did not search" });
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};
