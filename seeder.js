const mongoose = require("mongoose");
const Product = require("./models/Products");
require("dotenv").config();

const categories = ["male", "female", "kids", "electronics"];

const fashionSubcategories = ["shoes", "tshirt", "jeans", "shirt"];
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
    "https://w7.pngwing.com/pngs/75/649/png-transparent-adidas-shoe-sneakers-women-shoes-purple-white-violet-thumbnail.png",
    "https://w7.pngwing.com/pngs/88/948/png-transparent-shoe-shoes-brown-leather-fashion-thumbnail.png",
    "https://w7.pngwing.com/pngs/323/773/png-transparent-sneakers-basketball-shoe-sportswear-nike-shoe-outdoor-shoe-running-sneakers-thumbnail.png",
  ],
  tshirt: [
    "https://w7.pngwing.com/pngs/74/236/png-transparent-printed-t-shirt-hoodie-clothing-tshirt-design-tshirt-angle-active-shirt-thumbnail.png",
    "https://w1.pngwing.com/pngs/235/798/png-transparent-hearts-tshirt-clothing-fashion-clothing-accessories-hearts-tshirt-tshirt-design-ideas-t-shirt-thumbnail.png",
    "https://w7.pngwing.com/pngs/257/418/png-transparent-white-shirt-t-shirt-clothing-sleeve-polo-shirt-tshirt-mockup-tshirt-angle-white-thumbnail.png",
  ],
  jeans: [
    "https://w7.pngwing.com/pngs/63/280/png-transparent-jeans-denim-slim-fit-pants-bell-bottoms-jeans-blue-fashion-boy-thumbnail.png",
    "https://w7.pngwing.com/pngs/228/567/png-transparent-jeans-clothing-denim-pants-jeans-cowboy-autocad-dxf-trousers-thumbnail.png",
    "https://w7.pngwing.com/pngs/659/97/png-transparent-jeans-denim-jeans-blue-user-interface-design-color-thumbnail.png",
  ],
  shirt: [
    "https://w7.pngwing.com/pngs/9/1001/png-transparent-black-dress-shirt-t-shirt-dress-shirt-clothing-black-dress-shirt-tshirt-black-formal-wear-thumbnail.png",
    "https://w7.pngwing.com/pngs/264/23/png-transparent-t-shirt-dress-shirt-sleeve-shirt-tshirt-blue-tartan-thumbnail.png",
    "https://w7.pngwing.com/pngs/972/557/png-transparent-blue-dress-shirt-t-shirt-dress-shirt-dress-shirt-tshirt-blue-image-file-formats-thumbnail.png",
  ],
};

const electronicsImages = {
  mobile: [
    "https://w7.pngwing.com/pngs/166/408/png-transparent-feature-phone-smartphone-mobile-phone-accessories-pda-smartphone-gadget-electronics-mobile-phone-thumbnail.png",
    "https://w7.pngwing.com/pngs/656/137/png-transparent-feature-phone-smartphone-iphone-x-mockup-smartphone-electronics-gadget-logo-thumbnail.png",
    "https://w7.pngwing.com/pngs/603/63/png-transparent-smartphone-vivo-v9-2018-world-cup-feature-phone-smartphone-blue-gadget-electronics-thumbnail.png",
  ],
  laptop: [
    "https://w7.pngwing.com/pngs/210/256/png-transparent-laptop-laptop-notebook-electronics-netbook-computer-thumbnail.png",
    "https://w7.pngwing.com/pngs/487/248/png-transparent-laptop-computer-icons-laptop-electronics-gadget-image-file-formats-thumbnail.png",
    "https://w7.pngwing.com/pngs/480/431/png-transparent-laptop-dell-computer-hp-pavilion-windows-10-laptop-gadget-electronics-netbook-thumbnail.png",
  ],
  headphones: [
    "https://w7.pngwing.com/pngs/899/366/png-transparent-jbl-t450-headphones-wireless-audio-headphones-thumbnail.png",
    "https://w7.pngwing.com/pngs/969/417/png-transparent-red-beats-by-dr-dre-wireless-headphones-headphones-beats-electronics-microphone-sound-disc-jockey-headphone-electronics-recording-studio-musician-thumbnail.png",
    "https://w7.pngwing.com/pngs/782/603/png-transparent-black-headphones-headset-wearing-headphones-thumbnail.png",
  ],
  camera: [
    "https://w7.pngwing.com/pngs/940/845/png-transparent-nikon-dslr-camera-thumbnail.png",
    "https://w7.pngwing.com/pngs/31/934/png-transparent-black-nikon-dslr-camera-nikon-d800-nikon-d600-camera-digital-slr-camera-electronics-camera-lens-photography-thumbnail.png",
    "https://w7.pngwing.com/pngs/73/452/png-transparent-black-nikon-dslr-camera-full-frame-digital-slr-camera-back-illuminated-sensor-nikon-dslr-lens-camera-lens-photography-thumbnail.png",
  ],
  smartwatch: [
    "https://w7.pngwing.com/pngs/882/409/png-transparent-smart-watch-thumbnail.png",
    "https://w7.pngwing.com/pngs/504/311/png-transparent-apple-watch-series-2-apple-watch-series-3-smartwatch-black-smart-watch-black-hair-digital-black-white-thumbnail.png",
    "https://w7.pngwing.com/pngs/296/368/png-transparent-amazon-com-gps-navigation-systems-amazfit-smartwatch-xiaomi-smart-watch-watch-accessory-mobile-phones-touchscreen-thumbnail.png",
  ],
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Mongo Connected");

    await Product.deleteMany();
    console.log("🗑️ Old products deleted");

    const products = [];

    for (let i = 1; i <= 50; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];

      let subCategory, imagesArray, image;

      if (category === "electronics") {
        subCategory =
          electronicsSubcategories[
            Math.floor(Math.random() * electronicsSubcategories.length)
          ];
        imagesArray = electronicsImages[subCategory];
      } else {
        subCategory =
          fashionSubcategories[
            Math.floor(Math.random() * fashionSubcategories.length)
          ];
        imagesArray = fashionImages[subCategory];
      }

      image = imagesArray[Math.floor(Math.random() * imagesArray.length)];
      const price = Math.floor(Math.random() * 15000 + 500);

      products.push({
        title: `${
          category[0].toUpperCase() + category.slice(1)
        } ${subCategory}`,
        category,
        subcategory: subCategory,
        price,
        image,
        description:
          descriptions[Math.floor(Math.random() * descriptions.length)],
      });
    }

    await Product.insertMany(products);
    console.log("✅ 50 products inserted successfully!");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Error", err);
    process.exit(1);
  });
