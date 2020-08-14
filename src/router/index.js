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
      {
        path: '/stuclass/homework',
        name: 'Homework',
        component: Homework
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
  }
]

const router = new VueRouter({
  routes
})

export default router
