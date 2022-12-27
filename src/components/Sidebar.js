import "./Sidebar.css";
import UserProfile from "./UserProfile";
import { FaSistrix } from "react-icons/fa";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { RiMessage2Fill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";


function Sidebar({ currentUser, signOut }) {

  const [allUsers, setAllUsers] = useState([]);
  const [searchUsers, setsearchUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  
  
  useEffect(() => {
    const getAllUsers = async () => {
      const user = collection(db, 'users')
      const snapshot = await getDocs(user)
      setAllUsers(snapshot.docs.map((doc) => doc.data()));


    };


    getAllUsers();
  }, [currentUser.email])

 




  useEffect(() => {

    const searchedUser = () => {
      allUsers.filter((user) => {
      return user.fullname.toLowerCase().includes(searchInput.toLowerCase()) && setsearchUsers([user])
     


      }


      );
    }
    searchedUser()

  }, [searchInput])



  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-img" >
          <img src={currentUser.photoURL} alt="" />
        </div>
        <div className="sidebar-header-btn">
          <BsThreeDotsVertical size='23px' color='grey' />
          <RiMessage2Fill size='23px' color='grey' />
          <FcGoogle size='30px' onClick={signOut} />
        </div>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-search-input">
          <FaSistrix style={{ margin: 10 }} color='grey' />
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            name="search"
            placeholder="Search..."
            value={searchInput}


          />
        </div>
      </div>

      <div className="sidebar-chat-list">
        {searchInput === '' ?
          allUsers.map((user) => {
            return (
              <UserProfile
                name={user.fullname}
                photoURL={user.photoURL}
                email={user.email}
              />
            );
          }) : searchUsers.map((user) => {
            return (
              <UserProfile
                name={user.fullname}
                photoURL={user.photoURL}
                email={user.email}
              />
            );
          })
        }
      </div>
    </div>
  );
}

export default Sidebar;