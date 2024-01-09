import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { Dispatch, FormEvent, SetStateAction } from "react";

function Login({setLoginState, auth}: {setLoginState: Dispatch<SetStateAction<boolean>>,auth: Auth}) {
  function handleSubmit(event : FormEvent) {
    event.preventDefault();
    const {email, password} = document.forms[0];
    signInWithEmailAndPassword(auth,email.value,password.value).then((userCred)=>{
      const user = userCred.user;
      if (user) {
        setLoginState(true);
      }
    }).catch((reason)=>{
      setLoginState(false);
    });
    return true;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor='email'>Email:</label>
                <input type="text" id="email" name="email" required/>
            </div>
            <div className="input-group">
                <label htmlFor='password'>Password:</label>
                <input type="password" id="password" name="password" required/>
            </div>
            <button type="submit" >Login</button>
      </form>
    </>
  )
}

export default Login;