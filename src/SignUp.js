import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const [newUser, setNewUser] = useState(
    {user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const navigate = useNavigate();

  function handleChange(event) {
    const {name, value} = event.target
      setNewUser(prevNewUser => {
          return {
            ...prevNewUser,
            [name] : value
          }
      }
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("signing in")
    axios.post("http://localhost:3000/users", newUser)
    .then((response) => {
      console.log(response.data);
      navigate("/")
    })
  };

  return(
    <form className='login_form' onSubmit={handleSubmit}>
      <input
        type="text"
        value={newUser.user_name}
        placeholder="Username"
        name="user_name"
        onChange={handleChange}
      /><br/>
      <input
        type="text"
        value={newUser.first_name}
        placeholder="First Name"
        name="first_name"
        onChange={handleChange}
      /><br/>
      <input
        type="text"
        value={newUser.last_name}
        placeholder="Last Name"
        name="last_name"
        onChange={handleChange}
      /><br/>
      <input
        type="text"
        value={newUser.email}
        placeholder="Email"
        name="email"
        onChange={handleChange}
      /><br/>
      <input
        type="password"
        value={newUser.password}
        placeholder="password"
        name="password"
        onChange={handleChange}
      /><br/>
      <input
        type="password"
        value={newUser.password_confirmation}
        placeholder="Confirm Password"
        name="password_confirmation"
        onChange={handleChange}
      /><br/>
      <button className="login_btn" type="submit">Sign up</button>
    </form>
  );

}