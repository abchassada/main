<template>
  <div class="container">
    <el-scrollbar
      ref="scrollbarRef"
      class="projectMenu"
      always="boolean"
      @scroll="scroll"
      h-bar="false"
    >
      <el-form :model="form" label-width="auto" label-position="left">
        <div class="inputBlock">
          <el-form-item label="任务名称" style="margin-top: 20px" required >
            <el-input v-model="form.name" style="width: 1000px" />
          </el-form-item>
          <el-form-item label="命名空间" required>
            <el-input v-model="form.namespace" />
          </el-form-item>
        </div>
        <div class="inputBlock">
          <el-form-item label="运行Pod数量" style="margin-top: 20px" required>
            <el-input v-model="form.replicas" />
          </el-form-item>
          <el-form-item label="运行类型" required>
            <el-input v-model="form.runningType" />
          </el-form-item>
          <el-form-item label="用户名" required>
            <el-input v-model="form.username" />
          </el-form-item>
          <!-- <el-form-item label="依赖数据集">
            <el-input v-model="form.dataSets" />
          </el-form-item>
          <el-form-item label="数据依赖关系">
            <el-input v-model="form.relationShips" />
          </el-form-item>
          <el-form-item label="Pod定义">
            <el-input v-model="form.template" />
          </el-form-item> -->
          <el-form-item label="乘加指令数" required>
            <el-input v-model="form.macs" />
          </el-form-item>
          <el-form-item label="参数量" required>
            <el-input v-model="form.params" />
          </el-form-item>
          <el-form-item label="BatchSize" required>
            <el-input v-model="form.batchSize" />
          </el-form-item>
          <el-form-item label="稀疏特征维度" required>
            <el-input
              v-model="form.vocabulary_size"
              placeholder="请用 ' , ' 分隔数字"
            />
          </el-form-item>
          <el-form-item class="label-wrap" required>
            <template v-slot:label >
              <span class="multi-line-label" >Emmbeding层<br />输出维度</span>
            </template>
            <el-input
              v-model="form.embedding_dim"
              placeholder="请用 ' , ' 分隔数字"
            />
          </el-form-item>
          <el-form-item label="输入向量形状">
            <el-input
              v-model="form.input_tensor"
              placeholder="请用 ' , ' 分隔数字"
            />
          </el-form-item>
        </div>
        <div class="inputBlock">
          <el-form-item label="镜像名称" style="margin-top: 20px" required>
            <el-input v-model="form.docker_name" />
          </el-form-item>
        </div>
        <div class="centered">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
            <el-button @click="clearForm">清空</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  name: "",
  namespace: "",
  replicas: "",
  runningType: "",
  username: "",
  // dataSets: [],
  // relationShips: [],
  // template: "",
  macs: "",
  params: "",
  batchSize: "",
  vocabulary_size: [],
  embedding_dim: [],
  input_tensor: [],
  docker_name: "",
});

const onSubmit = () => {
  alert("创建成功!");
};

const clearForm = () => {
  for (let key in form) {
    if (Array.isArray(form[key])) {
      form[key] = [];
    } else {
      form[key] = "";
    }
  }
};
</script>


<style scoped>
.container {
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.el-scrollbar {
  max-height: 1000px;
  max-width: 1000px; /* 控制宽度，可以根据需要调整 */
  align-items: right;
  overflow-y: auto;
  overflow-x: hidden;
}
.el-form {
  max-width: 2000px;
  padding: 15px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5); /* 添加边框阴影效果 */
  margin-top: 75px;
  margin-left: 100px;
  margin-right: 100px;
  padding-left: 30px;
  padding-right: 30px;
  border: 1px solid #ccc; /* 添加边框样式 */
  border-radius: 5px; /* 可选：添加边框圆角 */
  /* background-color: #eafcfc; */

}
.el-text {
  text-align: right;
  font-weight: bold;
  margin-left: 50px;
  font-size: 20px;
}
.inputBlock {
  margin-bottom: 40px;
}
.centered {
  display: flex;
  justify-content: center;
}
.label-wrap .el-form-item__label {
  white-space: nowrap; /* 确保label不换行 */
}

.multi-line-label {
  display: inline-block; /* 设置为内联块级元素 */
  white-space: pre; /* 保留换行符 */
  line-height: 1.2; /* 设置行间距为1.5倍文字大小 */
}

.el-form-item__label {
  text-align: left; /* 文字右对齐 */
  font-size: 15px;
  font-weight: bold; /* 加粗文字 */
  font-family: Sans-serif;
}
.el-form-item{
  
}

</style>

