<template>
  <div class="registerform my-green">
    <h1 class="my-textalign">{{ msg }}</h1>
  </div>
  <div class="registerform my-green">
    <form class="container" v-on:submit.prevent="onSubmit" accept-charset="utf-8">
      <div class="input-field">
        <input required="" v-model="username" id="username" type="text" class="validate">
        <label for="username">Username</label>
      </div>
      <div class="input-field">
        <input required="" v-model="password" id="password" type="password" class="validate">
        <label for="password">Password</label>
      </div>
      <div class="input-field">
        <input required="" v-model="email" id="email" type="email" class="validate">
        <label for="password">Email</label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">Login
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Register',
      username: '',
      password: '',
      email: '',
      logintest: 'You are logged in as: '
    }
  },

  methods: {
    onSubmit () {
      this.logintest = 'You are logged in as: ' + this.username + ' ' + this.password + ' ' + this.email
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
.container {
  width: 500px
}
.my-textalign {
  text-align: center;
}
</style>
