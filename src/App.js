import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import SignUp from './SignUp';
import Property from './Property';


function App() {
  const [properties, setProperties] = useState([])
  const [user, setUser] = useState( {
    email: "",
    password: ""
  });
  const [currentUser, setCurrentUser] = useState( {
    email: "",
    userName: "",
    id: ""
  });
  

  useEffect(() => {
    axios.get("http://localhost:3000/properties")
    .then(res => setProperties(res.data))
    }, []
  );

  // Save info as user is logging in
  function handleChange(event) {
    const {name, value} = event.target
      setUser(prevUser => {
          return {
            ...prevUser,
            [name] : value
          }
      }
    );
  };

  // Log in user 
  function handleSubmit(e) {
    e.preventDefault();
    console.log("signing in")
    axios.post("http://localhost:3000/sessions", user)
    .then((response) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
      localStorage.setItem("jwt", response.data.jwt);
      console.log(response.data);
      setCurrentUser( {
        email: response.data.email,
        userName: response.data.user_name,
        id: response.data.id
      });
    })
  };

  // format or properties shown on page
  const propertyDisplay = properties.map(property => {
    return(
      <div key={property.id}>
        <h2>{property.title}</h2>
        <h4>{property.address}</h4>
        <h4>{property.description}</h4>
        <Link
          to={`/properties/${property.id}`}
          element={<Property />}
        >More Info</Link>
        <hr/>
      </div>
    )
  });

  return (
    <div className="App">
      <header className="App-header">
        {/* Login form for current users */}
        <form className='login_form' onSubmit={handleSubmit}>
          <input
            type="text"
            value={user.email}
            placeholder="email"
            name="email"
            onChange={handleChange}
          /><br/>
          <input
            type="password"
            value={user.password}
            placeholder="password"
            name="password"
            onChange={handleChange}
          /><br/>
          <button className="login_btn" type="submit">Login</button>
        </form>
        <Link
          to="/signup"
          element={<SignUp />}
        >
          Sign up here
        </Link>
        {/* Temporary placeholder, later displauy username when logged in */}
        <h1>{currentUser.userName ? `${currentUser.userName} logged in` : "Nobody logged in"}</h1>
        <hr/>
        <hr/>
        {/* Properties to rent */}
        {propertyDisplay}
      </header>
    </div>
  );
}

export default App;
