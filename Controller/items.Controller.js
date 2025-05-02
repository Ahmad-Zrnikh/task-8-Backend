// after clouding images
// itemsController.js
const Item = require("../Models/Item");
const { cloudinary } = require("../config/cloudinary");

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    return res.status(200).json({ status: "success", data: { items } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({
      id: item._id,
      name: item.name,
      price: item.price,
      image_url: item.image,
      created_at: item.createdAt,
      updated_at: item.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price || !req.file) {
      return res.status(400).json({ message: "Please provide name, price, and image" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const item = new Item({
      name,
      price,
      image: result.secure_url,
      user_id: req.user._id,
    });

    await item.save();
    res.status(201).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const oldItem = await Item.findById(req.params.id);
    if (!oldItem) return res.status(404).json({ message: "Item not found" });

    let imageUrl = oldItem.image;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name || oldItem.name,
        price: req.body.price || oldItem.price,
        image: imageUrl,
        user_id: oldItem.user_id,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: "success", item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getItems, getItem, addItem, updateItem, deleteItem };


// before clouding images
// const Item = require("../Models/Item");
// const getItems = async (req, res) => {
//   try {
//     const items = await Item.find();

//     return res.status(200).json({ status: "success", data: { items } });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };
// const getItem = async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }
//     return res.status(200).json({
//       id: req.params.id,
//       name: item.name,
//       price: item.price,
//       image_url: item.image,
//       created_at: item.createdAt,
//       updated_at: item.updatedAt,
//     });
//   } catch {
//     return res.status(500).json({ message: err.message });
//   }
// };
// const addItem = async (req, res) => {
//   try {
//     const { name, price } = req.body;
//     if (!name || !price) {
//       return res
//         .status(400)
//         .json({ message: "Please provide name , price and image" });
//     }
//     if (!req.file) {
//       return res.status(400).json({ message: "Please provide image" });
//     }
//     const item = new Item({
//       name,
//       price,
//       image: `https://dashboard-task-8-backend.onrender.com/uploads/${req.file.filename}`,
//       user_id: req.user._id
//     });
//     await item.save();

//     return res.status(201).json({ status: "success" });
//   } catch {
//     return res.status(500).json({ message: err.message });
//   }
// };
// const updateItem = async (req, res) => {
//   try { 
//     const oldItem = await Item.findById(req.params.id);
//     const item = await Item.findByIdAndUpdate(
//       req.params.id,
//       {
//         name : req.body.name || oldItem.name,
//         price :req.body.price ||oldItem.price ,
//         image: req.file ?`https://dashboard-task-8-backend.onrender.com/uploads/${req.file.filename}` : oldItem.image,
//         user_id : oldItem.user_id
//       },
//       { new: true , runValidators: true }
//     );
//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }
//     return res.status(200).json({ status: "success" });
//   } catch {
//     return res.status(500).json({ message: err.message });
//   }
// };
// const deleteItem = async (req, res) => {
//   try {
//     const item = await Item.findByIdAndDelete(req.params.id);
//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }
//     return res.status(200).json({ status: "success" });
//   } catch {
//     return res.status(500).json({ message: err.message });
//   }
// }
// module.exports = { getItems, getItem, addItem, updateItem ,deleteItem };
