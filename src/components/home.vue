<template>
  <div class="container hello">
      <div class="row justify-content-center">
         <div class="col-12 col-lg-8">
            <div class="chat-box">
               <p class="recever-name">Sender Name</p>
               <div class="msg-section">
                  <div v-for="message in messages">
                     <div class="single-msg" :class="message.data().userName === userName.displayName?'sent-msg':'receive-msg'">
                        <div class="msg">{{message.data().message}}</div>
                        <span class="time">{{getTime(message)}}  </span> <span class="name" v-if="message.data().userName !== userName.displayName">- {{message.data().userName}}</span>
                        <span class="dlt-btn" @click="dltMsg(message)" v-if="message.data().userName === userName.displayName">&times</span>

                     </div>
                  </div>
               </div>
               <div class="input-group">
                  <input type="text" class="form-control" v-model="message" placeholder="Type Your Message" v-on:keyup.enter="submitName">
               </div>
            </div>
            <p v-if="showMsg">Type your Message</p>
         </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase'
var moment = require('moment')
export default {
   name: 'privateChat',
   data () {
      return {
         message: '',
         userName: {},
         messages: [],
         post: [],
         showMsg: false
      }
   },
   methods: {
      scrollToBottom(){
         var box = $('.msg-section')[0]
          box.scrollTop = box.scrollHeight;
      },
      submitName(){
         db.collection("chat").add({
            message: this.message,
            userName: this.userName.displayName,
            time: new Date()
         })
         .then(()=>{
            this.scrollToBottom()
         })
         this.message = ''
      },

      getmessage(){
         db.collection("chat").orderBy('time').onSnapshot((querySnapshot) => {
            var allmsg = [];

            querySnapshot.forEach((doc) => {
               allmsg.push(doc)
            });
            this.messages = allmsg

            setTimeout( ()=> {
               this.scrollToBottom();
            },50)
         });
      },
      getTime: function(message){
         var date =  new Date(message.data().time.seconds * 1000)
         return moment(date).format('MMM DD, YYYY. hh mm A')
      },
      dltMsg(message){
         db.collection("chat").doc(message.id).delete().then(function() {
         }).catch(function(error) {
         });
      }
   },
   created() {
      firebase.auth().onAuthStateChanged( userName => {
         if(userName){
            this.userName = userName
         }else{
            this.userName = {}
         }
      })
      this.getmessage()
   },
   beforeRouteEnter(to,from,next){
      next( vm => {
         firebase.auth().onAuthStateChanged(user => {
            if(user){
               return next();
            }else{
               vm.$router.push('/login')
            }
         })
      })
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.single-msg{
   background: #eee;
   margin-bottom: 5px;
   padding: 4px 10px;
   border-radius: 6px;
   color: #444;
   width: 70%;
   margin-bottom: 10px;
   position: relative;
}
.input-group input{
   border-radius: 0;
   border: none;
   border-top: 1px solid #ddd;
   margin-top: 10px;
}
.sent-msg{
   background: #03A9F4;
   color: #fff;
   float: right;
}
.receive-msg{
   float: left;
}
.chat-box{
   margin-top: 20px;
   border: 1px solid #ddd;
   padding: 20px 10px;
   padding-top: 0;
   padding-bottom: 0;
}
.msg-section{
   height: 400px;
   overflow-y: scroll;
}
.recever-name{
   padding: 10px 0;
   margin: 0;
   margin-bottom: 5px;
   border-bottom: 1px solid #ddd;
}
.time{
   font-size: 10px;
}
.name{
   font-size: 12px;
}
.dlt-btn{
   color: #fff;
   top: 50%;
   font-weight: bold;
   font-size: 18px;
   position: absolute;
   top: 0;
   right: 5px;
   cursor: pointer;
}

::-webkit-scrollbar{
   display: none;
}

@media max-width(767px){
   .chat-box{
      background: red;
   }
}
</style>
