import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// core components
import PropTypes from "prop-types";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js"
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from "../../Models/Axios/axiosRoutes.js"
import Select from "@material-ui/core/Select"
import { MenuItem, Input, FormHelperText } from "@material-ui/core";
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

class PatientCard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            patient: {
                patientId: "",
                fio: "",
                cardId: 0
            },
            cardData: [{
                doctorId: 1,
                date: "",
                info: "",
                recomendation: ""
            }],
            doctorsList: [
                {
                    doctorId: 0,
                    fio: "",
                    info: ""
                }
            ],
            doctorTime: [],
            selectedDoctor: null,
            selectedTime: null,
            info: "",
            updateButtonText: null,
            error: ""
        }
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
        console.log(this.state)
        axios.getPatientData().then(res => {
            this.setState({
                patient: res.data
            })
            axios.getCard(res.data.cardId).then(cardRes => {
                this.setState({
                    cardData: cardRes.data
                })
            });
            axios.getAllDoctors().then(res => {
                this.setState({
                    doctorsList: res.data,
                    selectedDoctor: res.data[0].doctorId
                })
                this.getDoctorTime(res.data[0].doctorId);
            })
        });
    }

    getDoctorTime(doctorId)
    {
        this.setState({
            doctorTime: [],
            selectedTime: 0
        })
        axios.getDoctorAppointment(doctorId).then(res => {
            this.setState({
                doctorTime: res.data,
                selectedTime: res.data[0]
            })
        })
    }

    renderCardData()
    {
        let head = ["Дата обращения", "Жалоба", "Рекомендация"];
        let data = this.state.cardData.map(v => {
            return [this.timeConverter(v.date), v.info, v.recomendation]
        });

        return(
          <Table
          tableHeaderColor="primary"
          tableHead={head}
          tableData={data}
          />
        )
    }

    register()
    {
        if (this.state.updateButtonText !== null)
            return;
        if (this.state.selectedDoctor === null || this.state.selectedTime === null || this.state.info === "")
        {
            this.sendError("Заполните все поля");
            return;
        }
        this.setState({updateButtonText: "Отправка..."});
        var newField = {
            doctorId: this.state.selectedDoctor,
            date: this.state.selectedTime,
            info: this.state.info,
            recomendation: ""
        }
        axios.addNewFieldInCard(this.state.patient.cardId, newField).then(res => {
            var prevCardData = this.state.cardData;
            prevCardData.push(newField);
            this.setState({
                cardData: prevCardData
            })
            this.setState({updateButtonText: "Вы успешно записаны"});
            setTimeout(() => {
                this.setState({
                    updateButtonText: null
                });
            }, 2000);
        });
    }
    
    changeDoctor(event)
    {
        this.getDoctorTime(event.target.value);
        this.setSelector(event);
    }

    setSelector(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    render()
    {
        const { classes } = this.props;
        return (
            <div>
            <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{this.state.patient.fio}</h4>
                </CardHeader>
                <CardBody>
                    {this.renderCardData()}
                    <br/>
            <GridContainer>
            <GridItem xs={3} sm={3} md={3}>
                    <Select name="selectedDoctor" autoWidth="true" value={this.state.selectedDoctor} onChange={this.changeDoctor.bind(this)}>
                        {this.state.doctorsList.map((v, i) => {
                            return (
                                <MenuItem value={v.doctorId}>{v.fio}</MenuItem>
                            )
                        })}
                    </Select>
                    <FormHelperText>Выбранный доктор</FormHelperText>
                    </GridItem>
            <GridItem xs={3} sm={3} md={3}>
                    <Select name="selectedTime" autoWidth="true" value={this.state.selectedTime} onChange={this.setSelector.bind(this)}>
                        {this.state.doctorTime.map((v, i) => {
                            return (
                                <MenuItem value={v}>{this.timeConverter(v)}</MenuItem>
                            )
                        })}
                    </Select>
                    <FormHelperText>Выбранное время</FormHelperText>
                    </GridItem>
                    </GridContainer>
                    <GridContainer>
            <GridItem xs={6} sm={6} md={6}>
                <Input fullWidth={true} name="info" value={this.state.info} onChange={this.setSelector.bind(this)}></Input>
                    <FormHelperText>Указанная жалоба</FormHelperText>
                    </GridItem>
                    </GridContainer>
                </CardBody>
                <CardFooter>
                <Button color="primary" onClick={this.register.bind(this)}>{this.state.updateButtonText === null ? "Записаться к врачу" : this.state.updateButtonText}</Button>
                </CardFooter>
                </Card>
            </GridItem>
            </GridContainer>
            {this.renderError()}
            </div>
        )
    }
}

PatientCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientCard);