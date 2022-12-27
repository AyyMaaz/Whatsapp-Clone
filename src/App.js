// theme 
// realtime
// emojis
// MdImageSearch
// delete msg
// search msgs
// msg Sound
// online offline

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import ChatPage from "./components/ChatPage";
import { useState } from "react";
import Login from "./components/Login";
import { auth } from "./firebase";
// import emojis from "emoji-picker-react/dist/data/emojis";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const signOut = () => {
    alert('Are u sure u want to logout')
    auth
      .signOut()
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((err) => alert(err.message));
  };
  
  return (
    <Router>
      <div className="App">
        {user ? (
          <Routes>
            <Route
              path="/:emailID"
              element={<ChatPage currentUser={user} signOut={signOut} />}
            />
            <Route
              path="/"
              element={<Home currentUser={user} signOut={signOut} />}
            />
          </Routes>
        ) : (
          <Login setUser={setUser} currentUser={user}/>
        )}
      </div>
    </Router>
  );
}

export default App;