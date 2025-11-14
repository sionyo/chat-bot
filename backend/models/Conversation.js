import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true,
    },
    content : {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const conversationSchema = new mongoose.Schema({
    guestId: {
        type: String,
        required: true,
        unique: true
    },
    messages: [messageSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

conversationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
})

export default mongoose.model('Conversation', conversationSchema)