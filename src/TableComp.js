import * as React from 'react';
import { redirect, useNavigate, useParams } from 'react-router';
import { form_data } from './Menu-data';
import { Button } from '@mui/material';
import exportFunc from './Excelexport';
import Table from 'react-bootstrap/Table';

export default function DataTable(props) {
  let {formName} = useParams();
  let currentPage = window.location.pathname.split("/");
    currentPage.forEach((i,j) => {
      if(i.indexOf("%20") > -1) 
        currentPage[j] = i.split("%20").join(" ");
  });
  let rows = [];
  rows = props.rows;

    function handleEdit(i) {
      props.updateData(rows[i.target.id])
    }

    function handleDelete(i){
      props.removeData(rows[i.target.id])
    }

    function handleExport(e){
      let exportData = props.rows;
      exportData.forEach(i => delete i.id);
      console.log(exportData);
      exportFunc(exportData);
    }

    /*
    return (
    <div style={{width : "50%", margin : "auto", marginTop: "15px"}}>
    <TableContainer component={Paper} style={{marginBottom : "50px", width : "160%", marginLeft : "-200px"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
          <TableRow>
          <TableCell component="th" scope="row">{"Sr."}</TableCell>
          {form_data[currentPage[2]][currentPage[3]].map(i => {
                return <TableCell component="th" scope="row">{i.title}</TableCell>
            })}
            <TableCell component="th" scope="row">{""}</TableCell>
            <TableCell component="th" scope="row">{""}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{i+1}</TableCell>
              {form_data[currentPage[2]][currentPage[3]].map(i => {
                return <TableCell component="th" scope="row">{row[i.title]}</TableCell>
              })}
            <TableCell component="th" scope="row"><Button id={i} onClick={handleEdit}>edit</Button></TableCell>
            <TableCell component="th" scope="row"><Button id={i} onClick={handleEdit}>edit</Button></TableCell>
            <TableCell component="th" scope="row"><Button id={i} onClick={handleDelete}>delete</Button></TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <Button variant="contained" onClick={handleExport}>Export</Button>
    </div>
  );
    */

  return (
    <div style={{width : "80%", marginTop: "15px", marginLeft : "10%", marginBottom : "5%"}}>
    <Table striped bordered hover responsive border={"1px solid black"}>
      <thead>
          <tr>
          <th component="th" scope="row">{"Sr."}</th>
          {form_data[currentPage[2]][currentPage[3]].map(i => {
                return <th component="th" scope="row">{i.title}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row,i) => (
            <tr
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <td component="th" scope="row">{i+1}</td>
              {form_data[currentPage[2]][currentPage[3]].map(i => {
                return <td component="th" scope="row">{row[i.title]}</td>
              })}
            <td component="th" scope="row"><Button id={i} onClick={handleEdit}>edit</Button></td>
            <td component="th" scope="row"><Button id={i} onClick={handleDelete}>delete</Button></td>
            
            </tr>
          ))}
        </tbody>
      </Table>
    {/* </TableContainer> */}
      {/* <Button variant="contained" onClick={handleExport}>Export</Button> */}
    </div>

  );
}