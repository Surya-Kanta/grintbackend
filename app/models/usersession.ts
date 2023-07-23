import mongoose from 'mongoose';
import User from './user';

const Schema: mongoose.Schema = new mongoose.Schema({
    id: {
        type: 'Number',
    },
    user_id: {
        type: 'String',
    },
    session_id: {
        type: 'String',
    },
    expired_at: {
        type: 'date'
    }
}, {
    timestamps: true,
    methods: {
        isExpired() {
            return this.expired_at ? true : false
        },
        isActive() {
            return !this.isExpired();
        },
        user() {
            return User.findOne({id: this.user_id});
        }
    }
});

export default mongoose.model('user_sessions', Schema);