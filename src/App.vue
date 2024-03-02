<template>
  <div class="container">
    <HomeView />
    <barComponentVue />
  </div>
</template>
<script>
import HomeView from './views/HomeView.vue';
import barComponentVue from './components/barComponent.vue';
export default {
  components:{
    HomeView,
    barComponentVue
  }
}
</script>
<style>
.container {
  display: flex;
}

HomeView {
  flex: 1;
  width: 10%;
}

barComponentVue {
  flex: 9;
  width: 90%;
}
</style>
