/* eslint-disable */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.debug = true

var id = 0 // init Global ID var
// The very first init state
const state = {
  blogs: [{
    Title: 'test',
    Author: 'test',
    Content: 'test',
    ID: id
  }]
}

const mutations = {
  ADD_BLOG (state, author, title, content) {
    state.blogs.push({
      Author: author,
      Title: title,
      Content: content,
      ID: id = id + 1
    })
    Vue.http.post('http://localhost:9000/api/addblog', {
      Author: author,
      Title: title,
      Content: content,
      ID: id
    })
    .then(function (data, status, request) {
      // Success
      console.log('Blog saved successfully.')
    })
    .catch(function (data, status, request) {
      // error callback
      console.log('There was a problem saving this Blog.')
    })
  },

  DELETE_BLOG (state, dbKey, arrKey) {
    delete state.blogs.splice(arrKey, 1)

    Vue.http.post('http://localhost:9000/api/deleteblog', {
      Author: 'author',
      Title: 'title',
      Content: 'content',
      ID: dbKey
    })
    .then(function (data, status, request) {
      // Success
      console.log('Blog Deleted successfully.')
    })
    .catch(function (data, status, request) {
      // error callback
      console.log('There was a problem deleting this Blog.')
    })
  },

  LOAD_BLOG (state) {
    Vue.http.get('http://localhost:9000/api/getblogs').then(function (response) {
      let tempID = 0
      var blogs = response.data
      for (var n in blogs) {
        if (blogs.hasOwnProperty(n)) {
          // TODO Ugly Quick Fix
          if (n == 0 && id == 0) {
            Vue.set(state.blogs[n], 'Author', blogs[n].Author)
            Vue.set(state.blogs[n], 'Title', blogs[n].Title)
            Vue.set(state.blogs[n], 'Content', blogs[n].Content)
            Vue.set(state.blogs[n], 'ID', blogs[n].ID)
          } else if (n > id) {
            state.blogs.push({
              Author: blogs[n].Author,
              Title: blogs[n].Title,
              Content: blogs[n].Content,
              ID: blogs[n].ID
            })
            id = id + 2
          } else if (n == id) {
            state.blogs.push({
              Author: blogs[n].Author,
              Title: blogs[n].Title,
              Content: blogs[n].Content,
              ID: blogs[n].ID
            })
            id++
          }
        }
        if (blogs[n].ID > tempID) {
          tempID = blogs[n].ID + 1
        }
      }
      id = tempID
    }, function (response) {
      // error callback
      console.log('Error in LoadBlog mutation')
      console.log(response)
    })
  },
  
  EDIT_BLOG (state, editAuthor, editTitle, editContent, editKey, editId) {
    Vue.set(state.blogs[editKey], 'Author', editAuthor)
    Vue.set(state.blogs[editKey], 'Title', editTitle)
    Vue.set(state.blogs[editKey], 'Content', editContent)
    
    Vue.http.post('http://localhost:9000/api/editblog', {
      Author: editAuthor,
      Title: editTitle,
      Content: editContent,
      ID: editId
    })
    .then(function (data, status, request) {
      // Success
      console.log('Blog Edit successfully.')
    })
    .catch(function (data, status, request) {
      // error callback
      console.log('There was a problem Editing this Blog.')
    })
  }
}

export default new Vuex.Store({
  state,
  mutations
})
