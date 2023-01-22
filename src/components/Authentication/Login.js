
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase-config';
function Login({ onAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[name,setName]= useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // localStorage.setItem("Login",true);
    // localStorage.setItem("Name",name);

    try{const user= await createUserWithEmailAndPassword(auth,email,password);
      console.log(user);
    }catch(error){
      console.log(error.message);
    }
  
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    // localStorage.setItem("Login",true);
    // localStorage.setItem("Name",name);

    try{const user= await signInWithEmailAndPassword(auth,email,password);
      console.log(user);
    }catch(error){
      console.log(error.message);
    }
  
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit" onClick={handleSubmit}>Sign up</button>
      <button onClick={loginHandler}>Log In</button>
      {error && <div>Error: {error}</div>}
    </form>
  );
}

export default Login;
