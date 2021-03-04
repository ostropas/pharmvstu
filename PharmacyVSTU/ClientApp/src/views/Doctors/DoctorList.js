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

class DoctorList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            doctors: [
                {
                    id: "",
                    fio: "",
                    info: ""
                }
            ]
        }
    }

    componentDidMount()
    {
        this.loadDoctors();
    }

    loadDoctors()
    {
        axios.getAllDoctors().then(res => {
            this.setState({
                doctors: res.data
            })
        })
    }

    openDoctor(doctorIndex)
    {
        this.props.history.push({
           pathname: "/doctor",
           state: {doctorId: this.state.doctors[doctorIndex].doctorId}
        });
    }

    renderDoctors()
    {
        let head = ["Фио", "Инфо"];
        let data = this.state.doctors.map(v => {
            return [v.fio, v.info]
        });

        return(
            <Table
            tableHeaderColor="primary"
            tableHead={head}
            tableData={data}
            onClick={this.openDoctor.bind(this)}
            style={{cursor: "pointer"}}
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
                    <h4 className={classes.cardTitleWhite}>Все врачи</h4>
                    <p className={classes.cardCategoryWhite}>
                    Описание всех врачей клинники
                    </p>
                </CardHeader>
                <CardBody>
                    {this.renderDoctors()}
                </CardBody>
                </Card>
            </GridItem>
            </GridContainer>
        )
    }
}

DoctorList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DoctorList);