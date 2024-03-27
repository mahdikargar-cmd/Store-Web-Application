
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const multer = require('multer')
const mongoose = require('mongoose')
const path = require('path');
const jwt = require('jsonwebtoken');


dotenv.config();
mongoose.connect(process.env.DB_URI);
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("server is running...");
});
const storage = multer.diskStorage({
    destination: "./uploads/images",
    filename: (req, file, cb) => {
        return cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});
const upload = multer({storage: storage});
app.use("/images", express.static("uploads/images"));
app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:5000/images/${req.file.filename}`,
    });
});

// schema for creating products
const Product = mongoose.model("Product", {
    id: {type: Number, required: true},
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: String,
        required: true,
    },
    old_price: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    avilable: {
        type: Boolean,
        default: true,
    },
});
app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API For deleting  Products
app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({id: req.body.id});
    console.log("deleted");

    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API for getting all products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
});


//Schema creating for user model
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,

    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})
// Creating Endpoint for registering the user
app.post('/signup', async (req, res) => {
    try {
        // Check if email is already associated with an existing user
        let check = await Users.findOne({email: req.body.email});
        if (check) {
            return res.status(400).json({success: false, errors: "Existing user found with the same email address"});
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // Create a new user document
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        // Save the user document to the database
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({success: true, token});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// creating endpoint for user login
app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({email: req.body.email});

        if (!user) {
            return res.status(400).json({success: false, errors: "کاربری با این ایمیل یافت نشد."});
        }

        const data = {
            user: {
                id: user.id,
            },
        };

        const token = jwt.sign(data, 'secret_ecom');

        res.json({success: true, token});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// creating endpoint for newCollection Data
app.get('/newCollectioned', async (req, res) => {
    let product = await Product.find({});
    let newCollection = product.slice(1).slice(-8);
    console.log("NewCollections Fetched");
    res.send(newCollection);
})

app.get('/popularinWomen', async (req, res) => {
    let product = await Product.find({category: "women"});
    let product_women = product.slice(0, 4);
    console.log("popular in women fetched");
    res.send(product_women);
});

// creating middleware to fetch user
const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, 'secret-ecom');
    req.user = decoded.user;
    next();

};


app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added",req.body.itemId);
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
});

//creating endpoint to remove product from cartData
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("Removed", req.body.itemId)
    let userData = await Users.findOne({_id: req.user.id});
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Removed");
});
// creating endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
        let  userData = await Users.findOne({_id: req.user.id}); // از req.user برای دسترسی به اطلاعات کاربر استفاده می‌کنیم
        res.json(userData.cartData);

});

const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`server is running on port ${PORT}`));