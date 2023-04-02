import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

const Register = ({onSubmit, registerOk}) => {
  const [formValues, setFormValues] = useState({email: '', password: ''})

  const handleChangeValues = (e) => {
    setFormValues(oldValues => ({
      ...oldValues, 
      [e.target.name]: e.target.value 
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formValues.password, formValues.email)
  }

  if (registerOk) {
    return <Redirect to='/' />
  }

  return (
    <>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2 className='auth-form__title'>Регистрация</h2>
        <div className='auth-form__fields-wrapper'>
          <input 
            className='auth-form__input'
            name='email'
            type='email' 
            value={formValues.email}
            onChange={handleChangeValues}
            required
            minLength='2'
            placeholder='Email'
          />
          <input 
            className='auth-form__input'
            name='password'
            type='password'
            value={formValues.password}
            onChange={handleChangeValues}
            required
            placeholder='Password'
          />
        </div>
        <button 
          type='submit'
          className='auth-form__btn-submit'
        >
          Зарегистрироваться
        </button>
      </form>      
        <p className='auth-form__registered'>Уже зарегистрированы? <Link to='/sign-in' className='auth-form__log-in'>Войти</Link></p>
    </>
  );
};

export default Register