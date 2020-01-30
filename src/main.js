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
    apiKey: "AIzaSyAlhB1Rh4cCVwUtFZaHcy-wX4idHZcKbgU",
    authDomain: "getmsg.firebaseapp.com",
    databaseURL: "https://getmsg.firebaseio.com",
    projectId: "getmsg",
    storageBucket: "getmsg.appspot.com",
    messagingSenderId: "1085089632362",
    appId: "1:1085089632362:web:ce7e359a8e50ab8b017a13",
    measurementId: "G-6CLH0B43GY"
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
