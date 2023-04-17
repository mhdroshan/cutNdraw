const fs = require("fs");
const db = require("../models");
// const multer = require("multer");
const formidable = require("formidable");
// const user = db.users;
const Users = db.users;

// const Op = db.Sequelize.Op;

// const storage = multer.diskStorage({
//   destination: function(req, res,cb){
//    cb(null,'./uploads');
//   },
//   filename:function(req,file,cb){
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// })
// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({storage: storage});
exports.photo = (req, res) => {
  const id = req.params.id;
  Users.findOne({
    where: {
      id,
    },
    attributes: ["id", "photo", "photoContentType"],
  })
    .then((user) => {
      res.set("Content-Type", user.photoContentType);
      return res.send(user.photo);
    })
    .catch((err) =>
      res.status(400).json({
        error: errorHandler(err),
      })
    );
};

// exports.create = (req, res) => {
//   // console.log("trtrt");
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, files) => {
//     if (!fields.fullName) {
//       res.status(400).send({
//         message: "Content will not be empty!",
//       });
//       return;
//     }
//     if (err) {
//       return res.status(400).json({
//         error: "Photo coudnt upload",
//       });
//     }
//     let user = {
//       u_name: fields.fullName,
//       u_email: fields.email,
//       u_phone: fields.phone,
//       u_pass: fields.password,
//       u_age: fields.Dob,
//       u_address: fields.address,
//       photo: fs.readFileSync(files.profile.path),
//       photoContentType: files.profile.type,
//       verified: fields.verified,
//     };

//     if (files.profile) {
//       if (files.profile.size > 30000000) {
//         return res.status(400).json({
//           error: "Image should be less than 3mb",
//         });
//       }
//       // user.photo = fs.readFileSync(files.profile.path);
//       // user.photoContentType = files.photo.type;
//     }
//     Users.create(user)
//       .then((data) => {
//         res.send(data);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the user.",
//         });
//       });
//   });
// };

// Create and Save a new user
exports.create = (req, res, file) => {
  console.log(req.file);
  // Validate request
  if (!req.body.fullName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a user
  const user = {
    u_name: req.body.fullName,
    u_email: req.body.email,
    u_phone: req.body.phone,
    // u_pass: req.body.password,
    // u_age: req.body.Dob,
    u_address: req.body.Address,
    photo: req.body.profile,
    verified: req.body.verified,
    userId: req.body.id,
  };

  // Save Tutorial in the database
  Users.create(user)
    // res
    //   .send({
    //     message: req.body.id,
    //   })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  console.log('in find all')

  Users.findAll({
    // order: [["u_name", "DESC"]],
  })
  .then((data) => {
    console.log(data);
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users.",
    });
  });
};

// Find a single Tutorial with an id
exports.findUser = (req, res) => {
  console.log('in find user')

  const user = req.params.id;
  console.log(req.params.id);
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Users.findOne({
    where: {
      userId: user,
    },
  })
    .then((data) => {
      console.log(data);
      res.send(data);
      // res.send(data.userId);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  let userUpd = {
    verified:1,
  }
  Users.update(userUpd,{
    where: {
      id: id,
    },
  })
  
  .then((data) => {
    res.send(data);
    // res.send(data.userId);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving products.",
    });
  });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Users.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe Products was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {};

// product controllers
