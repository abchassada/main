<template>
  <div class="container">
    <HomeView />
    <!-- <barComponentVue /> -->
  </div>
</template>
<script>
import HomeView from './views/HomeView.vue';
export default {
  components:{
    HomeView
  }
}
</script>
<style>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.HomeView {
  flex: 1;
  height:100%;
}
*{	
	margin : 0;
	padding : 0;
}
</style>
