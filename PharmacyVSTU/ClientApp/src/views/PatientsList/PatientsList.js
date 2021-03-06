
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

class PatientsList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            patients: [
                {
                    id: "",
                    fio: "",
                    info: "",
                    cardId: 0
                }
            ]
        }
    }

    componentDidMount()
    {
        this.loadPatients();
    }

    loadPatients()
    {
        axios.getAllActualPatients().then(res => {
            this.setState({
                patients: res.data
            })
        })
    }

    openPatientCard(patientIndex)
    {
        this.props.history.push({
           pathname: "/patientCard",
           state: {cardId: this.state.patients[patientIndex].cardId}
        });
    }

    renderPatients()
    {
        let head = ["Фио"];
        let data = this.state.patients.map(v => {
            return [v.fio]
        });

        return(
            <Table
            tableHeaderColor="primary"
            tableHead={head}
            tableData={data}
            onClick={this.openPatientCard.bind(this)}
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
                    <h4 className={classes.cardTitleWhite}>Все записанные к вам пациенты</h4>
                </CardHeader>
                <CardBody>
                    {this.renderPatients()}
                </CardBody>
                </Card>
            </GridItem>
            </GridContainer>
        )
    }
}

PatientsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientsList);