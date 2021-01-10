/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import store from './store/index';
import Axios from 'axios'
import Vue from 'vue'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform'

window.Form = Form;

import Gate from "./Gate";
Vue.prototype.$gate = new Gate(window.user);

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component('pagination', require('laravel-vue-pagination'));


import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { routes } from './routes';
import moment from 'moment';
import VueProgressBar from 'vue-progressbar'

import Swal from 'sweetalert2'
window.Swal = Swal

const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
window.toast = toast

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})


const router = new VueRouter({
    routes:routes, // short for `routes: routes`
    mode: 'history',
  })


Vue.filter('upText', function(text){
  return text.charAt(0).toUpperCase() + text.slice(1)
});

Vue.filter('myDate',function(created){
  return moment(created).format('MMMM Do YYYY');
});


window.Fire = new Vue();
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/NotFound.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/NotFound.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue').default
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue').default
);

Vue.component(
    'not-found',
    require('./components/NotFound.vue').default
);

const app = new Vue({
    el: '#app',
    router,
    store,
    data() {
      return {
          name: this.$route.name
      }
  }
})
