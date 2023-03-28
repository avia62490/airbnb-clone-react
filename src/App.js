import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function App() {
  const [properties, setProperties] = useState([])
  const [user, setUser] = useState(
    {email: "",
    password: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/properties")
    .then(res => setProperties(res.data))
    }, []
  );

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

  function handleSubmit(e) {
    e.preventDefault();
    console.log("signing in")
    axios.post("http://localhost:3000/sessions", user)
    .then((response) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
      localStorage.setItem("jwt", response.data.jwt);
      console.log(response.data);
      setIsLoggedIn(true);
    })
  }


  const propertyDisplay = properties.map(property => {
    return(
      <div key={property.id}>
        <h1>{property.title}</h1>
        <h1>{property.address}</h1>
        <h1>{property.description}</h1>
        <hr/>
      </div>
    )
  })

  return (
    <div className="App">
      <header className="App-header">
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
        <h1>{isLoggedIn ? "User logged in" : "Nobody logged in"}</h1>
        <hr/>
        <hr/>
        {propertyDisplay}
      </header>
    </div>
  );
}

export default App;
