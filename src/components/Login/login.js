import React from "react";
import { Formik, Form, Field } from "formik";
import s from './login.module.css'
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";

const validateLogin = (value) => {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }
  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = 'Required';
  } 
  return error;
}

const LoginForm = (props) => (
    
    <Formik
        initialValues = {{
            email: '',
            password: '',
            captcha: ''

        }}
        onSubmit = { (values)  => {
            props.onSubmitForm(values);
           
        }
        }
    >

        {(formik) => (
        <Form>
            <div>
            <label>Login</label>
            <Field className={formik.errors.email && formik.touched.email && s.errorsInput} name='email' component='textarea' placeholder='email' validate={validateLogin} />
            {formik.errors.email && formik.touched.email && <div className={s.errorText} > {formik.errors.email} </div>}
        </div>
            <div>
            <label>Password</label>
            <Field className={formik.errors.password && formik.touched.password && s.errorsInput} type='password' name='password' component='input' placeholder='password' validate = {validatePassword} />
            {formik.errors.password && formik.touched.password && <div className={s.errorText}>{formik.errors.password}</div>}
            </div>
            <div>
            <label>remember me</label>
            <Field name='rememberMe' type='checkbox' />
            </div>
            {props.captchaURL && <img src={props.captchaURL} /> }
            {props.captchaURL && <Field name='captcha' component='input' placeholder='Symbols from image' /> }
            <div><button type='submit'>Login</button></div>
            {/* <div>
        {formik.status ? <span>{formik.status}</span>: null}
            </div> */}
        </Form>
        )}
        
        </Formik>
)

const Login = (props) => {
    const onSubmitForm = (values) => {
        props.login(values.email, values.password, values.rememberMe, values.captcha)
    }
    if(props.isAuth) {
        return (<Navigate to='/profile' />)
    }
    return (<div>
        <h1>Login</h1>
    <LoginForm onSubmitForm={onSubmitForm} captchaURL={props.captchaURL}/>
    </div>)
}
const mapStateToProps =(state) => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL
})

export default connect(mapStateToProps, {login})(Login);