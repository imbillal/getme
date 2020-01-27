// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import firebase from 'firebase';
import Vue from 'vue'
import App from './App'
import router from './router'
import jQuery from "jquery";
import VueResource from "vue-resource"
// import { firestorePlugin } from 'vuefire'


Vue.use(VueResource);



// Required for side-effects
require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyD99BHLM7H_kEkkax2x1uWb2-WafPgIFIA",
    authDomain: "withlogin-2cf05.firebaseapp.com",
    databaseURL: "https://withlogin-2cf05.firebaseio.com",
    projectId: "withlogin-2cf05",
    storageBucket: "withlogin-2cf05.appspot.com",
    messagingSenderId: "900206055652",
    appId: "1:900206055652:web:85f57d5daa258334d29cf1",
    measurementId: "G-K8W9ZPNZVL"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// var db = ;

var db = firebase.firestore();
window.db =  db;


window.jQuery = window.$ = jQuery
require('bootstrap/dist/css/bootstrap.css')


// Vue.use(firestorePlugin)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
