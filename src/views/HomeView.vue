<template>
  <el-container class="home-container">
    <el-header>
      <h1>xxxx系统</h1>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <menuComponent @sendJobId="receiveJobId"/>
      </el-aside>
      <el-main>
        <listComponent :present="presentJobId"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import menuComponent from '../components/menuComponent.vue';
import listComponent from '../components/listComponent.vue';
export default {
  name: 'HomeView',
  data(){
    return{
      presentJobId:'',
    }
  },
  components:{
    menuComponent,
    listComponent
  },
  methods:{
    receiveJobId(data){
      this.presentJobId=data;
      console.log('present!'+data);
    }
  }
}
</script>
<style>
h1{
  text-align: left;
}
.home-container{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  height:100%;
}
*{	
	margin : 0;
	padding : 0;
}
  .el-header{
    color: #131212;
    text-align: left;
    line-height: 60px;
    border-bottom:hsl(0, 0%, 86%) 1px solid;
    background-color:#ECF4FC;
  }

  .el-aside {
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
