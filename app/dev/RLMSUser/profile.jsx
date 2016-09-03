import React from 'react';
import {render} from 'react-dom';
import Request from 'superagent';

class Profile extends React.Component{
    constructor(){
        super();
        this.state = {};
        this.UpdateInfo = this.UpdateInfo.bind(this);
        this.ChangePassword = this.ChangePassword.bind(this);
    }
    UpdateInfo(event)
    {
        var url = "http://localhost:3000/updateUserProfile";
        event.preventDefault();
        var a = document.getElementById("fName").value;
        var b = document.getElementById("lName").value;
        var c = document.getElementById("userName").value;
        var d = document.getElementById("email").value;
        var updateUser = this.state.data[0];
        if(a){
            updateUser.f_name = a;
        }
        if(b){
            updateUser.l_name = b;
        }
        if(c){
            updateUser.username = c;
        }
        if(d){
            updateUser.email = d;
        }


        Request.post(url).send(updateUser).end(()=>{

    })
        alert("Update Complete");
        
    }
    ChangePassword(event) {
        var url = "http://localhost:3000/updateUserProfile";
        event.preventDefault();
    var a = document.getElementById("password").value;
    var b = document.getElementById("password2").value;
    if (a===b && a != null) {
        var tempUser = this.state.data[0];
        tempUser.password = a;
        Request.post(url).send(tempUser).end(()=>{

        })
        document.getElementById("password").value = "";
        document.getElementById("password2").value = "";
        alert("Password Changed");
    }else{
        alert("passwords do not match. Please try again.");
    }
}
    componentWillMount(){
        var name = sessionStorage.getItem("username");
        var url="http://localhost:3000/getUser/"+name;
        Request.get(url).then(result =>{
            var json = JSON.parse(result.text);
            this.setState({data:json});
            console.log(this.state.data[0]);
        })
        var url2="http://localhost:3000/getLesson";
        Request.get(url2).then(result2 =>{
            var json2 = JSON.parse(result2.text);
            this.setState({batch:json2});
            console.log(this.state.batch[0]);
        })
    }

