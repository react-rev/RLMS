import React from 'react';
import {render} from 'react-dom';
import Request from 'superagent';
var res;

var Curriculum = React.createClass({
    getInitialState () {
        return {};
    },
    componentWillMount() {
        if(sessionStorage.getItem('batchName')){
            console.log('made request');
            //pull batchName from storage
            var b = sessionStorage.getItem('batchName').split('-')[2];
            if(b=="NET"){
                b=".NET";
            }
            //request lesson for batch
            var url = 'http://localhost:3000/getLesson/' + b;    
            this.serverRequest = Request.get(url).end(function(err,result){
                this.setState({
                    data:JSON.parse(result.text)
                });       
            }.bind(this));
       }
    },    
    render () {
        //if data not initialized, assume not assigned to batch
        if(this.state.data == null || this.state.data == undefined){
            return(
                <div className="text-center">
                    <h1>You are not assigned to a batch!</h1>
                    <p>If you're recieving this message in error, please contact your trainer.</p>
                </div>
            ) 
        }
        //else render Lesson
        else if(sessionStorage.getItem('batchName')){
            console.log('made it here');
           var hstyle = {'text-align':'center'};
            return(
                <div>
                    <h1 style={hstyle}>{this.state.data[0].curriculum}</h1>
                    {this.state.data.map(function(name, index){
                        var s = JSON.stringify(name.topic)
                        return <div >
                            <h3>Week {name.week}: {name.lessonName} </h3>
                            <Lesson framework={s}/>
                            <hr/>
                            </div>;
                    })}
                </div>
            );
        }
        else{
            return(
                <div className="text-center">
                    <h1>You are not assigned to a batch!</h1>
                    <p>If you're recieving this message in error, please contact your trainer.</p>
                </div>
            )            
        }
    }
});



var Lesson = React.createClass({
    render () {
        //render table with lessons 
        var s = JSON.parse(this.props.framework);
        return <table className="table table-bordered table-striped table-condensed">
        <thead>
            <tr>
                <th>Framework</th>
                <th>Keywords</th>
            </tr>
            </thead>
            <tbody>
            {s.map(function(name, index){
                return <tr> <td>{name.title}</td> <td>{name.keywords}</td></tr>;
            })}
            </tbody>
         </table> ;
    }
});


if (module.hot) {
    module.hot.accept();
}

export default Curriculum
