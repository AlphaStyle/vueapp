<template>
  <div class="loginform my-green">
  <h1 class="my-textalign">{{ msg }}</h1>
    <validator name="loginVal">
      <form novalidate class="container" v-on:submit.prevent="onSubmit" accept-charset="utf-8">
      
        <div class="input-field">
          <input v-model="username" id="username" type="text" class="validate" v-validate:userval="{ required: true, minlength: 4 }">
          <label for="username">*Username</label>
        </div>
        
        <div class="input-field">
          <input v-model="password" id="password" type="password" class="validate" v-validate:passval="{ required: true, minlength: 4 }">
          <label for="password">*Password</label>
        </div>
        
        <button class="btn waves-effect waves-light" type="submit" v-if="$loginVal.valid">Login
          <i class="material-icons right">send</i>
        </button>
        
        <div class="my-error">
          <p v-show="$loginVal.userval.required">*Username is required</p>
          <p v-show="$loginVal.userval.minlength & !$loginVal.userval.required">
          *Username need to be at least 4 characters long.</p>
          
          <p v-show="$loginVal.passval.required">*Password is required</p>
          <p v-show="$loginVal.passval.minlength & !$loginVal.passval.required">
          *Password need to be at least 4 characters long.</p>
        </div>
        
      </form>  
    </validator>         
  </div>  
</template>

<script>
export default {
  data () {
    return {
      msg: 'Login',
      username: '',
      password: ''
    }
  },

  methods: {
    onSubmit () {
      this.username = ''
      this.password = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginform {
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
.my-error{
  color: red;
}
.container {
  width: 500px
}

.my-textalign {
  text-align: center;
}
</style>
