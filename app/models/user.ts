import mongoose from 'mongoose';
import UserSession from './usersession';
import { v4 as uuidv4 } from 'uuid';

const Schema : mongoose.Schema = new mongoose.Schema({
    id: {
        type: 'Number',
    },
    name: {
        type: 'String',
    },
    email: {
        type: 'String',
    },
    password: {
        type: 'String'
    }
}, {
    timestamps: true,
    methods: {
        createSession() {
            return UserSession.create({
                user_id: this.id,
                session_id: uuidv4()
            });
        },
        activeSessions() {
            return UserSession.find({user_id: this.id}).where('expired_at').equals(null);
        }
    }
});

export default mongoose.model('users', Schema);