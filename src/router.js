import Vue from 'vue'
import Router from 'vue-router'
import Main from "@/layouts/Main";
import Home from "@/views/Home";
import CourseListLayout from "@/layouts/CourseListLayout";
import UserLayout from "@/layouts/UserLayout";
import CourseInfo from "@/layouts/CourseInfo";
import ChapterVideoLayout from "@/layouts/ChapterVideoLayout";
import Login from "@/views/Login/Login";
import PersonCenter from "@/views/userView/PersonCenter";
import MyCourse from "@/views/userView/MyCourse";
import MyNotes from "@/views/userView/MyNotes";
import MyMessage from "@/views/userView/MyMessage";
import SafeSetting from "@/views/userView/SafeSetting";
import Editor from "@/views/editor/Editor";
import RegisterHome from "@/views/register/RegisterHome";
import TeacherManagerHome from "@/views/teacherManager/TeacherManagerHome";
import TeacherCourseManager from "@/views/teacherManager/menu/TeacherCourseManager";
import BigChapterManager from "@/views/teacherManager/menu/BigChapterManager";
import SmallChapterManager from "@/views/teacherManager/menu/SmallChapterManager";
import TeacherInfoCenter from "@/views/teacherManager/menu/TeacherInfoCenter";
import TeacherManagerCenter from "@/views/teacherManager/menu/TeacherManagerCenter";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/login',
      component: Login
    },
    {
      path:'/register',
      component:RegisterHome
    },
    {
      path:'/teacherManagerHome',
      component:TeacherManagerHome,
      children:[
        {
          path:'/',
          component:TeacherInfoCenter
        },
        {
          path:'teacherManagerCenter',
          component:TeacherManagerCenter,
          children:[
            {
              path:'/',
              component:TeacherCourseManager
            },
            {
              path:'BigChapterManager/:bigChapterId',
              component:BigChapterManager
            },
            {
              path:'SmallChapterManager/:smallChapterId',
              component:SmallChapterManager
            }
          ]
        }
        // {
        //   path:'/bigChapterManager',
        //   component:BigChapterManager
        // },
        // {
        //   path:'/smallChapterManager',
        //   component:SmallChapterManager
        // }
      ]
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

  ]
})
