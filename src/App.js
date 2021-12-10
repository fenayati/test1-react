import React, { useEffect, useState } from "react";
import {
Container,
Button,
Form,
FormGroup,
Label,
Col,
Input } from 'reactstrap';
import './App.css';

const App = () => {
  const [lispString, setLispString] = useState("");
  const [lispStringValidation, setLispStringValidation] = useState(null);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    setLispStringValidation(checkBracketsValidation(lispString));
  }, [lispString]);

  const checkBracketsValidation = (str) => {
    let openBracket = 0;
    for(let i in str){   
        if(str[i] === '('){
            openBracket ++;
        } else if(str[i] === ')') {
            openBracket --;
        }  
        if (openBracket < 0) return false;
    }
    if(openBracket > 0) return false;
    return true;
  }

  const save = () => {
    console.log("save", inputValues);
  }

  return (
    <div className="app">
      {/* <section className="lisp-section">
        <label htmlFor="lisp">lisp brackets validation </label>
        <input 
          type="text" 
          onChange={(e) =>
            setLispString(e?.target?.value)
          } />
        <div>{lispStringValidation ? "correct" : "wrong"}</div>
      </section> */}
      <Container>
        <section className="healthcare-section">
          <Form>
            <FormGroup row>
              <Col xs={12} sm={6} lg={6}>
                <Label for="firstName">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder=""
                  type="text"
                  onChange={(e) =>
                    setInputValues({ ...inputValues, firstName: e.target.value })
                  }
                />
              </Col>
              <Col xs={12} sm={6} lg={6}>
                <Label for="lastName">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder=""
                  type="text"
                  onChange={(e) =>
                    setInputValues({ ...inputValues, lastName: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs={12} sm={6} lg={6}>
                <Label for="npi">
                  NPI number
                </Label>
                <Input
                  id="npi"
                  name="npi"
                  placeholder=""
                  type="number"
                  onChange={(e) =>
                    setInputValues({ ...inputValues, npi: e.target.value })
                  }
                />
              </Col>
              <Col xs={12} sm={6} lg={6}>
                <Label for="bussinessAddress">
                  Business Address
                </Label>
                <Input
                  id="bussinessAddress"
                  name="bussinessAddress"
                  placeholder=""
                  type="text"
                  onChange={(e) =>
                    setInputValues({ ...inputValues, bussinessAddress: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs={12} sm={6} lg={6}>
                <Label for="tele">
                  Telephone Number
                </Label>
                <Input
                  id="tele"
                  name="tele"
                  placeholder=""
                  type="tel"
                  onChange={(e) =>
                    setInputValues({ ...inputValues, tele: e.target.value })
                  }
                />
              </Col>
              <Col xs={12} sm={6} lg={6}>
                <Label for="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder=""
                  type="email"
                  onChange={(e) =>
                    setInputValues({ ...inputValues, email: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            <Button onClick={save}>
              Save
            </Button>
          </Form>
        </section>
      </Container>
    </div>
  );
}

export default App;
