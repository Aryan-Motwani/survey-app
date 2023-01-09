import React, { useState,useRef } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBInput,
}
from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router';
import { form_data } from './Menu-data';
import './firebase'
import {db} from './firebase'
import uuid from 'react-uuid';
import "./form.css"
import DropDown from './forms/DropDown';
import DataFetech from './dataFetech';


function Form(props) {
  let {formName} = useParams();
  let formData;

  let currentPage = window.location.pathname.split("/");
  currentPage.forEach((i,j) => {
      if(i.indexOf("%20") > -1) 
        currentPage[j] = i.split("%20").join(" ");
  });
  const [formVals,setFormVals] = useState({"Company Name" : "TVS"})
  const [editState, setEditState] = useState(!!Object.keys(props.editData).length)
  const [optValue,setOptValue] = useState({});
  const [fbData, setFbData] = useState([]);
  

  const handleChange = (e) => {
    console.log(formVals);
    formVals[e.target.id] = e.target.value;
    setFormVals(formVals);
  }

  const handleOption = (data) => {
    setOptValue(data);
    setTimeout(() => {
    form_data[currentPage[2]][currentPage[3]].map(i => {
      if(i.type == "autofill"){
        document.querySelectorAll(".dropdown").forEach(j => {
          if(i["parentField"][0] == j.parentElement.firstChild.textContent){
            fbData.forEach(k => {
              console.log("================");
              console.log(k.data[i.parentField[3]],j.firstChild.firstChild.textContent);
              if(k.field == i.parentField[1] && k.data[i.parentField[3]] == j.firstChild.firstChild.textContent){
                document.querySelector("."+i.title.split(" ").join("-").toLowerCase()).value = k.data[i.parentField[2]]
              }
            })
          }
        })
      }
    });
    }, 100)
  }  
  
  

  if(!!Object.keys(props.editData).length)
    document.querySelectorAll("input").forEach(i => {
      i.value = props.editData[i.id]
    })
  
    formData = form_data[currentPage[2]][currentPage[3]].map((i,j) => 
    {
      if(Array.isArray(i.type) && i.type[0] == "dropdown"){
          return <DropDown label={i.title} options={i.type[1]} handleOption={handleOption}/>
      }

      if(Array.isArray(i.type) && i.type[0] == "datadropdown"){
        console.log(window.location.pathname);
        let title = i.type[1][0];
        let field = i.type[1][1]
        let newArr = [];
        // if(i.title == title){
          props.userData.forEach(j => {
            if(j.field == field){
              newArr.push(j.data[title]);
            }
        })
        return <DropDown label={i.title} options={newArr} handleOption={handleOption}/>
      }
      
      if(i.type == "image"){
        return <input type={'file'}></input>;
      }

      if(i.type == "autofill"){
        return <MDBInput wrapperClass='mb-4' min="0" label={i.title} className={`form1 ${i.title.split(" ").join("-").toLowerCase()}`} id={i.title} key={i.title} type={i.type} autoFill={true} value={" "}/>
      }else{
        return <MDBInput wrapperClass='mb-4' min="0" label={i.title} className='form1' id={i.title} key={i.title} type={i.type} autoFill={false}/>
      }
      
    })
  


  const handleSave = async (e) => {
    e.preventDefault();

    let data = {}
    document.querySelectorAll('.form1').forEach(i => {
      if(i.classList.contains('dropdown'))
        data[i.parentElement.children[0].textContent] = i.children[0].childNodes[0].textContent;
      else
        data[i.id] = i.value;
    })

    console.log(data);
    let dataa = {field : `${currentPage[2]}/${currentPage[3]}`, data, id: uuid()};
    db.collection("mess").doc(dataa.id).set(dataa)
    document.querySelectorAll("input").forEach(i => {
      i.value = "";
      })
    props.updateTable()
  }

  const handleUpdate = () => {
    let data = {};
    document.querySelectorAll('.form1').forEach(i => {
      if(i.classList.contains('dropdown'))
        data[i.parentElement.children[0].textContent] = i.children[0].childNodes[0].textContent;
      else
        data[i.id] = i.value;
    })
    db.collection("mess").doc(props.editData.id).update({data: data});
    props.updateTable();
    props.updateData({});
    document.querySelectorAll("input").forEach(i => {
    i.value = "";
    })
  }

  const getData = (data) => {
    setFbData(data);
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <DataFetech isTemplate={false} getData={getData}/>
          <h1>{formName}</h1>
          <p></p>
          <div className='form-container' style={(form_data[currentPage[2]][currentPage[3]].length > 10) ? {gridTemplateColumns: "1fr 1fr", width: "150%",marginLeft: "-25%"} : {gridTemplateColumns: ""}}>

          {formData}
          </div>
          {!!Object.keys(props.editData).length ?   
          <MDBBtn key={"mb-4 w-100"} className="mb-4 w-100" onClick={handleUpdate}>Update</MDBBtn> :
          <MDBBtn key={"mb-4 w-101"} className="mb-4 w-100" onClick={handleSave}>Submit</MDBBtn> 
        }
    </MDBContainer>
  );
}

export default Form;

/*
  ifsc - letters
  bank name : email,phn number
  company - bank
  vehilce valutaion : bank div, bank branch
  intimated by : bank contact person name
  inspected by : employee dropdown,inspected contact no.
*/

