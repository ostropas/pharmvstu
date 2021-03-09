import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// core components
import PropTypes from "prop-types";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from "../../Models/Axios/axiosRoutes.js"

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

class DoctorPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            doctorId: props.location.state.doctorId,
            doctorFio: "",
            doctorInfo: "",
            workingTime: [
                {
                    day: 1,
                    start: "08:00",
                    end: "17:00"
                }
            ]
        }
    }

    dayNames = [
        "", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"
    ]

    componentDidMount()
    {
        axios.getDoctorData(this.state.doctorId).then(res => {
            this.setState({
                doctorFio: res.data.fio,
                doctorInfo: res.data.info
            })
        });

        axios.getWorkingTime(this.state.doctorId).then(res => {
            this.setState({
                workingTime: res.data
            })
        })
    }

    renderWorkingTIme()
    {
        let head = ["День недели", "Начало", "Конец"];
        let data = this.state.workingTime.map(v => {
            return [this.dayNames[v.day], v.start, v.end]
        });

        return(
            <Table
            tableHeaderColor="primary"
            tableHead={head}
            tableData={data}
            onClick={() => {}}
            />
        )
    }

    render()
    {
        const { classes } = this.props;
        return (
            <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{this.state.doctorFio}</h4>
                </CardHeader>
                <CardBody>
                    {this.state.doctorInfo}
                    <h4>Время приема:</h4>
                    {this.renderWorkingTIme()}
                </CardBody>
                </Card>
            </GridItem>
            </GridContainer>
        )
    }
}

DoctorPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DoctorPage);