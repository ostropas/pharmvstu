// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";
import DoctorList from "views/Doctors/DoctorList.js";
import DoctorPage from "views/Doctor/DoctorPage.js";
import PatientsList from "views/PatientsList/PatientsList.js";
import PatientCard from "views/PatientCard/PatientCard.js";
import Card from "views/Card/Card.js"
// core components/views for RTL layout

// 0 - doctor
// 1 - patient
// 2 - both
// 3 - never

const dashboardRoutes = [
  {
    path: "/user",
    name: "Профиль",
    icon: Person,
    Component: UserProfile,
    user: 2
  },
  {
    path: "/doctors",
    name: "Список всех докторов",
    icon: "content_paste",
    Component: DoctorList,
    user: 1
  },
  {
    path: "/doctor",
    name: "Описание доктора",
    icon: "content_paste",
    Component: DoctorPage,
    user: 3
  },
  {
    path: "/patients",
    name: "Список записанных пациентов",
    icon: "content_paste",
    Component: PatientsList,
    user: 0
  },
  {
    path: "/patientCard",
    name: "История болезни",
    icon: "content_paste",
    Component: PatientCard,
    user: 3
  },
  {
    path: "/card",
    name: "История болезни",
    icon: BubbleChart,
    Component: Card,
    user: 1
  }
];

export default dashboardRoutes;
