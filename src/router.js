import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Grid from '~components/Grid.vue'
import NotFound from '~components/NotFound.vue'
import UserPage from '~components/UserPage.vue'

const routes = [
	{ path: '/', name: 'home', component: Grid },
	{ path: '/page/:id', name: 'page', component: Grid },
	{ path: '/user/:username', name: 'user', component: UserPage },
	{ path: '*', name: 'not-found', component: NotFound }
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router