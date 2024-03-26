<template>
    <div class="app-nav">
        <div class="title">
            {{ title }}<span v-if="showVersion"> - V{{ version }}</span>
        </div>
        <div class="app-nav-right-btns">
            <div class="btn" @click="changeWinSize('minimize')">
                <img src="@/assets/icon/minimize.svg">
            </div>
            <div class="btn" @click="changeWinSize('unmaximize')" v-if="winSize === 'maximize'">
                <img src="@/assets/icon/unmaximize.svg">
            </div>
            <div class="btn" @click="changeWinSize('maximize')" v-if="winSize === 'unmaximize'">
                <img src="@/assets/icon/maximize.svg">
            </div>
            <div class="btn close" @click="closeApp">
                <img src="@/assets/icon/close.svg">
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
const version = require("../../../package.json").version;
const { ipcRenderer } = require('electron');
export default {
    name: 'AppNav',
    props: {
        title: {
            type: String,
            default: 'Redis Desktop'
        },
        showVersion: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            version: version,
            winSize: 'unmaximize'
        };
    },
    methods: {
        /* 关闭程序 */
        closeApp() {
            ipcRenderer.send('closeApp');
        },
        /* 全屏或退出全屏 */
        changeWinSize(size) {
            ipcRenderer.send('resizeWin', size);
        }
    },
    created() {
        // 监听主进程窗口变化消息
        ipcRenderer.on('winSizeChange', (event, arg) => {
            this.winSize = arg;
        });
    }
}
</script>
<style lang="less" scoped>
.app-nav {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-weight: 500;
    position: relative;
    background: #1677ff;
    -webkit-app-region: drag;
    user-select: none;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
        display: inline-block;
        font-size: 14px;
        font-weight: 500;
        padding-left: 15px;
        color: #FFF;

        span {
            font-size: 10px;
        }
    }

    .app-nav-right-btns {
        width: 130px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        -webkit-app-region: no-drag;

        .btn {
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &:hover {
                background-color: #909dab42;
            }

            &.close {
                &:hover {
                    background-color: red;
                }
            }

            img {
                width: 18px;
                height: 18px;
            }
        }
    }
}
</style>