<template>
  <div class="registerform my-green">
    <h1 class="my-textalign">{{ msg }}</h1>
  </div>
  <div class="registerform my-green">
    <validator name="registerVal">
      <form class="container" v-on:submit.prevent="onSubmit" accept-charset="utf-8">
      
        <div class="input-field">
          <input required="" v-model="username" id="username" type="text" class="validate" v-validate:userval="{ required: true, minlength: 4 }">
          <label for="username">*Username</label>
        </div>
        
        <div class="input-field">
          <input required="" v-model="password" id="password" type="password" class="validate" v-validate:passval="{ required: true, minlength: 4 }">
          <label for="password">*Password</label>
        </div>
        
        <div class="input-field">
          <input required="" v-model="email" id="email" type="email" class="validate" v-validate:emailval="['email']">
          <label for="email">*Email</label>
        </div>
        
        <button class="btn waves-effect waves-light" type="submit" v-if="$registerVal.valid">Register
          <i class="material-icons right">send</i>
        </button>
        
        <div class="my-error">
          <p v-show="$registerVal.userval.required">*Username is required</p>
          <p v-show="$registerVal.userval.minlength & !$registerVal.userval.required">
          *Username need to be at least 4 characters long.</p>
          
          <p v-show="$registerVal.passval.required">*Password is required</p>
          <p v-show="$registerVal.passval.minlength & !$registerVal.passval.required">
          *Password need to be at least 4 characters long.</p>
          
          <p v-show="$registerVal.emailval.email">*Email is required</p>
        </div>
        
      </form>
    </validator>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Register',
      username: '',
      password: '',
      email: ''
    }
  },

  methods: {
    onSubmit () {
      this.username = ''
      this.password = ''
      this.email = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registerform {
  /*border: solid 1px;*/
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex-inline;
  flex-direction: column;
  flex-wrap: wrap;
  font-family: 'Roboto', sans-serif;
}
.my-green {
  color: #42b983;
}
.my-error {
  color: red;
}
.container {
  width: 500px
}
.my-textalign {
  text-align: center;
}
</style>
