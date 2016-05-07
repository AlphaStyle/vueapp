<template>
  <div class="my-main container">
    <div class="my-header">
      <h1>{{ msg }}</h1>
    </div>
    <div class="my-card">
      <div v-for="(key, value) in blogs">  <!-- | orderBy 'ID' -1 -->
        <div class="row">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">{{ value.Title }}</span>
              <p>Author: {{ value.Author }} ID: {{ value.ID }} key: {{ key }}</p>
              <p>{{ value.Content }}</p>
            </div>

            <div class="card-action">
              <a @click.prevent='deleteBlog(value.ID, key)' href="">Delete</a>
              <a @click.prevent="showModal = true, 
                editTitle = value.Title, 
                editAuthor = value.Author, 
                editContent = value.Content,
                editKey = key,
                editId = value.ID"
                href="">Edit</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <!-- use the modal component, pass in the prop -->
    <modal 
      :show.sync="showModal" 
      :title.sync="editTitle" 
      :author.sync="editAuthor" 
      :content.sync="editContent"
      :eid.sync="editId"
      :ekey.sync="editKey">

      <div slot="title">
        <label for="title">Title</label>
        <input v-model="editTitle" class="input-field validate">
      </div>

      <div slot="author">
        <label for="author">Author</label>
        <input v-model="editAuthor" class="input-field validate">
      </div>

      <div slot="content">
        <label for="content">Content</label>
        <textarea v-model="editContent" class="materialize-textarea"></textarea>
      </div>

      <div slot="footer">
        Click save or cancel
        <button class="modal-default-button btn waves-effect waves-light"
        @click="editBlog(editAuthor, editTitle, editContent, editKey, editId), showModal = false">
        Save
      </button>

      <button class="modal-default-button btn waves-effect waves-light"
        @click="showModal = false">
        Cancel
      </button>
      </div>
    </modal>
  </div>
</template>

<script>
import { editBlog, deleteBlog, loadBlogs } from '../vuex/actions.js'
import Modal from './Modal.html'

export default {
  data () {
    return {
      msg: 'Blogs!',
      showModal: false,
      editTitle: '',
      editAuthor: '',
      editContent: '',
      editId: 0,
      editKey: 0
    }
  },
  ready () {
    loadBlogs()
  },
  components: {
    modal: {
      template: Modal,
      props: {
        show: {
          type: Boolean,
          required: true,
          twoWay: true
        },
        title: {
          type: String,
          required: true
        },
        author: {
          type: String,
          required: true
        },
        content: {
          type: String,
          required: true
        },
        eid: {
          type: Number,
          required: true
        },
        ekey: {
          type: Number,
          required: true
        }
      }
    }
  },
  vuex: {
    getters: {
      blogs: state => state.blogs
    },
    actions: {
      deleteBlog,
      editBlog
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-main {
  color: #42b983;
  /*border: solid 1px;*/
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex-inline;
  flex-wrap: wrap;
  font-family: 'Roboto', sans-serif;
  flex-direction: column;
}
.my-card {
  display: flex;
  align-self: center;
  width: 500px;
  flex-direction: column;
}
.my-header {
  align-content: center;
  align-self: center;
}
</style>