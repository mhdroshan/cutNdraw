const fs = require("fs");
const db = require("../models");
const Products = db.products;
const Op = db.Sequelize.Op;
const formidable = require("formidable");

// retrieve products from db
exports.findAll = (req, res) => {
  const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Products.findAll({
    // where: condition,
    order: [["rating", "DESC"]],
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
exports.findAllByCollection = (req, res) => {
  const type = req.params.type;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Products.findAll({
    where: {
      catogary: type,
    },
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
  // console.log(req.params);
  const user = req.params.user;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Products.findAll({
    where: {
      userId: user,
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

// get product images after the submision
exports.photo = (req, res) => {
  const id = req.params.id;
  Products.findOne({
    where: {
      id,
    },
    attributes: ["id", "p_photo", "photoContentType"],
  })
    .then((product) => {
      res.set("Content-Type", product.photoContentType);
      return res.send(product.p_photo);
    })
    .catch((err) =>
      res.status(400).json({
        error: errorHandler(err),
      })
    );
};
// update user
exports.updatepro = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    // if (!fields.Pname) {
    //   res.status(400).send({
    //     message: "product title is important.!",
    //   });
    //   return;
    // }
    if (err) {
      return res.status(400).json({
        error: "photo coudnt upload",
      });
    }
    let product = {
      userId: fields.seller_id,
      title: fields.Pname,
      description: fields.desc,
      catogary: fields.catogary,
      price: fields.price,
      p_photo: fs.readFileSync(files.images.path),
      photoContentType: files.images.type,
    };
    if (files.images) {
      if (files.images.size > 20000000) {
        return res.status(400).json({
          error: "Image should be less than 2mb",
        });
      }
    }
    const id = req.params.id;
    Products.update(product, {
      where: {
        id: id,
      },
    })

      .then((data) => {
        res.send(data);
        // res.send(data.title);
        // res.send(data.userId);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding the product.",
        });
      });
  });
};

exports.addproduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (!fields.Pname) {
      res.status(400).send({
        message: "product title is important.!",
      });
      return;
    }
    if (err) {
      return res.status(400).json({
        error: "photo coudnt upload",
      });
    }
    let product = {
      userId: fields.seller_id,
      title: fields.Pname,
      description: fields.desc,
      catogary: fields.catogary,
      price: fields.price,
      rating:fields.rating,
      p_photo: fs.readFileSync(files.images.path),
      photoContentType: files.images.type,
    };
    if (files.images) {
      if (files.images.size > 20000000) {
        return res.status(400).json({
          error: "Image should be less than 2mb",
        });
      }
    }

    Products.create(product)
      .then((data) => {
        res.send(data);
        // res.send(data.title);
        // res.send(data.userId);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding the product.",
        });
      });
  });
};

exports.findAllbyId = (req, res) => {
  // console.log(req.params.id);
  const id = req.params.id;
  Products.findAll({
    where: {
      id:id,
    },
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

exports.addrating = (req, res) => {
  const id = req.params.id;
  Products.increment("rating", {
    where: {
      id: id,
    },
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

// delete
exports.delete = (req, res) => {
  const id = req.params.id;

  Products.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Products was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Products with id=${id}. Maybe Products was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Products with id=" + id,
      });
    });
};
