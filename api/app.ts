import * as bodyParser from "body-parser";
const path = require('path');
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import { UserController } from "./controller/user.controller";
import swaggerUi = require('swagger-ui-express');
import fs = require('fs');
import { StatusCodes } from 'http-status-codes';

class App {

    public express: express.Application;
    public logger: APILogger;
    public userController: UserController;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new APILogger();
        this.userController = new UserController();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(path.join(__dirname, '../ui/build')));
    }

    private routes(): void {

        this.express.get('/api/users', async (req, res) => {
            try {
                const result = await this.userController.getUsers();
                res.status(StatusCodes.OK).json(result);
            }
            catch (error) {
                res.status(StatusCodes.SERVICE_UNAVAILABLE).json(error);
            }
        });

        this.express.post('/api/user', async (req, res) => {
            try {
                const result = await this.userController.createUser(req.body.user);
                res.status(StatusCodes.OK).json(result);
            }
            catch (error) {
                res.status(StatusCodes.BAD_REQUEST).json(error);
            }
        });

        this.express.put('/api/user', (req, res) => {
            this.userController.updateUser(req.body.user).then(data => res.json(data));
        });

        this.express.delete('/api/user/:id', (req, res) => {
            this.userController.deleteUser(req.params.id).then(data => res.json(data));
        });

        this.express.get("/", (req, res, next) => {
            res.sendFile(path.join(__dirname, '../ui/build/index.html'));
        });

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Url is incorrect");
        });
    }
}

export default new App().express;