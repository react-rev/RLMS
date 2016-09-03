import React from 'react';

class ItemComponent extends React.Component {

  constructor() {
    super();

  }

  onCheckOrUncheck(event){
    this.props.clickFunction(this.props.user);
    //console.log(this.props.user.username);
  }

  onRadioTrainerSelect(event) {
    this.props.clickFunction(this.props.user);
    //console.log(this.props.user.username);
  }

  onRadioBatchSelect(event) {
    this.props.clickFunction(this.props.user);
    //console.log(this.props.user.batch.name);
  }

  render() {
    console.log(this.props.user.batch);
    if(this.props.listType === "student" && (this.props.user.is_active === true || this.props.user.is_active !== false ) && this.props.user.is_admin !== true && this.props.user.username !== null && this.props.user.batch === null) {
      return (
        <li>
            <input onClick={this.onCheckOrUncheck.bind(this)} type="checkbox"></input>
            {this.props.key} {this.props.user.f_name} {this.props.user.l_name} ({this.props.user.username})
        </li>
      );
    } else {
      if (this.props.listType === "trainer" && (this.props.user.is_active === true || this.props.user.is_active !== false ) && this.props.user.is_admin === true && this.props.user.username !== null && !(this.props.user.batch)) {
        return (
          <li>
              <input onClick={this.onRadioTrainerSelect.bind(this)} type="radio" name="trainer-select"></input>
              {this.props.key} {this.props.user.f_name} {this.props.user.l_name} ({this.props.user.username})
          </li>
        );
      } else {
        if (this.props.listType === "batch" && this.props.user.batch && !(this.props.user.username)) {
          return (
            <li>
                <input onClick={this.onRadioBatchSelect.bind(this)} type="radio" name="batch-select"></input>
                {this.props.key} {this.props.user.batch.batchName}
            </li>
          );
        } else {
          return null;
        }
      }
    }
  }
}

export default ItemComponent;
