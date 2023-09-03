import {RouteRecordRaw, createRouter, createWebHistory} from 'vue-router'
import HelloWorld from "../components/HelloWorld.vue";

const routes: Array<RouteRecordRaw> = [
  {path: '/', name: 'Main', component: HelloWorld}
]

const router = createRouter({history: createWebHistory(), routes})

export default router
