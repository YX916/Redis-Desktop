<template>
    <div class="app-sider" :style="{ width: style.width + 'px' }">
        <div class="sider-content" @click="te">

        </div>
        <div class="app-sider-drag-line" v-drag="style"></div>
    </div>
</template>
<script>
const Redis = require("ioredis");
const redis = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    password: "root",
    db: 1, // Defaults to 0
});
export default {
    name: 'AppSider',

    data() {
        return {
            style: {
                width: this.$storage.get('siderWidth') || 350,
                minWidth: 200,
                maxWidth: 500
            }
        };
    },
    methods: {
        te() {
            redis.info("keyspace").then((result) => {
                console.log(result); // Prints "value"
            });
        }
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