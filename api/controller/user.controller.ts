import { APILogger } from '../logger/api.logger';
import { UserService } from '../service/user.service';

export class UserController {

    private userService: UserService;
    private logger: APILogger;

    constructor() {
        this.userService = new UserService();
        this.logger = new APILogger()
    }

    async getUsers() {
        this.logger.info('Controller: getUsers', null)
        return await this.userService.getUsers();
    }

    async createUser(user) {
        this.logger.info('Controller: createUser', user);
        return await this.userService.createUser(user);
    }

    async updateUser(user) {
        this.logger.info('Controller: updateUser', user);
        return await this.userService.updateUser(user);
    }

    async deleteUser(userId) {
        this.logger.info('Controller: deleteUser', userId);
        return await this.userService.deleteUser(userId);
    }
}