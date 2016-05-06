<template>
  <div id="app">
	  <div class="navbar-fixed my-manu">
	    <nav>
	      <div class="nav-wrapper teal lighten-2">
	        <ul class="left hide-on-med-and-down">
	          <li><a v-link="{ path: '/login' }">Login</a></li>
	          <li><a v-link="{ path: '/register' }">Register</a></li>
	          <li ><a v-link="{ path: '/admin' }">Admin</a></li>
	          <li ><a v-link="{ path: '/hello' }">Hello</a></li>
	          <li ><a v-link="{ path: '/blogs' }">Blogs</a></li>
	          <li ><a v-link="{ path: '/' }">Home</a></li>
	          <li ><a v-link="{ path: '/test' }">Test</a></li>
	        </ul>
	      </div>
	    </nav>
	  </div>
    <!-- route outlet -->
    <router-view></router-view>
  	<footer class="page-footer teal lighten-2">
	  <div class="container">
	    <div class="row">
	      <div class="col l6 s12">
	        <h5 class="white-text">Footer Content</h5>
	        <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
	      </div>
	    </div>
	  </div>
	  <div class="footer-copyright">
	    <div class="container">
	    AlphaStyle © 2014 Copyright Text
	    </div>
	  </div>
	</footer>
  </div>
</template>

<script>
import store from './vuex/store'
export default {
  store
}
</script>

 <style scoped>
  .my-sticky {
    display: flex;
    flex-direction: column;
    flex: 1 100%;
  }
  .my-menu {
  	display: flex;
  	flex-direction: row;
  	flex-wrap: wrap;
  }
</style>
