import "./Login.css";
import Button from "./../../atoms/Button/Button";
import { Link } from "react-router-dom";
import Logo from "../../atoms/Logo/Logo";
import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

const Login = () => {
  const [formData, setFormData] = useState({
    password: '',
    email: ''
  });
  const [formError, setFormError] = useState({
    password: '',
    email: ''
  })
  const {loginUser, isLogging} = useAuthStore();

  const setFieldValue = (event) => {
    setFormData(data => ({...data,[event.target.name]: event.target.value}));
  }

  const validateForm= (event) =>{
    if(!formData.password.length && event && event?.target?.name === 'password'){
      setFormError(data => ({...data, password: 'Please Enter Password'}));
    }
    if(!formData.email.length && event && event.target.name === 'email'){
      setFormError(data => ({...data, email: 'Please Enter email'}));
    }
    return true;
  }

  const submitForm = () => {
    if(!validateForm()){
      return
    }
    loginUser(formData);
  }

  return (
    <div className="auth-container">
      <div className="main-container">
        <div className="form-container">
          <div className="brand-login">
              <Logo width="50" height="50"/>
              <h1 className="text">Welcome Back</h1>
              <h2 className="sub-text">Sign in to your account</h2>
          </div>
          <div className="form-group">
            <label className="sub-sub-text" htmlFor="email">Email</label>
            <input type="text" name="email" value={formData.email} placeholder="Enter email ID"
            onChange={setFieldValue}
            onBlur={validateForm}/>
            <span className="error">{formError.email}</span>
          </div>
          <div className="form-group">
            <label className="sub-sub-text" htmlFor="">Password</label>
            <input type="password" name="password" value={formData.password} placeholder="Enter password"
            onChange={setFieldValue}
            onBlur={validateForm} />
            <span className="error">{formError.password}</span>
          </div>
          <div className="btn-submit">
            <Button btnClick={submitForm} isLoading={isLogging} text="Login"/>
          </div>
          <div className="no-account">
            Don't have a account? <Link to="/signup">Create account</Link>
          </div>
        </div>
      </div>
      <div className="info-container">
       
      </div>
    </div>)
}      

export default Login;
