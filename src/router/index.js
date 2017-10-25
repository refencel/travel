import Vue from 'vue'
import Router from 'vue-router'
import travel from '@/components/travel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'travel',
      component: travel
    }
  ]
})
