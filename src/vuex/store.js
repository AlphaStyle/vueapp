/* eslint-disable */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.debug = true

var id = 0
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
      console.log('Blog saved successfully.')
    })
    .catch(function (data, status, request) {
      console.log('There was a problem saving this Blog. Might be server problems. Please try again.')
    })
  },

  DELETE_BLOG (state, dbKey, arrKey) {
    delete state.blogs.splice(arrKey, 1)
    console.log('db key ' + dbKey)
    Vue.http.post('http://localhost:9000/api/deleteblog', {
      Author: 'author',
      Title: 'title',
      Content: 'content',
      ID: dbKey
    })
    .then(function (data, status, request) {
      console.log('Blog Deleted successfully.')
    })
    .catch(function (data, status, request) {
      console.log('There was a problem deleting this Blog. Might be server problems. Please try again.')
    })
    console.log('arr key ' + arrKey)
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
        console.log('id ' + id)
        console.log('blogID ' + blogs[n].ID)
        if (blogs[n].ID > tempID) {
          tempID = blogs[n].ID + 1
        }
      }
      console.log('tempID ' + tempID)
      id = tempID
      console.log('new id ' + id)
    }, function (response) {
      // error callback
      console.log(response)
    })
  },
  
  EDIT_BLOG (state, editAuthor, editTitle, editContent, editKey, editId) {
    console.log('editKey: ' + editKey)
    console.log(state.blogs[editKey])
    console.log('editId: ' + editId)
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
      console.log('Blog Edit successfully.')
    })
    .catch(function (data, status, request) {
      console.log('There was a problem Editing this Blog. Might be server problems. Please try again.')
    })
  }
}

export default new Vuex.Store({
  state,
  mutations
})
