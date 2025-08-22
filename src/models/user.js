import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import uuid from 'uuid4'



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    avatar: {
        type: String,
        default: ''
    },
    varificationCode: {
        type: String,
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    varificationLink: {
        type: String,
    }
})

// Hash password before saving
// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isNew) {
        if (!this.isModified('password')) return next();

        this.password = await bcrypt.hash(this.password, 10);
        this.avatar = `http://robohash.org/${this.name}`;

        // ✅ call uuid() function
        this.varificationCode = uuid().slice(0, 10).toUpperCase();
        this.varificationLink = `http://localhost:3001/varify/${this.varificationCode}`;

        next();
    }
});



userSchema.methods.checkPassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model('User', userSchema)
export default User;