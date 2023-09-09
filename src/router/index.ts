import {RouteRecordRaw, createRouter, createWebHistory} from 'vue-router'
import HelloWorld from "../components/HelloWorld.vue";
import Skilltree from "../components/Skilltree.vue";

const routes: Array<RouteRecordRaw> = [
  {path: '/Elysium/', name: 'Main', component: HelloWorld},
  {path: '/Elysium/skills', name: 'Skills', component: Skilltree}
]

const router = createRouter({history: createWebHistory(), routes})

export default router
