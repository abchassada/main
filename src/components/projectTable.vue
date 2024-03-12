<template>
  <table>
    <thead>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tableData" :key="item.id">
        <td>{{ item.column1 }}</td>
        <td>{{ item.column2 }}</td>
        <td>{{ item.column3 }}</td>
      </tr>
    </tbody>
  </table>
</template>
 
<script>
import { ref } from 'vue';
 
export default {
  setup() {
    const tableData = ref([
      { id: 1, column1: 'Row 1 Data 1', column2: 'Row 1 Data 2', column3: 'Row 1 Data 3' },
      { id: 2, column1: 'Row 2 Data 1', column2: 'Row 2 Data 2', column3: 'Row 2 Data 3' },
      // ... more data
    ]);
 
    return { tableData };
  }
};
</script>