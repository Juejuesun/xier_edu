import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import StuHome from '../views/StuHome'
import ClassList from '../components/stuhome/ClassList'
import SaftyPg from '../components/stuhome/SaftyPg'
import StuClass from '../views/StuClass'
import Announcement from '../components/stuhome/menu/Announcement'
import Video from '../components/stuhome/menu/Video'
import Homework from '../components/stuhome/menu/Homework'
import Disscuss from '../components/stuhome/menu/Disscuss'

import Comments from '../components/stuhome/comment/Comments'
import Push from '../components/stuhome/comment/Push'
import HomeworkDetail from '../components/stuhome/homework/HomeworkDetail'

import VideoPlayer from '../components/stuhome/player/VideoPlayer'


import TeaHome from '../views/TeaHome'
import ClassListTea from '../components/teahome/ClassListTea'
import MegClassList from '../components/teahome/MegClassList'
import MenageClass from '../components/teahome/MenageClass'
import AddNewClass from '../components/teahome/AddNewClass'
import TeaClass from '../views/TeaClass'
import AnnouncementTea from '../components/teahome/menu/announce/AnnouncementTea'
import HomeworkTea from '../components/teahome/menu/homework/HomeworkTea'
import DisscussTea from '../components/teahome/menu/comment/DisscussTea'
import VideoTea from '../components/teahome/menu/video/VideoTea'
import AddNewAnc from '../components/teahome/menu/announce/AddNewAnc'
import AddNewWork from '../components/teahome/menu/homework/AddNewWork'
import AddNewVideo from '../components/teahome/menu/video/AddNewVideo'
import Paper from '../components/teahome/menu/homework/paper/Paper'
import CheckView from '../components/teahome/menu/homework/paper/CheckView'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/stuhome',
    name: 'StuHome',
    component: StuHome,
    children: [
      {
        path: '/stuhome',
        redirect: '/stuhome/classlist'
      },
      {
        path: '/stuhome/classlist',
        name: 'ClassList',
        component: ClassList
      },
      {
        path: '/stuhome/saftypg',
        name: 'SaftyPg',
        component: SaftyPg
      }
    ]
  },
  {
    path: '/stuclass',
    name: 'StuClass',
    component: StuClass,
    children: [
      {
        path: '/stuclass/announcement',
        name: 'Announcement',
        component: Announcement
      },
      {
        path: '/stuclass/video',
        name: 'Video',
        component: Video
      },
      // {
      //   path: '/stuclass/video/player',
      //   name: 'VideoPlayer',
      //   component: VideoPlayer
      // },
      {
        path: '/stuclass/homework',
        name: 'Homework',
        component: Homework
      },
      {
        path: '/stuclass/homework/detail',
        name: 'HomeworkDetail',
        component: HomeworkDetail
      },
      {
        path: '/stuclass/disscuss',
        name: 'Disscuss',
        component: Disscuss,
        // children: [
          
        // ]
      },
      {
        path: '/stuclass/disscuss/comments',
        name: 'Comments',
        component: Comments,
      },
      {
        path: '/stuclass/disscuss/push',
        name: 'Push',
        component: Push,
      }
    ]
  },
  {
    path: '/player',
    name: 'VideoPlayer',
    component: VideoPlayer
  },
  {
    path: '/teahome',
    name: 'TeaHome',
    component: TeaHome,
    children: [
      {
        path: '/teahome',
        redirect: '/teahome/classlist'
      },
      {
        path: '/teahome/classlist',
        name: 'ClassListTea',
        component: ClassListTea
      },
      {
        path: '/teahome/saftypg',
        name: 'SaftyPgTea',
        component: SaftyPg
      },
      {
        path: '/teahome/meglist',
        name: 'MegClassList',
        component: MegClassList
      },
      {
        path: '/teahome/meglist/menageclass',
        name: 'MenageClass',
        component: MenageClass
      },
      {
        path: '/teahome/addnew',
        name: 'AddNewClass',
        component: AddNewClass
      }
    ]
  },
  {
    path: '/teaclass',
    name: 'TeaClass',
    component: TeaClass,
    children: [
      {
        path: '/teaclass/announcement',
        name: 'AnnouncementTea',
        component: AnnouncementTea
      },
      {
        path: '/teaclass/announcement/addnew',
        name: 'AddNewAnc',
        component: AddNewAnc,
      },
      {
        path: '/teaclass/video',
        name: 'VideoTea',
        component: VideoTea
      },
      {
        path: '/teaclass/video/newvio',
        name: 'AddNewVideo',
        component: AddNewVideo
      },
      // {
      //   path: '/stuclass/video/player',
      //   name: 'VideoPlayer',
      //   component: VideoPlayer
      // },
      {
        path: '/teaclass/homework',
        name: 'HomeworkTea',
        component: HomeworkTea
      },
      {
        path: '/teaclass/homework/newwork',
        name: 'AddNewWork',
        component: AddNewWork
      },
      {
        path: '/teaclass/homework/paper',
        name: 'Paper',
        component: Paper,
        children: [
          {
            path: '/teaclass/homework/paper/detail',
            name: 'CheckView',
            component: CheckView
          },
        ]
      },
      {
        path: '/teaclass/disscuss',
        name: 'DisscussTea',
        component: DisscussTea,
        // children: [
          
        // ]
      },
      {
        path: '/teaclass/disscuss/comments',
        name: 'CommentsTea',
        component: Comments,
      },
      {
        path: '/teaclass/disscuss/push',
        name: 'PushTea',
        component: Push,
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