    render (){
        const center = {
            textAlign:'center'
        }
        const hr = {
            borderTop: '1px solid grey'
        }
        const left = {
            float:'left'
        }
        const newBtn ={
            width: '140px'
        }
        if(this.state.data && this.state.batch){
            var curriculum = this.state.data[0].batch.batchName.split("-")[2];
            if(curriculum === "NET"){
                curriculum = ".NET";
            }
            return (
                <div>
                    <div className="col-sm-2">
                        <label>Your Profile</label>
                        <br/>
                    </div>
                    <br/><br/>
                    <form className="form-horizontal" role="form">

                        <div className="form-group">

                            <label className="col-lg-2 control-label">First Name:</label>
                            <div className="col-lg-3">
                                <input className="form-control" id="fName" placeholder={this.state.data[0].f_name} type="text"/>
                            </div>


                            <label className="col-lg-2 col-lg-offset-1 control-label">Last name:</label>
                            <div className="col-lg-3">
                                <input className="form-control" id="lName" placeholder={this.state.data[0].l_name} type="text"/>
                            </div>
                        </div>


                        <div className="form-group">

                            <label className="col-lg-2 control-label">Username:</label>
                            <div className="col-lg-3">
                                <input className="form-control" id="userName" placeholder={this.state.data[0].username} type="text"/>
                            </div>

                            <label className="col-lg-2 col-lg-offset-1 control-label">Email:</label>
                            <div className="col-lg-3">
                                <input className="form-control" id="email" placeholder={this.state.data[0].email} type="text"/>
                            </div>
                        </div>


                        <div className="col-lg-1 col-lg-offset-8">
                            <button className="btn btn-success" onClick={this.UpdateInfo} style={newBtn}>Update Info</button>
                        </div>
                    </form>
                    <br/>
                    <hr style={hr}/>
                    <br/>
                    <div>
                        <div className="col-sm-2">
                            <label>Password</label>

                        </div>
                        <br/>
                        <br/>
                        <form className="form-horizontal" role="form">

                            <div className="form-group">

                                <label className="col-lg-2 control-label">New Password</label>
                                <div className="col-lg-3">
                                    <input className="form-control" id="password" type="password"/>
                                </div>
                                <label className="col-lg-3 control-label">Re-enter Password</label>
                                <div className="col-lg-3">
                                    <input className="form-control" id="password2" type="password"/>
                                </div>
                            </div>
                            <div className="col-lg-1 col-lg-offset-8">
                                <button className="btn btn-success" onClick={this.ChangePassword} style={newBtn}>Change Password</button>
                            </div>
                        </form>
                        <br/>
                        <hr style={hr}/>
                    </div>
                    <div>
                        <div className="col-sm-4 col-md-offset-4">
                            <label>Your Training Information</label>
                        </div>
                    </div>
                    <br/><br/>
                    <div>
                        <div className="col-lg-7">
                            <label className="col-lg-7">Current Batch: {this.state.data[0].batch.batchName}</label>
                        </div>
                        <div className="col-lg-3  col-lg-offset-2">
                            <label clasName="col-lg-3">Curriculum: {curriculum}</label>
                        </div>
                        <br/>  <br/>
                    </div>
                </div>
            )
        }
        else if(this.state.data && !this.state.batch){
            return (
                <div>
                    <div className="col-sm-2">
                        <label>Your Profile</label>
                        <br/>
                    </div>
                    <br/><br/>
                    <form className="form-horizontal" role="form">

                        <div className="form-group">

                            <label className="col-lg-2 control-label">First Name:</label>
                            <div className="col-lg-3">
                                <input className="form-control" id="fName" placeholder={this.state.data[0].f_name} type="text"/>
                            </div>


                            <label className="col-lg-2 col-lg-offset-1 control-label">Last name:</label>
                            <div className="col-lg-3">
                                <input className="form-control" id="lName" placeholder={this.state.data[0].l_name} type="text"/>
                            </div>
                        </div>


                        <div className="form-group">

                            <label className="col-lg-2 control-label">Username:</label>
                            <div className="col-lg-3">
                                <input className="form-control" id="userName" placeholder={this.state.data[0].username} type="text"/>
                            </div>

                            <label className="col-lg-2 col-lg-offset-1 control-label">Email:</label>
                            <div className="col-lg-3">
                                <input className="form-control" id="email" placeholder={this.state.data[0].email} type="text"/>
                            </div>
                        </div>


                        <div className="col-lg-1 col-lg-offset-8">
                            <button className="btn btn-success" onClick={this.UpdateInfo} style={newBtn}>Update Info</button>
                        </div>
                    </form>
                    <br/>
                    <hr style={hr}/>
                    <br/>
                    <div>
                        <div className="col-sm-2">
                            <label>Password</label>

                        </div>
                        <br/>
                        <br/>
                        <form className="form-horizontal" role="form">

                            <div className="form-group">

                                <label className="col-lg-2 control-label">New Password</label>
                                <div className="col-lg-3">
                                    <input className="form-control" id="password" type="password"/>
                                </div>
                                <label className="col-lg-3 control-label">Re-enter Password</label>
                                <div className="col-lg-3">
                                    <input className="form-control" id="password2" type="password"/>
                                </div>
                            </div>
                            <div className="col-lg-1 col-lg-offset-8">
                                <button className="btn btn-success" onClick={this.ChangePassword} style={newBtn}>Change Password</button>
                            </div>
                        </form>
                        <br/>
                        <hr style={hr}/>
                    </div>
                    <div>
                        <div className="col-sm-4 col-md-offset-4">
                            <label>Your Training Information</label>
                        </div>
                    </div>
                    <br/><br/>
                    <div style={center}>
                        <h1>You are not assigned to a batch!</h1>
                        <br/>
                        <h4>If you are receiving this message in error, please contact your trainer.</h4>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div style={center}>
                    <h2>Failed to load data.</h2>
                    <h4>Please contact and administrator if you are seeing this message</h4>
                </div>
                )


        }
    }
}

export default Profile;
