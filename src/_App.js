import React, { useEffect, useState, useRef } from "react";
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import { Col, Input, InputGroup, FormGroup, Label, Button, Fade, FormFeedback, Container, Card } from 'reactstrap';
import { CSVLink } from "react-csv";
import './App.css';

const headers = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Email", key: "email" }
];

const data = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
];

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [tables, setTables] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const fileInput = useRef(null);

  useEffect(() => {
  }, []);

  const renderFile = (fileObj) => {
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);
      }
      else{
        let respRows = resp?.rows;
        let items = respRows.splice(1, resp?.rows?.length - 1);
        let rows = removeDublications(items);
        const tables = [];
        // rows = sort(rows, 3);
        rows = sort(rows, 2);
        rows = sort(rows, 3);
        // rows = respRows.concat(rows);
        let company = rows[0][2];
        let table = [];
        for (let i = 0; i < rows.length; i++) {
          const element = rows[i];
          if(element[2] === company) {
            table.push({
              UserId: element[0],
              name: element[1],
              companyName: element[2],
              version: element[3],
            })
          }
          else {
            company = element[2];
            tables.push(table);
            table = [];
            table.push({
              UserId: element[0],
              name: element[1],
              companyName: element[2],
              version: element[3],
            })
          }
        }
        table.length && tables.push(table);

        setDataLoaded(true);
        setCols(createColumns(respRows[0]));
        setRows(rows);
        setTables(tables);
      }
    }); 
  }

  const removeDublications = (items) => {
    const list = sort(items, 3);
    return [...new Map(list.map(v => [JSON.stringify([v[0],v[2]]), v])).values()]
  }

  const sort = (items, columnNumber) => {
    return items.sort((a, b) => {
      var nameA = a[columnNumber - 1];
      var nameB = b[columnNumber - 1];
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  const createColumns = (cols) => {
    const result = [];
    for (const key in cols) {
      result.push({
        label: cols[key],
        key: cols[key]
      });
    }
    return result;
  }

  const fileHandler = (event) => {    
    if(event.target.files.length){
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      if(fileName.slice(fileName.lastIndexOf('.')+1) === "csv") {
        setUploadedFileName(fileName);
        setIsFormInvalid(false);
        renderFile(fileObj)
      }    
      else{
        setUploadedFileName("");
        setIsFormInvalid(true);
      }
    }               
  }

  const openFileBrowser = () => {
    fileInput.current.click();
  }

  return (
    <div className="app">
      <Container>
        <form>
          <FormGroup row>
            <Label for="exampleFile" xs={6} sm={4} lg={2} size="lg">Upload</Label>          
            <Col xs={4} sm={8} lg={10}>                                                     
              <InputGroup>
                <div>
                  <Button color="info" style={{color: "white", zIndex: 0}} onClick={openFileBrowser}><i className="cui-file"></i> Browse&hellip;</Button>
                  <input type="file" hidden onChange={fileHandler} ref={fileInput} onClick={(event)=> { event.target.value = null }} style={{"padding":"10px"}} />                                
                </div>
                <Input type="text" className="form-control" value={uploadedFileName} readOnly invalid={isFormInvalid} />                                              
                <FormFeedback>    
                  <Fade in={isFormInvalid} tag="h6" style={{fontStyle: "italic"}}>
                    Please upload a .xlsx file only !
                  </Fade>                                                                
                </FormFeedback>
              </InputGroup>     
            </Col>                                                   
          </FormGroup>   
        </form>

        {
          dataLoaded && 
          <div>
            {/* <Card body outline color="secondary" className="restrict-card">
              <OutTable data={rows} columns={cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
            </Card> */}
            {
              tables && tables.map((item) => {
                return(
                  <div className="mt-3">
                    <CSVLink data={item} headers={cols}>
                      Download {item[0]?.companyName}
                    </CSVLink>
                  </div>
                );
              })
            }
          </div>
        }
      </Container>
    </div>
  );
}

export default App;
