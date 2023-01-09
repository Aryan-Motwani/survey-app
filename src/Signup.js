import React, { useState,useRef, Component, useEffect } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import {firestore} from './firebase';
import {addDoc, collection} from '@firebase/firestore';
import { useParams } from 'react-router';
import DataFetech from './dataFetech';


function Signup(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  let {formName} = useParams();
  

  const [justifyActive, setJustifyActive] = useState('tab1');;
  const [authData, setAuthData] = useState([]);

  const handleSave = async (e) => {
    e.preventDefault();
    let mail = emailRef.current.value;
    let pass = passwordRef.current.value;
    if(mail == "mail@123" && pass == "pass"){
      localStorage.setItem("loginToken",JSON.stringify("true"));
      props.changeAuth("user1");
    }
  }

  const getData = (userData) => {
    setTimeout(() => {
      setAuthData(userData);
    },200)
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <DataFetech getData={getData}/>
          <h1>{formName}</h1>
          <p></p>

          <MDBInput wrapperClass='mb-4' label='Email Address' id='form1' type='email' ref={emailRef}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' ref={passwordRef}/>

          <MDBBtn className="mb-4 w-100" onClick={handleSave}>Submit</MDBBtn>
    </MDBContainer>
  );
}

export default Signup;