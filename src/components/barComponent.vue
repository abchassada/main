<template>
  <div class="custom-select-container">
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
  data() {
    return {
      selectedOption1: ['1','2','3'],
      selectedOption2: ['1','2','3'],
      selectedOption3: ['1','2','3']
    };
  }
};
</script>

<style>
.custom-select-container {
  display: flex;
  align-items: center;
}

.custom-select {
  margin-right: 20px;
}

label {
  font-weight: bold;
}
</style>