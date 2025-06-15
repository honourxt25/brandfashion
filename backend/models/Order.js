import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    billingDetails: {
        name: String,
        email: String,
        address: String,
        city: String,
        zip: String,
        country: String
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalAmount: Number,
    status: { type: String, default: 'Processing' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema);
