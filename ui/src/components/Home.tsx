import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Header from './Header'
import CreateUser from './CreateUser'
import { UserService } from '../services/UserService'
import Users from './Users';

function Home() {

  const [users, setUsers] = useState([])
  const [numberOfUsers, setNumberOfUsers] = useState<number>(0)
  const [isUserEdited, setUserEdited] = useState(false)

  const userService = new UserService();

  useEffect(() => {
    userService.getAllUsers().then(users => {
      console.log(users)
      setUsers(users)
    });
  }, [numberOfUsers, isUserEdited])


  function delUser(userId: number) {
    userService.deleteUser(userId).then(response => {
      console.log(response)
      setNumberOfUsers(numberOfUsers - 1)
    });
  }

  function userCreated() {
    setNumberOfUsers(numberOfUsers + 1)
  }

  function userEdited(res: any) {
    setUserEdited(res)
  }

  return (
    <div className="App">
      <Header></Header>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <CreateUser users={users} userCreated={userCreated}></CreateUser>
          </div>
          <div className="col-md-6">
            <Users users={users} deleteUser={delUser} userEdited={userEdited}></Users>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
