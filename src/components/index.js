import { defineAsyncComponent } from 'vue'

export default (app) => {
    // 程序标题栏
    app.component('AppNav', defineAsyncComponent(() => {
        return import(/* webpackChunkName:'AppNav' */'./AppNav')
    }))
    // 程序侧边栏
    app.component('AppSider', defineAsyncComponent(() => {
        return import(/* webpackChunkName:'AppSider' */'./AppSider')
    }))
}