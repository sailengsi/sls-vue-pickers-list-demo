import Vue from 'vue'
import Router from 'vue-router'
import List from '../pages/List'
import Index from '../pages/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Index
    }
  ]
})
