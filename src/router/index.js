import Vue from 'vue'
import Router from 'vue-router'
import vTree from '@/components/vTreeDemo'
import vInput from '@/components/vInputDemo'
import vForm from '@/components/vFormDemo'
import Tree from '@/components/treeDemo'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; 
Vue.use(Router)
Vue.use(ElementUI, {
  size: 'medium'// set element-ui default size
});

export default new Router({
  routes: [
    {
      path: '/',
      name: 'vTree',
      component: vTree,
    }
    ,
    {
      path: '/q',
      name: 'vInput',
      component: vInput
    },
    
    // {
    //   path: '/s',
    //   name: 'vSelect',
    //   component: vSelect
    // }
    ,
    {
      path: '/f',
      name: 'vForm',
      component: vForm
    },
    {
      path: '/t',
      name: 'Tree',
      component: Tree
    }
  ]
})
