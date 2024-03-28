import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';
import { message } from 'ant-design-vue';
import Component from '@/components';
import directives from '@/directives'
import storage from '@/util/storage';
import Icon from '@/icon';
import store from './store';

let app = createApp(App);
app.use(store);
app.use(Antd);
directives(app);
Component(app);
Icon(app);

message.config({
    top: 60
})

app.config.globalProperties.$message = message;
app.config.globalProperties.$storage = storage;

app.mount('#app');