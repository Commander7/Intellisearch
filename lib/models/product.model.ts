import mongoose from "mongoose";
import { title } from "process";

const productSchema = new mongoose.Schema({
    url: {type: String, require: true, unique:true},
    currency: {type: String, require:true},
    image: {type: String, require: true},
    title: {type:String, require:true},
    currentPrice: {type: Number, require:true},
    originalPrice: {type: Number, require:true},
    priceHistory: [
        { price: {type: Number, require:true},
          date: {type: Date, default: Date.now}
        },
        
    ],
    lowestPrice: {type: Number},
    highestPrice: {type: Number},
    averagePrice: {type: Number},
    discountRate: {type: Number},
    description: {type: String},
    category: {type: String},
    reviewsCount: {type: Number},
    isOutOfStock: {type: Boolean, default:false},
    users: [
        { email: {type: String, require:true}},
        
    ], default: [],
}, {timestamps: true});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;