const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // include associated Products and its attributes
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name"],
      },
    ],
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // include associated Products and its attributes
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res
        .status(404)
        .json({
          message: "The category you are trying to find does not exist!",
        });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  //by inputting the new category name
  Category.create({
    category_name: req.body.category_name,
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  //use a post request to update an existing category
  //sends an error message if category does not exist
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res
        .status(404)
        .json({
          message: "The category you are trying to update does not exist!",
        });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  //use a delete request to remove an existing category
  //sends an error message if category does not exist
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res
        .status(404)
        .json({
          message: "The category you are trying to delete does not exist!",
        });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
