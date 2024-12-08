import mongoose from 'mongoose';

const db = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/NoteApp', {
           
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit on failure
    }
};

export default db;
