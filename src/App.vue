<template>
  <a-config-provider :locale="zhCN" :theme="theme">
    <div class="app-container">
      <app-nav :showVersion="true" />
      <div class="app-content">
        <app-sider />
        <div class="app-content">

        </div>
      </div>
    </div>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default {
  data() {
    return {
      zhCN: zhCN,
      theme: {
        token: {
          borderRadius: 4
        }
      }
    }
  },
  created() {

  }
}
</script>
<style lang="less" scoped>
.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .app-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }

}
</style>