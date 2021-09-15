import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        displayName: { type: String, required:true },
        fourDigits: { type: Number, required:true },
        email: { type: String, required: true, unique: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        hash: { type: String, required: true },
        salt: { type:String, required:true },
        createdDate: { type: Date, default: Date.now }
    },
    {
        collection: 'accounts',
        strict:'throw'
        
    }
);



//créer une contrainte unique sur plusieurs champs combinés
schema.index({displayName:1, fourDigits:1}, {unique:true});

schema.virtual('tweets', {
    ref: 'Tweet',
    localField: '_id',
    foreignField: 'author',
    justOne: false
})

export default mongoose.model('Account', schema);