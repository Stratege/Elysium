import {RouteRecordRaw, createRouter, createWebHashHistory} from 'vue-router'
import HelloWorld from "../components/HelloWorld.vue";
import Skilltree from "../components/Skilltree.vue";
import ResearchTree from "../components/ResearchTree.vue";


const routes: Array<RouteRecordRaw> = [
  {path: '/', name: 'Main', component: HelloWorld},
  {path: '/Skills', name: 'Skills', component: Skilltree},
  {path: '/NihilimResearch', name: 'Nihilim Research', component: ResearchTree, props: _ => ({faction:'Nihilim'})},
  {path: '/CovenantResearch', name: 'Covenant Research', component: ResearchTree, props: _ => ({faction:'Covenant'})},
  {path: '/ThulResearch', name: 'Thul Research', component: ResearchTree, props: _ => ({faction:'Thul'})},
]

const router = createRouter({history: createWebHashHistory(), routes})

export default router
