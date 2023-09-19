import {RouteRecordRaw, createRouter, createWebHashHistory} from 'vue-router'
import HelloWorld from "../components/HelloWorld.vue";
import Skilltree from "../components/Skilltree.vue";
import ResearchTree from "../components/ResearchTree.vue";

const routes: Array<RouteRecordRaw> = [
  {path: '/', name: 'Main', component: HelloWorld},
  {path: '/Skills', name: 'Skills', component: Skilltree},
  {path: '/NihiResearch', name: 'Nihilim Research', component: ResearchTree},
]

const router = createRouter({history: createWebHashHistory(), routes})

export default router
