import React, { useState } from 'react';
import Form from "./form"
import MenuAppBar from './MenuAppBar';
import { Route, Routes, Switch } from "react-router";
import Home from './Home';
import DataTable from './DataTable';
import Signup from './Signup'
import ReportTemplate from './ReportTemplate';
import Report from './GenerateReport';
import ReportFormat from './ReportFormat';
import CreateReport from './CreateReport';
import VehicleSchedule from './VehicleSchedule';
import { Schedule } from '@mui/icons-material';

function App() {
  const [login,setLogin] = useState(JSON.parse(localStorage.getItem("loginToken")) == "true" ? JSON.parse(localStorage.getItem("loginToken")) : "false");
  let showSignup;
  if(login == "false")
    showSignup = <Signup changeAuth={changeAuth}/>
  else
    showSignup = <Home changeAuth={changeAuth}/>

  function changeAuth(i){
    console.log("auth set true");
    setLogin("true")
  }

  function logout(){
      localStorage.setItem("loginToken",JSON.stringify("false"));
      setLogin("false");
  }


  return(
    <>
    <MenuAppBar logout={logout} userID={login}/>
    <Routes>
      <Route path='/Schedule' element={<VehicleSchedule/>}/>
      <Route path="/" element={showSignup}/>
      <Route path="/form/:formName" element={<Form userID={login} />}/>
      <Route path="/table/:cateogry/:formName" element={<DataTable userID={login} />}/>
      <Route path="/Report Template" element={<ReportTemplate/>}/>
      <Route path="/Generate Report" element={<Report/>}/>
      <Route path="/Report Format" element={<ReportFormat/>}/>
      <Route path="/Create Report" element={<CreateReport/>}/>
    </Routes>
    </>
  );
}

export default App;