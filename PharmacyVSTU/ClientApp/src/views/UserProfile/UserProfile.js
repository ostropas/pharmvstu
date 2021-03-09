import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import EditTable from "components/EditTable/EditTable.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { withStyles } from "@material-ui/core/styles";
import avatar from "assets/img/faces/user.png";

import axios from "Models/Axios/axiosRoutes.js"
import ErrorComponent from "components/Error/ErrorComponent.js"


const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
        }
    }
};

class UserProfile extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
        id: "",
        fio: "",
        email: "",
        isDoctor: false,
        info: "",
        editData: {
          fio: "",
          email: "",
          info: "",
          workingTime: [
            {
                day: 1,
                start: "08:00",
                end: "17:00"
            },
            {
                day: 1,
                start: "08:00",
                end: "17:00"
            }
          ]
        },
        updateButtonText: null,
        error: ""
    };
  }

    sendError(msg)
    {
        this.setState({
            error: msg
        });
    }

    removeError()
    {
        this.setState({
            error:""
        })
    }

    renderError()
    {
        return (<ErrorComponent removeError={this.removeError.bind(this)}>{this.state.error}</ErrorComponent>);
    }

  componentDidMount()
  {
    axios.getUserData().then(res => {
      let commonData = res.data;

      let updateState = (fullData) => {
        this.setState({
          id: fullData.id,
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
          axios.getWorkingTime(commonData.id).then(workingTimeRes => {
            console.log(workingTimeRes);
            var editData = this.state.editData;
            editData.workingTime = workingTimeRes.data;
            this.setState({editData:editData});
          })
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
      var newFio = this.state.editData.fio === "" ? this.state.fio : this.state.editData.fio;
      var newEmail = this.state.editData.email === "" ? this.state.email : this.state.editData.email;
      var newInfo = this.state.editData.info === "" ? this.state.info : this.state.editData.info;
      this.setState(
        {updateButtonText: "Обновлено",
          fio: newFio,
          email: newEmail,
          info: newInfo
        });
      setTimeout(() => {
        this.setState({
          updateButtonText: null,
        });
      }, 2000);
    }

    var newEditData = {
      fio: this.state.editData.fio,
      email: this.state.editData.email,
      info: this.state.editData.info
    }
    completeAction.bind(this)
    if (this.state.isDoctor) {
      axios.updateDoctorData(newEditData).then(res => {
        axios.updateWorkingTime({workingTime: this.state.editData.workingTime}).then(res => {
          completeAction();
        }).catch(e => {
          completeAction();
          this.sendError("Что-то пошло не так");
        })
      }).catch(e => {
        completeAction();
        this.sendError("Что-то пошло не так");
      })
    } else {
      axios.updatePatientData(newEditData).then(res =>{
        completeAction();
      }).catch(e => {
        completeAction();
        this.sendError("Что-то пошло не так");
      })
    }
  }

  dayNames = [
      "", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"
  ]

  renderWorkingTIme()
  {
      let head = ["День недели", "Начало", "Конец"];
      let data = this.state.editData.workingTime.map(v => {
          return [this.dayNames[v.day], v.start, v.end]
      });

      return(
          <EditTable
          tableHeaderColor="primary"
          tableHead={head}
          tableData={data}
          editFilter={(row, column) => {
              if (column > 0)
                return true;
            
                return false;
          }}
          onChange={(res, row, column) => {
            var oldTableData = this.state.editData.workingTime;
            if (column === 1)
            {
              oldTableData[row].start = res.target.value;
            }
            else {
              oldTableData[row].end = res.target.value;
            }
            var editData = this.state.editData;
            editData.workingTime = oldTableData;
            this.setState({editData: editData});
          }}
          />
      )
  }

  renderEditDoctorWorkingTime()
  {
    if (!this.state.isDoctor)
      return (<div></div>)

      const { classes } = this.props;
      return (
          <GridItem xs={12} sm={12} md={12}>
              <Card>
              <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Время приема</h4>
              </CardHeader>
              <CardBody>
                  {this.renderWorkingTIme()}
              </CardBody>
              </Card>
          </GridItem>
      )
  }

  render()
  {
    const { classes } = this.props;
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
              <p>{this.state.email}</p>
              {this.state.isDoctor ? <p>Врач</p> : <p>Пациент</p>}
              {this.returnInfo(classes.description)}
            </CardBody>
          </Card>
        </GridItem>
        {this.renderEditDoctorWorkingTime()}
      </GridContainer>
      {this.renderError()}
    </div>
    )
  }
}

export default withStyles(styles)(UserProfile);