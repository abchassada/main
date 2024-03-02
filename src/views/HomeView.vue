<template>
  <div class="custom-select-container">
      <div class="table-container">
        <table>
          <thead>
              <tr>
                <th class="bold center">项目</th>
              </tr>
            </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index" @click="handleClick(item)">
              <td class="center">{{ item.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    <div class="custom-select">
      <div class="custom-select-label">标签1：</div>
      <select v-model="selectedOption1">
        <option value="">请选择</option>
        <option value="option1">选项1</option>
        <option value="option2">选项2</option>
        <option value="option3">选项3</option>
      </select>
    </div>
    <div class="custom-select">
      <div class="custom-select-label">标签2：</div>
      <select v-model="selectedOption2">
        <option value="">请选择</option>
        <option value="option1">选项1</option>
        <option value="option2">选项2</option>
        <option value="option3">选项3</option>
      </select>
    </div>
    <div class="custom-select">
      <div class="custom-select-label">标签3：</div>
      <select v-model="selectedOption3">
        <option value="">请选择</option>
        <option value="option1">选项1</option>
        <option value="option2">选项2</option>
        <option value="option3">选项3</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name:'HomeView',
  data() {
    return {
      selectedOption1: '',
      selectedOption2: '',
      selectedOption3: '',
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
.custom-select-container {
  display: flex;
  align-items: flex-start;
}

.table-container {
  margin-top: 20px; /* 上边距 */
  margin-bottom: 20px; /* 下边距 */
  width: 200px; /* 设定容器宽度 */
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
