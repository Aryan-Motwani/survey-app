import React, { useState } from 'react'
import { Table } from 'react-bootstrap';
import DataFetech from './dataFetech';
import { form_data } from './Menu-data';
import TableComp from './TableComp';


export default function VehicleSchedule() {
  const [fbData, setFbData] = useState([])

  const getData = (data) => {
    data.forEach(i => {
      if(i.field == "Vehicle Valuation/New Intimation")
        fbData.push(i)
    })
    setFbData(fbData);
    console.log(fbData);
  }

  return (
    <div style={{width : "80%", marginTop: "15px", marginLeft : "10%", marginBottom : "5%"}}>
      <DataFetech isTemplate={false} getData={getData}/>
    <div>
      <h1>Vehicle Schedule</h1>
      <Table striped bordered hover responsive border={"1px solid black"}>
      <thead>
        <tr>
          {form_data["Vehicle Valuation"]["New Intimation"].map(i => {
            return <th>{i.title}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {fbData.map(i => {
          {console.log(i)};
          return <tr>
            {i.map(j => {
              return <td>{j.data["Compnay Name"]}</td>
            })}
          </tr>
        })}
      </tbody>

      </Table>        
    </div>
    </div>
  )
}
