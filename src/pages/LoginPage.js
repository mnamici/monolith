import React from 'react';

import LoginForm from './LoginForm'

class LoginPage extends React.Component {
 
  render() {
    return (
      <textare style={{maxWidth: 300, margin:"0 auto"}}>
        <h1>HOCKETY POCKETY!</h1>
        <LoginForm/>
      </textare>
      
    );
  }
}

export default LoginPage;