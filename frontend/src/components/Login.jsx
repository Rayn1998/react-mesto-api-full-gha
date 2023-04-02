import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const Login = ({loggedIn, onSubmit}) => {
  const [formValues, setFormValues] = useState({email: '', password: ''})

  const handleChangeValues = (e) => {
    setFormValues(oldValues => ({
      ...oldValues, 
      [e.target.name]: e.target.value 
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(formValues.password, formValues.email)
  }

  if (loggedIn) {
  return <Redirect to='/' />
  }

  return (
    <>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2 className='auth-form__title'>Вход</h2>
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
            autoComplete='on'
          />
          <input 
            className='auth-form__input'
            name='password'
            type='password'
            value={formValues.password}
            onChange={handleChangeValues}
            required
            placeholder='Password'
            autoComplete='on'
          />
        </div>
        <button 
          type='submit'
          className='auth-form__btn-submit'
        >
          Войти
        </button>
      </form>      
    </>
  );
};

export default Login