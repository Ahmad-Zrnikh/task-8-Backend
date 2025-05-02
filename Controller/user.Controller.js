// after clouding images
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../config/cloudinary");

const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      user_name,
      email,
      password,
      password_confirmation,
    } = req.body;

    if (!first_name || !last_name || !user_name || !email || !password || !password_confirmation) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== password_confirmation) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please provide image" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await cloudinary.uploader.upload(req.file.path);

    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      password_confirmation: hashedPassword,
      user_name,
      profile_image: result.secure_url,
    });

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET);
    await user.save();

    res.status(201).json({ status: "success", data: { token, user } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };


// before clouding images
// const User = require("../Models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const register = async (req, res) => {
//   try {
//     const {
//       first_name,
//       last_name,
//       user_name,
//       email,
//       password,
//       password_confirmation,
//     } = req.body;
//     if(!first_name || !last_name || !user_name || !email || !password || !password_confirmation){
//         return res.status(400).json({ message: "Please provide all fields" });
//     }
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const hashedpassword = await bcrypt.hash(password, 10);
//     if (password !== password_confirmation) {
//       return res.status(400).json({ message: "not the same password" });
//     }
//     if(!req.file){
//         return res.status(400).json({ message: "Please provide image" });
//     }
//     const user = new User({
//       first_name,
//       last_name,
//       email,
//       password: hashedpassword,
//       password_confirmation: hashedpassword,
//       user_name,
//       profile_image: `https://dashboard-task-8-backend.onrender.com/uploads/${req.file.filename}`,
//     });

//     const token = jwt.sign({id: user._id, email, password }, process.env.JWT_SECRET);
//     await user.save();

//     res.status(201).json({ status: "success", data: { token, user } });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please provide email and password" });
//     }
//     const user = await User.findOne({ email: email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//     const compare = await bcrypt.compare(password, user.password);

//     if (!compare) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//     const token = jwt.sign({id: user._id, email, password }, process.env.JWT_SECRET);

//     res.status(200).json({ user, token });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// module.exports = { register, login };
