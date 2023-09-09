import {RouteRecordRaw, createRouter, createWebHashHistory} from 'vue-router'
import HelloWorld from "../components/HelloWorld.vue";
import Skilltree from "../components/Skilltree.vue";

const routes: Array<RouteRecordRaw> = [
  {path: '/', name: 'Main', component: HelloWorld},
  {path: '/Skills', name: 'Skills', component: Skilltree}
]

const router = createRouter({history: createWebHashHistory(), routes})

export default router
