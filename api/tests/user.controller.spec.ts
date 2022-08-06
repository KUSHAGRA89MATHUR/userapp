// UserController.test.ts
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";
jest.mock('mongoose', () => ({
  createConnection: jest.fn().mockImplementation(
    (uri:any, options:any)=>({} as any)
    ),
  Connection: jest.fn(),
  Schema: jest.fn(),
  model: jest.fn(),
  connect: jest.fn(),
  connection:{
    once:jest.fn(),
    on:jest.fn(),

  },
}))

describe("UserController", () => {
  describe("getUsers",() => {
    test("should return empty list of users", async () => {
      const spy = jest
        .spyOn(UserService.prototype, "getUsers")
        .mockResolvedValueOnce([]);
      const controller = new UserController();
      const users = await controller.getUsers();
      expect(users).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
  });
});

// describe('UserController', () => {
//   let controller: UserController;
//   let service: jest.Mocked<UserService>;
//   let repository: jest.Mocked<UserRepository>;

//   let request: Request;
//   let response: Response;

//   beforeEach(() => {

//     response = {
//       send: jest.fn().mockReturnThis(),
//       status: jest.fn().mockReturnThis(),
//     } as any;

//     service = {
//       getUsers: jest.fn(),
//       createUser: jest.fn(),
//       updateUser: jest.fn(),
//       deleteUser: jest.fn(),
//       userRepository: {
//         // logger: {
//         //   error: jest.fn(),
//         //   info: jest.fn()
//         // },
//         getUsers: jest.fn(),
//         createUser: jest.fn(),
//         updateUser: jest.fn(),
//         deleteUser: jest.fn(),

//       } as any
//     } as any; // an instance of the service
//     mocked(UserService).mockImplementation(() => {
//       return service;
//     }); // mock the service constructor to return our mocked instance

//     controller = new UserController();
//   });

//   it('should response with user object when service returns the user', async () => {
//     const user: IUser = {firstname:'',lastname:'',email:''} as any;
//     service.getUsers.mockResolvedValue([user]);

//     await controller.getUsers();

//     expect(response.send).toHaveBeenCalledWith(user);
//     expect(service.getUsers).toHaveBeenLastCalledWith();
//   });

// });