import { createApp } from 'vue'
import ElementPlus from 'element-plus' //全局引入
import 'element-plus/dist/index.css'
import App from './App.vue'
import ECharts from 'echarts'
const app = createApp(App)
app.config.globalProperties.$echarts = ECharts
app.use(ElementPlus)
app.mount('#app')
