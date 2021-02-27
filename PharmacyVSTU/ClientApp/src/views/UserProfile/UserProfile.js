import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/user.png";

import axios from "Models/Axios/axiosRoutes.js"



export default class UserProfile extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
        fio: "",
        email: "",
        isDoctor: false,
        info: "",
        editData: {
          fio: "",
          email: "",
          info: ""
        },
        updateButtonText: null
    };
  }

  styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  };

  componentDidMount()
  {
    axios.getUserData().then(res => {
      let commonData = res.data;

      let updateState = (fullData) => {
        this.setState({
          fio: fullData.fio,
          isDoctor: fullData.doctor,
          email: fullData.email,
          info: fullData.info
        })
      }
      updateState.bind(this);

      if (commonData.doctor)
      {
        axios.getDoctorData(commonData.id).then(doctorRes => {
          let doctorData = {...commonData, ...doctorRes.data};
          updateState(doctorData);
        })
      }
      updateState(commonData);
    })
  }

  returnInfo(classDescription) {
    if (this.state.info === undefined || this.state.info === "")
      return (<div></div>)

    return (
      <p className={classDescription}>
      {this.state.info}
    </p>
    )
  }

  handleChange(evt) {
    const value = evt.target.value;
    var editData = this.state.editData;
    editData[evt.target.name] = value;
    this.setState({editData: editData});
  }

  updateData() {
    this.setState({updateButtonText: "Обновление..."});
    let completeAction = () => {
      this.setState({updateButtonText: "Обновлено"});
      setTimeout(() => {
        this.setState({updateButtonText: null});
      }, 2000);
    }

    completeAction.bind(this)
    if (this.state.isDoctor) {
      axios.updateDoctorData(this.state.editData).then(res => {
        completeAction();
      })
    } else {
      axios.updatePatientData(this.state.editData).then(res =>{
        completeAction();
      })
    }
  }

  render()
  {
    let classes = this.styles;
    return(
      <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Изменение профиля</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email"
                    name="email"
                    onChange={this.handleChange.bind(this)}
                    id="email-address"
                    name="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Фио"
                    id="fio"
                    name="fio"
                    onChange={this.handleChange.bind(this)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              {this.state.isDoctor ? <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Описание"
                    onChange={this.handleChange.bind(this)}
                    id="info"
                    name="info"                    
                    formControlProps={{
                      fullWidth: true
                    }}
                    on
                  />
                </GridItem>
              </GridContainer> : <div></div>}              
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={this.updateData.bind(this)}>{this.state.updateButtonText === null ? "Обновить профиль" : this.state.updateButtonText}</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{this.state.fio}</h4>
              {this.state.isDoctor ? <p>Врач</p> : <p>Пациент</p>}
              {this.returnInfo(classes.description)}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
    )
  }
}