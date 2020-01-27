<template>
  <div class="container hello">
      <div class="row justify-content-center">
          <div class="col-6">
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="newUser.name" class="form-control" id="name" placeholder="Type Your Name">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="newUser.email" class="form-control" id="email" placeholder="Type Your Name">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" v-model="newUser.password" class="form-control" id="password" placeholder="Type Your Name">
              </div>
              <p class="" v-if="getPassword">minimum 5 characters password required</p>

              <button @click="regNewUser" class="btn btn-primary">Register</button>
	              <router-link  to="/login" class="btn bt-success"> <button class="btn btn-success">Login</button> </router-link>
            </form>
              <!-- <button class="btn btn-success" to="/login">Login</button> -->
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      newUser: {},
      corrEmail: "",
      getPassword: false
    }
  },
  methods: {
    regNewUser(e){
    	e.preventDefault()
      if(this.newUser.name.trim() && this.newUser.email.trim() && this.newUser.password.length > 5){
         this.$http.post('https://test-app-5b863.firebaseio.com/registerdData.json', {
           name: this.newUser.name,
           email: this.newUser.email,
           password: this.newUser.password
         }).then( function(data){
           this.newUser.name = ''
           this.newUser.email = ''
           this.$router.push('/login')
         })

         this.getPassword = false

      }else if(this.newUser.password.length < 5){
      	this.getPassword = true
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
