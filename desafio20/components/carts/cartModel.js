import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    quantity: {type: Number, required: true, trim: true}
});

export default cartItemSchema;