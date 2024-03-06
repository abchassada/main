import { createApp } from 'vue'
import ECharts from 'vue-echarts'
import App from './App.vue'
import 'echarts'
const app=createApp(App)
app.component('ECharts', ECharts).mount('#app')