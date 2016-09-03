import React from 'react';
import ItemComponent from './ItemComponent.jsx';

class ListComponent extends React.Component {

  onListSelectChange(event) {
    this.props.clickFunction(event);
    //console.log(event);
  }

  render() {
    // get request for Users
    // pass parameter? student / trainer / batch
    let arr = this.props.users;
    let arrItem = arr.map((item, index) => { return <ItemComponent clickFunction={this.onListSelectChange.bind(this)} listType={this.props.listType} key={index} user={item}/>});
    return (
      <ul>
        {arrItem}
      </ul>
    );
  }
}

export default ListComponent;
