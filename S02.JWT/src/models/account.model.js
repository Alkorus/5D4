import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        hash: { type: String, required: true },
        salt: { type:String, required:true },
        createdDate: { type: Date, default: Date.now },

    },
    {
        collection: 'accounts',
        strict:'throw'
        
    }
);

export default mongoose.model('Account', schema);