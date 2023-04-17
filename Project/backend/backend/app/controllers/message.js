const fs = require("fs");
const { send } = require("process");
const db = require("../models");
const Messages = db.messages;
const Op = db.Sequelize.Op;
// const formidable = require("formidable");

// retrieve products from db
// get product images after the submision
// exports.photo = (req, res) => {
//   const id = req.params.id;
//   Products.findOne({
//     where: {
//       id,
//     },
//     attributes: ["id", "p_photo", "photoContentType"],
//   })
//     .then((product) => {
//       res.set("Content-Type", product.photoContentType);
//       return res.send(product.p_photo);
//     })
//     .catch((err) =>
//       res.status(400).json({
//         error: errorHandler(err),
//       })
//     );
// };

exports.addmessage = (req, res) => {
  //   console.log(req.file);
  // Validate request
  if (!req.body.message) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a user
  const messages = {
    send_id: req.body.send_id,
    sender_name: req.body.sender_name,
    rec_id: req.body.rec_id,
    message: req.body.message,
    // u_pass: req.body.password,
    pro_id: req.body.pro_id,
  };

  // Save Tutorial in the database
  Messages.create(messages)
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

// find all messages
exports.findAll = (req, res) => {
  const rec_id = req.params.id;
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Messages.findAll({
    group: ["pro_id"],
    order: [["sender_name", "ASC"]],
    // group: ["send_id"],
    where: {
      rec_id: rec_id,

      // pro_id: "82",
    },
    // include: [db.users],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};
exports.findAllByUser = (req, res) => {
  const send_id = req.params.sid;
  const rec_id = req.params.rid;
  const pro_id = req.params.pid;
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Messages.findAll({
    order: [["createdAt", "ASC"]],
    where: {
      pro_id: pro_id,

      // rec_id: rec_id,
      // send_id: send_id,
      [Op.and]: [
        {
          rec_id: [rec_id, send_id],
        },
        {
          send_id: [send_id, rec_id],
        },
      ],
    },
    // include: [db.users],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};
exports.findAllByUserHome = (req, res) => {
  const send_id = req.params.sid;
  const rec_id = req.params.rid;
  const pro_id = req.params.pid;
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Messages.findAll({
    order: [["createdAt", "ASC"]],
    where: {
      pro_id: pro_id,
      // rec_id: rec_id,
      // send_id: send_id,

      [Op.and]: [
        {
          rec_id: [rec_id, send_id],
        },
        {
          send_id: [send_id, rec_id],
        },
      ],
    },
    // include: [db.users],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

// get all of my product based and sederbASED MESAGES

exports.findAllByProd = (req, res) => {
  const user_id = req.params.uid;
  const pro_id = req.params.pid;
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Messages.findAll({
    group: ["send_id"],
    where: {
      pro_id: pro_id,
      rec_id: user_id,

      // [Op.or]: [
      //   {
      //     rec_id: [rec_id, send_id],
      //   },
      //   {
      //     send_id: [send_id, rec_id],
      //   },
      // ],
    },
    // include: [db.users],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};
