<template>
  <div class="container hello">
      <div class="row justify-content-center">
         <div class="col-6">
            <div class="msg-box">
               <div class="single-msg" v-for="personName in post">
                  <div class="msg">{{personName.name}}</div>
               </div>
            </div>
            <div class="input-group">
               <input type="text" class="form-control" v-model="name">
               <div class="input-group-append">
                  <button @click='submitName'>Send Message</button>
               </div>
            </div>
            <p v-if="showMsg">Type your Message</p>
         </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name: '',
      post: [],
      showMsg: false
    }
  },
  created() {
    this.$http.get('https://test-app-5b863.firebaseio.com/posts.json').then( function(data){
      return data.json()
    })
    .then(function(data){

      for( var key in data){
        data[key].id = key

        this.post.push(data[key])
      }
    })
  },
  methods: {
    submitName(){
      if(this.name.trim()){
         this.$http.post('https://test-app-5b863.firebaseio.com/posts.json', {
           name: this.name
         }).then( function(data){
           this.name = ''
           this.$http.get('https://test-app-5b863.firebaseio.com/posts.json')
             .then( function(data){
               return data.json()
             })
             .then(function(data){
               this.post = data
               for( var key in this.post){
                 this.post[key].id = key
                 this.post = data
               }
             })
         })

      }else{
         this.showMsg = true
      }
    }
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
}
.input-group{
   margin-top: 20px;
}
</style>
