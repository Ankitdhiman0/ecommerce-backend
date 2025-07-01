const mongoose = require("mongoose");
const Product = require("./models/Products");
require("dotenv").config();

const categories = ["male", "female", "kids", "electronics"];

const fashionSubcategories = ["shoes", "tshirt", "jeans", "shirt", "hoodie"];
const electronicsSubcategories = [
  "mobile",
  "laptop",
  "headphones",
  "camera",
  "smartwatch",
];

const descriptions = [
  "High quality and comfortable.",
  "Limited edition trendy style.",
  "Perfect for everyday use.",
  "Stylish and durable.",
  "Best in class design.",
];
const fashionImages = {
  shoes: "https://placehold.co/300x300?text=Shoes",
  tshirt: "https://placehold.co/300x300?text=Tshirt",
  jeans: "https://placehold.co/300x300?text=Jeans",
  shirt: "https://placehold.co/300x300?text=Shirt",
  hoodie: "https://placehold.co/300x300?text=Hoodie",
};

const electronicsImages = {
  mobile: "https://placehold.co/300x300?text=Mobile",
  laptop: "https://placehold.co/300x300?text=Laptop",
  headphones: "https://placehold.co/300x300?text=Headphones",
  camera: "https://placehold.co/300x300?text=Camera",
  smartwatch: "https://placehold.co/300x300?text=Smartwatch",
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Mongo Connected");

    Product.deleteMany({});
    console.log("Old All Products Deleted");

    const products = [];

    for (let i = 0; i <= 25; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];

      let subCategory, image;

      if (category === "electronics") {
        subCategory =
          electronicsSubcategories[
            Math.floor(Math.random() * electronicsSubcategories.length)
          ];
        image = electronicsImages[subCategory];
      } else {
        subCategory =
          fashionSubcategories[
            Math.floor(Math.random() * fashionSubcategories.length)
          ];

        image = fashionImages[subCategory];
      }

      const price = Math.floor(Math.random() * 15000 + 500);

      products.push({
        title: `${
          category[0].toUpperCase() + category.slice(1)
        } ${subCategory} ${i}`,
        category,
        subcategory: subCategory,
        price,
        image: image,
        description:
          descriptions[Math.floor(Math.random() * descriptions.length)],
      });
    }

    await Product.insertMany(products);
    console.log("100 Products Inserted Successfully including electronics");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error", err);
    process.exit(1);
  });
