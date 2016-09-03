import React from 'react';
import {render} from 'react-dom';
import Request from 'superagent';

class LoginApp extends React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  reg: function(){
    this.context.router.push('/signUp');
  },
  btnAlign:{
    marginTop: '1em'
  },

  componentWillMount(){
    sessionStorage.clear();
  },
  render(){
    return (
      <div className="text-center">
        <LoginForm data={this.reg} st={this.btnAlign}/>
      </div>      
      );
  }
}){}

const LoginForm = (props) =>{
  return (
    <div className="row col-sm-6 col-sm-offset-3" id="registerDiv">
    <span className="text-center">
    <h2>Login</h2>
    
    <form action="/api/login" method="post">
      <label>Username: </label>
      <input type="text" className="form-control col-sm-4" name="username" id="username"></input><br/>
      <label>Password: </label>
      <input type="password" className="form-control col-sm-6" name="password" id="password"></input><br/>
      <button type="submit" className="btn btn-primary col-sm-4" style={props.st}>LogIn</button>
      <button type="button" className="btn btn-info col-sm-4 pull-right" onClick={props.data} style={props.st}>Sign Up</button>
      </form>
      </span>
    </div>
  );
}

export default LoginApp;

if(module.hot){
  module.hot.accept();
}