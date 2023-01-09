import * as React from 'react';
import { Component } from 'react';
import {db} from './firebase'
import './firebase'
import TableComp from './TableComp';
import Form from "./form"
import DataFetech from './dataFetech';



export default class DataTable extends Component {
  constructor(props){
    super(props)
    this.state = {rows : [], editData : {}, userData: []}
    this.updateTable = this.updateTable.bind(this);
    this.updateData = this.updateData.bind(this);
    this.child = React.createRef();
    this.formRef = React.createRef();
  }

  getData = (userData) => {
    this.setState({userData});
    let currentPage = window.location.pathname.split("/");
    currentPage.forEach((i,j) => {
      if(i.indexOf("%20") > -1) 
        currentPage[j] = i.split("%20").join(" ");
    });
    let rows = [];


    setTimeout(() => {
      userData.forEach(i => {
        if(i.field == `${currentPage[2]}/${currentPage[3]}`){
          i.data["id"] = i.id;
          rows.push(i.data);
        }
      })
      this.setState({rows});
    },500)
  }

  updateTable = () => {
    console.log("hi");
    setTimeout(() => {
      this.child.current.fetchAll();
    }, 500)
  }

  updateData = (dataField) => {
    this.setState({editData : dataField});
  }

  deleteData = (data) => {
    db.collection("mess").doc(data.id).delete().then(() => {
      this.updateTable();
    });

  }
  
  render() {
    if(this.props.userID == "true"){
      return(  
        <div>
        <DataFetech isTemplate={false} getData={this.getData} ref={this.child}/>
        <Form updateTable={this.updateTable} editData={this.state.editData} updateData={this.updateData} userData={this.state.userData}/>
        <TableComp rows={this.state.rows} updateData={this.updateData} removeData={this.deleteData}/>
      </div>
    )
  }else{
    window.location.pathname = "/"
    }
  }
}