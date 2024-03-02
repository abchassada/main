<template>
  <div class="mainContainer">
      <div class="table-container">
        <div class="menu-item">
            <h1 class="center">项目</h1>
            <ul>
                <li v-for="(item, index) in items" :key="index" @click="handleClick(item)" class="menu-item">
                {{ item.name }}
                </li>
            </ul>
        </div>
      </div>
      <div class="divider"></div>
    <div class="custom-select">
      <label for="select1">gpu</label>
      <select id="select1" v-model="selectedOption1">
        <option v-for="(item,index) in selectedOption1" :key="index">{{ item }}</option>
      </select>
    </div>
    <div class="custom-select">
      <label for="select2">hostname</label>
      <select id="select2" v-model="selectedOption2">
        <option v-for="(item,index) in selectedOption2" :key="index">{{ item }}</option>
      </select>
    </div>
    <div class="custom-select">
      <label for="select3">pod</label>
      <select id="select3" v-model="selectedOption3">
        <option v-for="(item,index) in selectedOption3" :key="index">{{ item }}</option>
      </select>
    </div>
  </div>
</template>

<script>

export default {
  name:'HomeView',
  data() {
    return {
      selectedOption1: ['1','2','3'],
      selectedOption2: ['1','2','3'],
      selectedOption3: ['1','2','3'],
      items: [
        {name:"project1"},
        {name:"project2"},
        {name:"project3"}
      ] // 从后端获取的数据
    };
},
methods: {
    handleClick() {
      // 处理点击事件
    }
  }

};
</script>

<style>
.mainContainer {
  display: flex;
  align-items: flex-start;
}

.tableContainer {
  flex:1;
  margin-top: 20px; /* 上边距 */
  margin-bottom: 20px; /* 下边距 */
  width: 200px; /* 设定容器宽度 */
  height:100%;
  border-right:1px solid;
}
.table-container {
  display: flex;
}
.menu-item {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 10px;
  cursor: pointer;
  text-align: center;
}

.menu-item h1 {
  margin: 0;
}

.menu-item ul {
  padding: 0;
  list-style-type: none;
}

.menu-item li {
  cursor: pointer;
}
table {
  width: 100%;
  border-collapse: collapse;
}

td,th {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th{
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
.bold{
  font-weight: bold;
}

.center {
  text-align: center; /* 水平居中 */
  vertical-align: middle; /* 垂直居中 */
}

.custom-select {
  margin-left: 20px;
}

.custom-select select {
  width: 150px; /* 根据需要调整下拉选择框的宽度 */
}

.custom-select-label {
  font-weight: bold;
}
</style>
