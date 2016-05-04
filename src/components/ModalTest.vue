<template>
  <div id="my-modal">
    <button id="show-modal" @click="showModal = true" href="#modal1">Show Modal</button>
    <!-- use the modal component, pass in the prop -->
    <modal :show.sync="showModal">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot="header">custom header</h3>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
import Modal from './Modal.html'
Vue.component('modal', {
  template: Modal,
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  }
})
export default {
  el () {
    '#my-modal'
  },
  data () {
    return {
      showModal: false
    }
  }
}
</script>
</body>
</html>