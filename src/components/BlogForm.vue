<template>
<div class="blogForm my-green">
  <validator name="blogFormVal">
    <form class="my-container" v-on:submit.prevent="addBlog(author, title, content), clearForm()" accept-charset="utf-8">
    
      <div class="input-field">
        <input v-validate:validAuthor="['required']" v-model="author" id="author" type="text" class="validate">
        <label for="author">*Author</label>
      </div>
      
      <div class="input-field">
        <input v-validate:validTitle="['required']" v-model="title" id="title" type="text" class="validate">
        <label for="title">*Title</label>
      </div>
      
      <div class="input-field">
        <textarea v-validate:validContent="['required']" v-model="content" id="content" type="text" class="materialize-textarea"></textarea>
        <label for="content">*Content</label>
      </div>
      
      <p v-show="!$blogFormVal.valid" class="my-red">*All fields are required!</p>
      
      <button class="btn waves-effect waves-light" type="submit" v-if="$blogFormVal.valid">Publish
        <i class="material-icons right">publish</i>
      </button>
      
    </form>
  </validator>
</div>
</template>

<script>
import { addBlog } from '../vuex/actions.js'
export default {
  data () {
    return {
      author: '',
      title: '',
      content: ''
    }
  },
  methods: {
    clearForm () {
      this.author = ''
      this.title = ''
      this.content = ''
    }
  },
  vuex: {
    actions: {
      addBlog
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blogForm {
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
.my-red{
  color:red;
}
.my-container {
  display: flex-inline;
  justify-content: center;
  align-content: center;
  align-self: center;
  width: 500px
}
.my-textalign {
  text-align: center;
}
</style>
