import React from 'react';
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import Request from 'superagent';

//local vars for testing code
var res;

var Exam = React.createClass({
    /*properties
     * input= Holding entire test
     */

    getInitialState: function() {
        return {totalscore : 0, testSubmitted: false, q:"", loadstatus:0, showModal:false};

    },
    handleChange: function(result) {
        this.setState({totalscore: result.totalscore, testSubmitted: true, showModal:true});
    },

    //api call
    getExam(){
        this.setState({loadstatus:30});
        this.setState({loadstatus:80});
        var url = 'http://localhost:3000/getExam';
        Request.get(url).then(result =>{

            res = JSON.parse(result.text);
            var batch = sessionStorage.getItem('batchName');

            //depending on batch get corresponding test
            //[0] = C#
            //[1] = Java
            if (batch.includes("NET")) {
                this.setState({q: res[0]});}
            if(batch.includes("Java")){
                this.setState({q: res[1]});}

        });
    },

    close(){
        //submit to score to DB
        var tpts = 0;
        this.state.q.questions.map(question => tpts += question.weight);
        var grade = Math.round(this.state.totalscore*100/tpts);
        let postUrl = 'http://localhost:3000/postExam';
        var usergrade = {
            username:sessionStorage.getItem("username"),
            grade:grade
        };

        console.log(usergrade);
        Request.post(postUrl).send(usergrade).end(function(err,res){
            if(err){console.log(err)}
        });

        this.setState({showModal:false});
        tpts=0;
    },

    componentWillMount(){
        this.getExam()
    },

    render: function(){
        var totalPoints=0;
        if(this.state.q){
            this.state.q.questions.map(question => totalPoints += question.weight);
            return(
                <div>
                    <h1 className="examHeader ">Exam for {this.state.q.topic}</h1>
                    <hr/>
                    {/*<ProgressBar active now={question answered/this.props.input.questions.length*100}/>*/}
                    <table className="table-bordered">
                        <tbody>
                        <tr>
                            <td className="col-md-9">
                                <QuestionList questions={this.state.q.questions} onSubmitted={this.handleChange}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <Modal show={this.state.showModal}>
                        <Modal.Header  closeButton>
                            <Modal.Title>Score Summary</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Report score={this.state.totalscore} testSubmitted={this.state.testSubmitted}
                                    percentage={Math.round(this.state.totalscore*100/totalPoints)} tpoints={totalPoints}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            );
        }
        else{
            return(<ProgressBar active now={this.state.loadstatus}/>);
        }

    }
});

var QuestionList = React.createClass({
    /*properties
     /questions = list of questions
     /onSubmitted = bool if test has been submitted
     */
    getInitialState: function() {
        return {totalscore : 0};
    },
    handleChange: function(score) {
        this.setState({totalscore: this.state.totalscore + score});
    },
    handleSubmitted: function(event) {
        var result = {totalscore: this.state.totalscore};
        this.props.onSubmitted( result );
        clearInterval(this.interval);
    },


    render: function(){
        var questionAnswers = this.props.questions.map(function(question,i){
            return(
                <tr key={i}><td className="ques">
                    <Question number={question.id} question={question.ques} options={question.options}
                              answer={question.ans} weight={question.weight}
                              onAnswered={this.handleChange}/></td></tr>
            );
        }, this);
        return(
            <div>
                <table className="table">
                    <tbody>{questionAnswers}</tbody></table>
                <div><input type="button" className="btn btn-success btn-lg center-block"
                            value="Submit" onClick={this.handleSubmitted}/></div>
            </div>

        );
    }
});

var Question = React.createClass({
    /*properties
     /question = question
     /number = number of question in list
     /options = array of answers for the question
     /answer = correct answer
     /weight = weight of questions
     /onAnswered = event in QuestionListClass that passes in score
     */

    getInitialState: function() {
        return {
            correctAnswerRecorded: false,
            negativeAnswerRecorded: false,
            tempAnswer:"",
            glyph:"glyphicon glyphicon-remove",
            btn:"btn btn-danger btn-xs",
            alert:"alert alert-danger"
        };
    },

    //logic for keeping score of question
    handleChange: function(event) {
        let score = 0;
        this.state.tempAnswer = event.target.value;
        this.state.glyph="glyphicon glyphicon-ok";
        this.state.btn="btn btn-success btn-xs pull-right";
        this.state.alert="alert alert-info";

        //check if selected answer is correct
        if( event.target.value == this.props.answer) {
            //first response
            if( this.state.correctAnswerRecorded === false ) {
                //keep score the same
                score = this.props.weight;
            }

            this.state.correctAnswerRecorded = true;
            this.state.negativeAnswerRecorded = false;
        } else {
            //deviate from correct
            if( this.state.correctAnswerRecorded === true ) {
                score = -this.props.weight;
            }
            this.state.negativeAnswerRecorded = true;
            this.state.correctAnswerRecorded = false;
        }
        //pass in score to scoreboard exam
        this.props.onAnswered(score);
    },
    render: function(){
        //set input element name
        var qname = "option" + this.props.number;
        //return radio buttons with answers
        var qoptions = this.props.options.map(function(option,i){
            return (
                //display answers of question
                <div className="option" key={i}><label for={qname}><input type="radio" name={qname}  value={option.text} onChange={this.handleChange}/>
                    {option.text}</label></div>
            );
        }, this);
        return(
            <div className="list-group-item">
                {/*display questions*/}

                <div><strong>Question {this.props.number}</strong>: {this.props.question}<spam className="badge pull-right">Points: <strong>{this.props.weight}</strong></spam></div>
                {/*display answers*/}
                <div>{qoptions}</div>
                <br/>
                <div className={this.state.alert} role="alert">
                    <p>Answer saved: <strong><i>{this.state.tempAnswer}</i></strong>
                    <button type="button" className={this.state.btn} disabled>
                    <span className={this.state.glyph}></span>
                    </button></p>
                </div>

            </div>
        );
    }
});

var Report = React.createClass({
    /*properties
     /score = summation of weight
     /testSubmitted = bool if test submitted
     /percentage = score/total points points
     /tpoints = total points possible
     */

    render: function(){
        var status = "Test not submitted!";
        if( this.props.testSubmitted == true ) {
            if( this.props.percentage < 70 ) {
                status = "Sorry, you did not pass the test."
            } else {
                status = "Congratulations!! You passed the test.";
            }
        }
        return(
            <div className="list-group">
                <div className="list-group-item list-group-item-success">Score: <strong>{this.props.score} out of {this.props.tpoints}</strong></div>
                <div className="list-group-item list-group-item-info">Percentage: <strong>{this.props.percentage}&nbsp;%</strong></div>
                <div className="list-group-item list-group-item-danger">Status: <strong>{status}</strong></div>
            </div>
        );
    }
});

export default Exam;
