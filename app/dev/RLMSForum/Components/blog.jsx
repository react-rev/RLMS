import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import NewComment from './newComment.jsx';

var posts=[];
export default class Blog extends React.Component{
    constructor()
    {
        super();
        this.state={};

    }
    doStuff(stuff){

        var posts = this.state.data[0].posts;
        var now =  new Date();
        var min;
        if(now.getMinutes() <10)
        {

            min = "0" + now.getMinutes();
        }else{min =now.getMinutes()}
        var newPost = {
            username: sessionStorage.getItem('username'),
            comment: stuff,
            timestamp: now.getDay() + "/" +now.getMonth()+ '/' + now.getFullYear() + " " + now.getHours() + ":" + min
        };
        if(posts)
        {
            posts.unshift(newPost);
            this.state.data[0].posts = posts;
        }
        else{
            var tempArray =[];
            tempArray.push(newPost);
            var x = this.state.data[0].posts = tempArray;
        }

        Request.post('http://localhost:3000/postForum').send(this.state.data[0]).end(function(err,res){
            if(err){console.log(err)}
            
        });
        this.forceUpdate();

    }getForum(batchname)
    {

        var url = 'http://localhost:3000/getForum/'+batchname;
        console.log(url);
        Request.get(url).then(result =>{
                this.setState({data: JSON.parse(result.text)});
        });


}
    getUser(username){
        let url = "http://localhost:3000/getUser/" + username;
        console.log(url);
        let stuff = Request.get(url).then((result)=>{
            this.setState({batch:JSON.parse(result.text)[0].batch});

            sessionStorage.setItem('batchName',this.state.batch.batchName);
            this.getForum(this.state.batch.batchName);
            })


    }
    componentWillMount(){

        if(!sessionStorage.getItem("username")){
            const {query} = this.props.location;
            const {id} = query;
            console.log(id);
            sessionStorage.setItem("username",id);
        }
        this.getUser(sessionStorage.getItem("username"));


    }

    componentWillUnmount(){

    }
    render(){

        if(this.state.data){

            posts = this.state.data[0].posts;
            let blogs = this.state.data.map((item,i) =>
            {
                //console.log(item);
                if(posts) {
                    this.comments = item.posts.map((stuff, k) => {
                        return <Comment key={k} data={stuff}></Comment>
                    });
                }else {
                    console.log(item);
                }
                return(
                    <div className="col-sm-12 header">

                        <div id="headBar">
                            <h1 className="text-center">{item.batchName}</h1>
                        </div>

                        <hr/>
                        <p className="Desc">{item.description}</p>
                        <NewComment doStuff={this.doStuff.bind(this)}></NewComment>
                        <hr id="dividerComments"/>
                        <div className="commentBlock">
                            {this.comments}
                        </div>


                    </div>
                )
            });
            return(
                <div>
                    {blogs}
                </div>
            )
        }else{
            return(
                <div className="text-center">
                    <h1>You are not assigned to a batch!</h1>
                    <p>If you're recieving this message in error, please contact your trainer.</p>
                </div>
            )
        }
    }
}
const Comment = (props) => {

    return (
        <div className="comment">
            <div className="row  text-center ">
                <span id="status">
                    <p className="col-sm-6"><strong>{props.data.username}</strong></p>
                    <p className="col-sm-6 ">{props.data.timestamp}</p>
                </span>
            </div>
            <p className="text-center"><em>{props.data.comment}</em></p>
        </div>
    )

}
