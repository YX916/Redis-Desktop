<template>
    <div class="app-sider" :style="{ width: dargStyle.width + 'px' }">
        <div class="sider-content">
            <div class="aider-top-add" @click="$refs.newConnectionModal.open = true">
                <icon type="icon:add-circle" />
                <span style="margin-left: 8px;">连接到Redis服务器</span>
            </div>
        </div>
        <div class="app-sider-drag-line" v-drag="dargStyle"></div>
    </div>
    <!-- 连接到新服务器弹窗 -->
    <new-connection-modal ref="newConnectionModal" />
</template>
<script>
import { defineAsyncComponent } from 'vue';
export default {
    name: 'AppSider',
    components: {
        NewConnectionModal: defineAsyncComponent(() =>
            import(/* webpackChunkName:'newConnectionModal' */ '@/components/NewConnectionModal')
        ),
    },
    data() {
        return {
            dargStyle: {
                width: this.$storage.get('siderWidth') || 350,
                minWidth: 250,
                maxWidth: 600
            }
        };
    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
.app-sider {
    width: 350px;
    height: 100%;
    position: relative;
    user-select: none;
    padding-right: 2px;

    .sider-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .aider-top-add {
            width: 100%;
            height: 36px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;

            &:hover {
                background-color: #F0F0F2;
            }
        }
    }

    .app-sider-drag-line {
        &::before {
            content: '';
            width: 2px;
            height: 100%;
            position: absolute;
            background-color: #1677ff;
            top: 0;
            right: 0;
        }
    }
}
</style>