<template>
  <div class="flex flex-wrap gap-4 items-center">
    <span>pod:</span>
    <el-select
      v-model="selectedPod"
      placeholder="Select"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in optionsPod"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <span>gpu:</span>
    <el-select
      v-model="selectedGpu"
      placeholder="Select"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in optionsGpu"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
  <div class="hostname">
    <span>hostname:</span>
    <el-select
      v-model="selectedHostname"
      placeholder="Select"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in optionHostname"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedPod = ref('')
const selectedGpu = ref('')
const selectedHostname = ref('')

const optionsGpu = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
]
const optionsPod = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
const optionHostname = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style>
.dropdown-container {
  display: flex;
  align-items: center;
  margin-right: 20px; /* 调整标题和下拉框之间的距禇 */
}

.custom-dropdown-text {
  width: 150px; /* 设置下拉框触发按钮文字区域的宽度 */
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
