<template>
  <div class="container">
    <v-form
      :model="form"
      label-width="auto"
      style="background-color: rgba(228, 245, 255, 0.25)"
      @submit.prevent
    >
      <div class="inputBlock">
        <v-text-field
          label="任务名称"
          class="label-class"
          v-model="form.name"
          :rules="nameRules"
        />
        <v-text-field
          label="命名空间"
          class="label-class"
          v-model="form.namespace"
          required
        />
<v-text-field
          label="用户名"
          class="label-class"
          v-model="form.username"
        />
       
        <v-text-field
          label="乘加指令数"
          class="label-class"
          v-model="form.macs"
          placeholder="FLOPs=2Macs，单位为M"
        />
        <div class="flex-row align-center">
          <text>运行类型</text>
          <v-btn-toggle
            v-model="form.runningType"
            rounded="0"
            group
          >
            <v-btn value="one-shot">运行一次</v-btn>
            <v-btn value="long-running">循环运行</v-btn>
          </v-btn-toggle>
        </div>
        <div class="flex-row align-center">
          <text>运行Pod数量</text>
          <el-input-number
            v-model="form.replicas"
            :min="0"
            @change="handleChange"
          />
        </div>
        
        
      </div>
      <div class="inputBlock">
        <v-text-field
          label="参数量"
          class="label-class"
          placeholder="单位为K"
          v-model="form.params"
        />
        
        <v-text-field
          label="稀疏特征维度"
          class="label-class"
          required
          v-model="form.vocabulary_size"
          placeholder="请用 ' , ' 分隔数字"
        />
        <v-text-field
          class="label-wrap"
          required
          v-model="form.embedding_dim"
          placeholder="请用 ' , ' 分隔数字"
        >
          <template v-slot:label>
            <span class="multi-line-label">每个稀疏特征Emmbeding层输出维度</span>
          </template>
        </v-text-field>
        <v-text-field
          label="输入向量形状"
          class="label-class"
          v-model="form.input_tensor"
          placeholder="请用 ' , ' 分隔数字"
        />
        <v-text-field
          label="镜像名称"
          class="label-class"
          required
          v-model="form.docker_name"
        />
        <div class="flex-row align-center">
          <text>批次大小</text>
          <el-input-number
            v-model="form.batchSize"
            :min="0"
            @change="handleChange"
          />
        </div>
      </div>
      <div class="centered">
        <v-btn @click="onSubmit">创建</v-btn>
      </div>
      <div class="centered">
        <v-btn @click="clearForm">清空</v-btn>
      </div>
    </v-form>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import yaml from "js-yaml"; // 确保导入 js-yaml，使用它来处理 YAML 数据

const form = reactive({
  name: "",
  namespace: "",
  replicas: "",
  runningType: "",
  username: "",
  macs: "",
  params: "",
  batchSize: "",
  vocabulary_size: [],
  embedding_dim: [],
  input_tensor: [],
  docker_name: "",
});
const nameRules = [
  (value) => {
    if (value?.length > 0) return true;
    return "请输入任务名称";
  },
];

const onSubmit = () => {
  const yamlString = yaml.dump(form); // 使用 js-yaml 的 dump 方法转换表单数据
  const blob = new Blob([yamlString], { type: "text/yaml" });
  const downloadLink = document.createElement("a");
  downloadLink.download = form.name + ".yaml";
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
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
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 2000px;
}
.el-scrollbar {
  max-height: 700px;
  max-width: 3000px;
  align-items: right;
  overflow-y: hidden;
  overflow-x: hidden;
}
.v-form {
  max-width: 1200px;
  padding: 30px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5); /* 添加边框阴影效果 */
  margin-top: 50px;
  margin-left: 100px;
  margin-right: 100px;
  border: 1px solid #ccc; /* 添加边框样式 */
  border-radius: 20px; /* 可选：添加边框圆角 */
  display: flex; /* 设置为 Flexbox 容器 */
  flex-wrap: wrap; /* 允许内容换行 */
  justify-content: space-between; /* 元素之间平均分配空间 */
  width: 100%; /* 容器宽度为 100% */
}
.centered {
  display: flex;
  justify-content: center;
  flex: 1 1 50%;
}

.inputBlock {
  flex: 1 1 48%; /* 每个文本框占据接近一半的宽度，适应内容 */
  margin: 5px; /* 添加边距以防元素之间紧挨 */
}
.v-btn {
  background-color: #e7edf4;
}
.flex-row {
  background-color: #eef2f5;
  margin-bottom: 22px;
  padding-left: 16px;
  border-bottom: 1px solid #848687;
  height: 56px;
  color: #5e6061;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>

