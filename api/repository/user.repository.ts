import { connect, disconnect } from "../config/db.config";
import { IUser, UserModel } from '../model/user.model';
import { APILogger } from '../logger/api.logger';
import { StatusCodes } from 'http-status-codes';
import { Error } from "mongoose";
import { MongoError } from "mongodb";

export class UserRepository {

    private logger: APILogger;

    constructor() {
        connect();
        this.logger = new APILogger()
    }

    async getUsers() {

        try {
            const users:IUser[] = await UserModel.find({}).sort({ 'createDate': -1 });
            return users;
        }
        catch (err) {
            throw err;
        }
    }

    async createUser(user: IUser) {
        let data = {};
        try {
            const userExist = await UserModel.count({
                email: user.email
            });
            if (userExist > 0) {
                throw new Error("The user has already been added.")
            }
            else {
                data = await UserModel.create(user);
                return data;
            }
        }
        catch (err) {
            throw err;
        }
    }

    async updateUser(user) {
        let data = {};
        try {
            data = await UserModel.updateOne(user);
        } catch (err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async deleteUser(userId) {
        let data: any = {};
        try {
            data = await UserModel.deleteOne({ _id: userId });
        } catch (err) {
            this.logger.error('Error::' + err);
        }
        return { status: `${data.deletedCount > 0 ? true : false}` };
    }
}