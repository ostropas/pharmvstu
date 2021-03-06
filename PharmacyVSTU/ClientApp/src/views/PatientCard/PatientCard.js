import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// core components
import PropTypes from "prop-types";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";
import EditTable from "components/EditTable/EditTable.js"
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ErrorComponent from "components/Error/ErrorComponent.js"
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

class PatientCard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            patient: props.location.state.patient,
            cardData: [{
                doctorId: 1,
                date: "",
                info: "",
                recomendation: ""
            }],
            updateButtonText: null,
            error: null
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
        axios.getCard(this.state.patient.cardId).then(res => {
            this.setState({
                cardData: res.data
            })
        });
    }

    renderCardData()
    {
        let head = ["Дата обращения", "Жалоба", "Рекомендация"];
        let data = this.state.cardData.map(v => {
            return [this.timeConverter(v.date), v.info, v.recomendation]
        });

        return(
          <EditTable
          tableHeaderColor="primary"
          tableHead={head}
          tableData={data}
          editFilter={(row, column) => {
              if (column === 2 && row === this.state.cardData.length - 1)
                return true;
            
                return false;
          }}
          onChange={(res, row, column) => {            
            var oldTableData = this.state.cardData;
            oldTableData[row].recomendation = res.target.value;
            this.setState({cardData: oldTableData});
          }}
          />
        )
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

    sendRecomendation()
    {
        if (this.state.updateButtonText !== null)
            return;

        if (this.state.cardData[this.state.cardData.length -1 ].recomendation === "")
        {
            this.sendError("Заполните рекомендацию")
            return;
        }
        this.setState({updateButtonText: "Обновление..."});
        axios.updateLastCardRecord(this.state.patient.cardId, this.state.cardData[this.state.cardData.length - 1]).then(res => {
            this.setState({updateButtonText: "Обновлено"});
            setTimeout(() => {
                this.setState({updateButtonText: null});
            }, 2000);
        });
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
                </CardBody>
                <CardFooter>
                <Button color="primary" onClick={this.sendRecomendation.bind(this)}>{this.state.updateButtonText === null ? "Отправить рекомендацию" : this.state.updateButtonText}</Button>
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