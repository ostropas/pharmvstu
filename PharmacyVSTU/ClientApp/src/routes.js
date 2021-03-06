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
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    user: 2
  },
  {
    path: "/doctors",
    name: "Список всех докторов",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: DoctorList,
    user: 1
  },
  {
    path: "/doctor",
    name: "Описание доктора",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: DoctorPage,
    dontShowInSelector: true,
    user: 3
  },
  {
    path: "/patients",
    name: "Список записанных пациентов",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: PatientsList,
    dontShowInSelector: true,
    user: 0
  }
];

export default dashboardRoutes;
