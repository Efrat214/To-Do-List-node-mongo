const { Schema, model } = require('mongoose');

const todoSchema = new Schema(
    {
        id:Schema.Types.ObjectId,
        userCode: { type: Schema.Types.ObjectId, ref: 'users' },
        content: { type: String, minlength: 2,required:true },
        bennDone: { type: Boolean},
    }
);

module.exports = model('todo', todoSchema); 
