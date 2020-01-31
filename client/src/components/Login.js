import React, {useState} from "react";
import axios from 'axios'

const Login = props => {
  const [user, setUser] = useState({
    username: '',
    password: ''
})
const handleChanges = e => {
   setUser({
       ...user, [e.target.name]: e.target.value
   })
}
const login = e => {
  e.preventDefault()
  axios.post('http://localhost:5000/api/login', user)
      .then(res => {
          localStorage.setItem('token', res.data.payload)
          props.history.push('/protected')
      })
      .catch(err => console.log(err))
}
  return (
    <div>
      <form onSubmit={(user => login(user))}>
        <input
          type='text'
          name='username'
          value={user.username}
          placeholder='username'
          onChange={(e => handleChanges(e))}
        />
        <input
          type='password'
          name='password'
          value={user.password}
          placeholder='password'
          onChange={(e => handleChanges(e))}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
