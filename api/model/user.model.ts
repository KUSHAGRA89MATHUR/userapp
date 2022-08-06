import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
    timestamps?: {};
}

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const UserSchema: Schema = new Schema({
    firstname: {
        type: String, required: [true, "First name is required"],
        maxLength: 100,
        validate: {
            validator: function (v) {
                var re = /^[a-zA-Z0-9]+$/;
                return re.test(v)
            },
            message: 'You must provide alphanumeric characters.'
        }
    },
    lastname: {
        type: String, required: [true, "First name is required"],
        maxLength: 100,
        validate: {
            validator: function (v) {
                var re = /^[a-zA-Z]+$/;
                return re.test(v)
            },
            message: 'You must provide alphanumeric characters.'
        }
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        validate: {
            validator: function (v) {
                var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return re.test(v)
            },
            message: 'Please enter a valid email address.'
        }
    },
    createDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: false },
    updatedBy: { type: String, required: false },
    timestamps: { createDate: Date, updatedDate: Date }
}
);

export const UserModel: Model<IUser> = model<IUser>('users', UserSchema);