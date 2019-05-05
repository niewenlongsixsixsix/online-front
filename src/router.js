import Vue from 'vue'
import Router from 'vue-router'
import Main from "@/layouts/Main";
import Home from "@/views/Home";
import CourseListLayout from "@/layouts/CourseListLayout";
import UserLayout from "@/layouts/UserLayout";
import CourseInfo from "@/layouts/CourseInfo";
import ChapterVideoLayout from "@/layouts/ChapterVideoLayout";
import Login from "@/views/Login";
import PersonCenter from "@/views/userView/PersonCenter";
import MyCourse from "@/views/userView/MyCourse";
import MyNotes from "@/views/userView/MyNotes";
import MyMessage from "@/views/userView/MyMessage";
import SafeSetting from "@/views/userView/SafeSetting";
import Editor from "@/views/editor/Editor";
import AdminHome from "@/views/admin/AdminHome";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'main',
          component: Main
        },
        {
          path: 'courseList',
          name: 'courseList',
          component: CourseListLayout
        },
        {
          path: 'userLayout',
          name: 'userLayout',
          component: UserLayout,
          children:[
            {path:'',component:PersonCenter},
            {path:'MyCourse',component:MyCourse},
            {path:'MyNotes',component:MyNotes},
            {path:'MyMessage',component:MyMessage},
            {path:'SafeSetting',component:SafeSetting},
          ]
        },
        {
          path: 'courseInfo',
          name: 'courseInfo',
          component:CourseInfo
        }
      ]
    },
    {
      path:'/ChapterVideoLayout',
      component:ChapterVideoLayout
    },
    {
      path:'/editor',
      component:Editor
    },

      //admin

    {
      path:'/adminhome',
      component:AdminHome
    }
  ]
})
