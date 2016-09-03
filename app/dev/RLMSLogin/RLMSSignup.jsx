import React from 'react';
import {render} from 'react-dom';
import Request from 'superagent';

class SignUpApp extends React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  ret: function(){
    this.context.router.push('/login');
  },
  btnAlign:{
    marginTop: '1em'
  },
    
  componentWillMount(){
    sessionStorage.clear();
  },
  render(){
    return <RegisterForm data={this.ret} st={this.btnAlign}/>
  }
  
}){}

const RegisterForm = (props) =>{
  return (
    <div id="registerDiv" className="row col-sm-8 col-sm-offset-2">
    <span className="text-center">
    <h2>Sign Up</h2>
    
    <form action="/api/signup" method="post">
      <label>First Name: </label>
      <input type="text" className="form-control col-sm-6" name="firstname" id="firstname"></input><br/>
      <label>Last Name: </label>
      <input type="text" className="form-control col-sm-6" name="lastname" id="lastname"></input><br/>
      <label>Username: </label>
      <input type="text" className="form-control col-sm-6" name="username" id="username"></input><br/>
      <label>Password: </label>
      <input type="password" className="form-control col-sm-6" name="password" id="password"></input><br/>
      <label>Confirm Password:</label>
      <input type="password" className="form-control col-sm-6" name="cPass" id="cPass"></input><br/>
      <button type="submit" className="btn btn-primary col-sm-4" style={props.st}>Register</button>
      <button type="button" onClick={props.data} className="btn btn-danger col-sm-4 pull-right" style={props.st}>Cancel</button>
    </form>
    </span>
    </div>
  )
}

export default SignUpApp;

if(module.hot){
  module.hot.accept();
}