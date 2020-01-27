 <template>
    <div class="container text-center">
      <div class="row justify-content-center">
         <div class="col-6 login-section">
            <h3>Please login with your google account to continue</h3>
            <button @click="login" class="btn btn-primary">Login with Google</button>
         </div>
      </div>
    </div>
 </template>
<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data () {
    return {
      newUser: {},
      corrEmail: "",
      invalidData: false
    }
  },
  methods: {
    login(){

      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

      firebase.auth().signInWithPopup(provider).then( result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        this.$router.push('/home')
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-section{
  margin-top: 50px;
  border: 1px solid #ddd;
  padding: 20px;
}
button{
  margin-top: 20px;
}
</style>
