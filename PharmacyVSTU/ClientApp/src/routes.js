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
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import NotificationsPage from "views/Notifications/Notifications.js";
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
    component: UserProfile,
    user: 2
  },
  {
    path: "/doctors",
    name: "Список всех докторов",
    icon: "content_paste",
    component: DoctorList,
    user: 1
  },
  {
    path: "/doctor",
    name: "Описание доктора",
    icon: "content_paste",
    component: DoctorPage,
    user: 3
  },
  {
    path: "/patients",
    name: "Список записанных пациентов",
    icon: "content_paste",
    component: PatientsList,
    user: 0
  },
  {
    path: "/patientCard",
    name: "История болезни",
    icon: "content_paste",
    component: PatientCard,
    user: 3
  },
];

export default dashboardRoutes;
