import Dashboard from './components/Dashboard.vue'
import Profile from './components/Profile.vue'
import User from './components/Users.vue'
import Developer from './components/Developer.vue'

export const routes = [
    {
        path:'/dashboard',
        component:Dashboard
    },
    {
        path:'/profile',
        component:Profile
    },
    { 
        path:'/users',
        component:User
    },
    { 
        path:'/developer',
        component:Developer
    },

];