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
  shoes: [
    "https://images.unsplash.com/photo-1600180758890-9fb5fd357a8d",
    "https://images.unsplash.com/photo-1580934427617-65b44cfa2093",
    "https://images.unsplash.com/photo-1593032465175-7bdbbb6f9334",
  ],
  tshirt: [
    "https://images.unsplash.com/photo-1585386959984-a4155224a1fc",
    "https://images.unsplash.com/photo-1602810317773-6b46eb7a2871",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  ],
  jeans: [
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    "https://images.unsplash.com/photo-1593032457861-bfc2c18c1c15",
    "https://images.unsplash.com/photo-1564463838269-98429c176418",
  ],
  shirt: [
    "https://images.unsplash.com/photo-1582725278678-34d6e547a5a5",
    "https://images.unsplash.com/photo-1618354691217-91d85e05f728",
    "https://images.unsplash.com/photo-1598032893643-348bb40f0f31",
  ],
  hoodie: [
    "https://images.unsplash.com/photo-1602810318753-5e9cf05e52fa",
    "https://images.unsplash.com/photo-1618354691283-5c22d0b946e0",
    "https://images.unsplash.com/photo-1629466328937-6b0d4f93f40e",
  ],
};

const electronicsImages = {
  mobile: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1580910051072-cdfb4d205f9f",
  ],
  laptop: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    "https://images.unsplash.com/photo-1518770660439-4636190af475",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  ],
  headphones: [
    "https://images.unsplash.com/photo-1585386959984-7d027ad91a09",
    "https://images.unsplash.com/photo-1585386959984-651a06672ef3",
    "https://images.unsplash.com/photo-1618354691333-fb6a7da71c5b",
  ],
  camera: [
    "https://images.unsplash.com/photo-1519183071298-a2962edc3c66",
    "https://images.unsplash.com/photo-1530032143320-7a4a15b27f91",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  ],
  smartwatch: [
    "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642",
    "https://images.unsplash.com/photo-1600180758890-5cf94d802041",
    "https://images.unsplash.com/photo-1523275335684-7f0c0d80b0c8",
  ],
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Mongo Connected");

    await Product.deleteMany({});
    console.log("Old All Products Deleted");

    const products = [];

    for (let i = 0; i <= 25; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];

      let subCategory, images;

      if (category === "electronics") {
        subCategory =
          electronicsSubcategories[
            Math.floor(Math.random() * electronicsSubcategories.length)
          ];
        images = electronicsImages[subCategory];
      } else {
        subCategory =
          fashionSubcategories[
            Math.floor(Math.random() * fashionSubcategories.length)
          ];
        images = fashionImages[subCategory];
      }

      const selectedImage = images[Math.floor(Math.random() * images.length)];
      const price = Math.floor(Math.random() * 15000 + 500);

      products.push({
        title: `${
          category[0].toUpperCase() + category.slice(1)
        } ${subCategory} ${i}`,
        category,
        subcategory: subCategory,
        price,
        image: selectedImage,
        description:
          descriptions[Math.floor(Math.random() * descriptions.length)],
      });
    }

    await Product.insertMany(products);
    console.log("Products Inserted Successfully");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error", err);
    process.exit(1);
  });
