import React from 'react';
import {render} from 'react-dom';
import Request from 'superagent';
import ListComponent from './ListComponent.jsx';

export default class BatchManagement extends React.Component {
  constructor(){
    super();
    this.state = {
      userBatchData:[],
      batchHasAdmin:false,
      batchIsSelected:false,
      trainerData:null,
      batchData:null
    };
  }

  componentWillMount() {
    var url = 'http://localhost:3000/admin/getAllUsers';

    this.serverRequest = Request.get(url).end(function(err, result) {
      this.setState({
        data:JSON.parse(result.text)
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  updateBatchArray(event) {
    var exists = false;
    var self = this;

    var index = this.state.userBatchData.indexOf(event);
    var forIndex = 0;
    var dup = -1;

    if(event.username) {
      if(event.is_admin) {
        this.state.trainerData = event;
        this.state.batchHasAdmin = true;
      } else {
        if(index >= 0) {
          this.state.userBatchData.splice(index, 1);
        } else {
          this.state.userBatchData.push(event);
        }
      }
    } else {
      this.state.batchData = event;
      this.state.batchIsSelected = true;
    }
  }

  // var redirect = () => {
  //   this.context.router.push('/home/forum');
  // }

  postToDB() {
    var url = "/admin/updateBatchAndUsers";
    var json = JSON.stringify(this.state.userBatchData);
    //console.log(json);

    Request.post(url).send(this.state.userBatchData).end(function(err, res) {
      if(err) {
        console.log('good');
      } else {
        console.log('error');
      }
    });

    this.forceUpdate();

  }

  compileDataForPost() {
    if(this.state.trainerData && this.state.batchData){
      document.getElementById("create-batch-btn").disabled = true;

      var newState = this.state;

      this.state.userBatchData.push(this.state.trainerData);
      this.state.userBatchData.forEach( function(item) {
        item.batch = newState.batchData.batch;
      });
      //
      // var json = JSON.stringify(this.state.userBatchData);
      // console.log(json);

      this.postToDB();
    }
  }

  render() {
    if(this.state.data) {
      return (
        <div>
          <header id="batch-header" style={{padding: 20}}>
            <h1>Batch Assignment</h1>
          </header>
          <form id="batch-update" method="POST" action="/admin/updateBatchAndUsers">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <section id="user-selection" style={{display: 'inline-block', float: 'left'}}>
                    <article id="student-selection">
                      <div style={{padding: 10}}>
                        <h3>Available Students</h3>
                        <div className="input-group">
                          <div className="input-group-addon">Filter Students:</div>
                          <input className="form-control" id="filterStudents" type="text"/>
                        </div>
                        <div id="student-list">
                          <ListComponent clickFunction={this.updateBatchArray.bind(this)} users={this.state.data} listType="student"/>
                        </div>
                      </div>
                    </article>
                    <article id="trainer-selection">
                      <div style={{padding: 10}}>
                        <h3>Available Trainers</h3>
                        <div className="input-group">
                          <div className="input-group-addon">Filter Trainers:</div>
                          <input className="form-control" id="filterTrainers" type="text"/>
                        </div>
                        <div id="trainer-list">
                          <ListComponent clickFunction={this.updateBatchArray.bind(this)} users={this.state.data} listType="trainer"/>
                        </div>
                      </div>
                    </article>
                  </section>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <aside id="batch-selection" style={{display: 'inline-block', float: 'left'}}>
                    <div style={{padding: 10}}>
                      <h3>Available Batches</h3>
                      <div className="input-group">
                        <div className="input-group-addon">Filter Batches:</div>
                        <input className="form-control" type="text"/>
                      </div>
                      <div id="batch-selector">
                        <ListComponent clickFunction={this.updateBatchArray.bind(this)} users={this.state.data} listType="batch"/>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </form>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4" style={{display: 'inline-block', float: 'left', paddingTop: 15}}>
            <button onClick={this.compileDataForPost.bind(this)} className="btn btn-primary btn-md" title="Opens a page to create a new Batch." id="create-batch-btn">Create New
              Batch</button>
          </div>
          {/*<div onClick={this.redirect.bind(this)} className="col-xs-12 col-sm-4 col-md-4 col-lg-4" style={{display: 'inline-block', float: 'left', paddingTop: 15, paddingBottom: 15}}>*/}
            {/*<button className="btn btn-danger btn-md" title="Cancel batch creation and return to the homepage." id="cancel-btn">Cancel</button>*/}
          {/*</div>*/}
        </div>
    )
    } else {
      return (
        <div>Here is some content.</div>
      );
    }
  }
}
//
// BatchManagement.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };

//render(<BatchManagement/>, document.getElementById('app'));
//export default BatchManagement
