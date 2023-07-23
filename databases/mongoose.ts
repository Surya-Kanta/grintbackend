
import mongoose from 'mongoose';

const mongooseConnect = () => {
    const mongoUrl: string = process.env.MONGODB_URL || '';

    mongoose.connect(mongoUrl)
        .then(() => {
            console.log('Connection to MongoDB successful!');
        })
        .catch(() => {
            console.log('Failed to connect to MongoDB!');
        });
}

export default mongooseConnect;