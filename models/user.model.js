

const { Schema, model, mongoose } = require('mongoose');

const AddressSchema = mongoose.Schema({
    city: String,
    street: String,
    houseNumber: Number,
});

const userSchema = new Schema(
    {
        id:Schema.Types.ObjectId,
        username: { type: String, minlength: 2, required: true },
        password: { type: String, minlength: 8, match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, required: true },
        email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
        phone: { type: String, match: /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/gm },
        address: { type: AddressSchema },
    }
);

module.exports = model('users', userSchema); 
