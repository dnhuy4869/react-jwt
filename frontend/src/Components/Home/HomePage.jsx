import { useEffect } from "react";
import { getAllUsers } from "../../redux/apiRequest";
import { useDispatch, useSelector } from 'react-redux';
import "./home.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const user = useSelector(state => state.auth.login?.currentUser);
  const userList = useSelector(state => state.user.users?.allUsers);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch);
    }
  }, []);

  const handleDelete = (id) => {

  }

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">{`Your role is: ${user?.admin ? 'Admin' : 'User'}`}</div>
      <div className="home-userlist">
        {userList?.map((user, index) => {
          return (
            <div className="user-container" key={index}>
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={() => handleDelete(user._id)}> Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
