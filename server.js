const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());

// Replace with your MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://jagadheesh2005:mongoatlas@cluster0.tjopw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const productSchema = new mongoose.Schema({
    title: String,
    price: String,
    desc: String,
});

const Product = mongoose.model('Product', productSchema);

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        console.log(products);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});