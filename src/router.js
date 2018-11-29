import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Projects from './views/Projects.vue'
import NewProject from './views/NewProject.vue'
import About from './views/About'



Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/projects',
            name: 'Projects',
            component: Projects
        },
        {
            path: '/newproject',
            name: 'New Project',
            component: NewProject
        },
        {
            path: '/about',
            name: 'About',
            component: About
        }
    ]
})
