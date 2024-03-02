<template>
  <div style="display: flex; justify-content: space-around;">
  <div class="dropdown-container">
    <p>gpu:</p>
    <el-dropdown  split-button type="primary" class="custom-dropdown">
      Dropdown List
      <template #dropdown>
        <el-dropdown-menu class="custom-dropdown-menu">
          <el-dropdown-item v-for="(item, index) in gpuItem" :key="index">{{ item }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <div class="dropdown-container">
    <p>hostname:</p>
    <el-dropdown split-button type="primary" class="custom-dropdown">
      Dropdown List
      <template #dropdown>
        <el-dropdown-menu class="custom-dropdown-menu">
          <el-dropdown-item v-for="(item, index) in hostnameItem" :key="index">{{ item }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <div class="dropdown-container">
    <p>pod:</p>
    <el-dropdown split-button type="primary" class="custom-dropdown">
      Dropdown List
      <template #dropdown>
        <el-dropdown-menu class="custom-dropdown-menu">
          <el-dropdown-item v-for="(item, index) in podItem" :key="index">{{ item }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</div>
</template>
<script >
export default{
    data(){
        return {
            gpuSelect:"",
            hostnameSelect:"",
            podSelect:"",
            gpuItem:['gpu1','gpu2','gpu3'],
            hostnameItem:['hostname1','hostname2','hostname3'],
            podItem:['pod1','pod2','pod3']
        }
    }
}
</script>
<style>
.dropdown-container {
  display: flex;
  align-items: center;
  margin-right: 20px; /* 调整标题和下拉框之间的距离 */
}

.custom-dropdown-text {
  width: 150px; /* 设置下拉框触发按钮文字区域的宽度 */
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>