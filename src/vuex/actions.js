export const addBlog = ({ dispatch }, author, title, content) => {
  dispatch('ADD_BLOG', author, title, content)
}

export const deleteBlog = ({ dispatch }, id) => {
  dispatch('DELETE_BLOG', id)
}

export const editBlog = ({ dispatch }, editAuthor, editTitle, editContent, id) => {
  dispatch('EDIT_BLOG', editAuthor, editTitle, editContent, id)
}

import Vue from 'vue'

export const getBlogs = () => {
  // GET request
  Vue.http.get('http://localhost:9000/api/getblogs').then(function (response) {
    console.log(response.data)
    // TODO Add this into frontend
    // set data on vm
    // this.$set('someData', response.data)
  }, function (response) {
    // error callback
  })
}
