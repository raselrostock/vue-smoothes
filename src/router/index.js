import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import AddSmoothe from '@/components/AddSmoothe';
import EditSmoothe from '@/components/EditSmoothe';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-smoothe',
      name: 'AddSmoothe',
      component: AddSmoothe
    },
    {
      path: '/edit-smoothe/:sm_slug',
      name: 'EditSmoothe',
      component: EditSmoothe
    }
  ]
});
