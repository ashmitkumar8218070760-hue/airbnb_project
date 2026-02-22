const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const { cloudinary } = require("../cloudConfig.js");

const MONGODB_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log(err);
});
 

async function main() {
    await mongoose.connect(MONGODB_URL);
}

const initDB = async () => {
    const listings = await Listing.find({});
    for (let listing of listings) {
        if (listing.image && listing.image.filename) {
            await cloudinary.uploader.destroy(listing.image.filename);
        }
    }
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '6989f8ffd734ada953ab78d4'}));
    await Listing.insertMany(initData.data);

    console.log("Database initialized with sample data");
};

initDB();

