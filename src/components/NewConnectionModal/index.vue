<template>
    <div class="new-connection-modal" ref="newConnectionModal"></div>
    <a-modal v-model:open="open" title="连接到服务器" destroyOnClose width="800px" :closable="false" :maskClosable="false"
        :getContainer="() => $refs.newConnectionModal">
        <div class="switch-wrap">
            <div :class="['wrap-item', activeTab === '1' ? 'active' : '']" @click="activeTab = '1'">连接设置</div>
            <div :class="['wrap-item', activeTab === '2' ? 'active' : '']" @click="activeTab = '2'">高级设置</div>
        </div>
        <div class="options-wrap">
            <a-form ref="optionsForm" :model="options" labelAlign="left" :labelCol="{ style: { width: '80px' } }"
                autocomplete="off">
                <template v-if="activeTab === '1'">
                    <a-form-item label="连接名称" name="name">
                        <a-input v-model:value="options.name" placeholder="localhost" />
                    </a-form-item>
                    <a-form-item label="地址" name="host" :rules="[{ required: true, message: '请输入地址' }]">
                        <a-input v-model:value="options.host" placeholder="127.0.0.1" />
                    </a-form-item>
                    <a-form-item label="端口号" name="port" :rules="[{ required: true, message: '请输入端口号' }]">
                        <a-input-number v-model:value="options.port" :controls="false" :min="1" :precision="0"
                            :max="999999" placeholder="3306" />
                    </a-form-item>
                    <a-form-item label="密码" name="password">
                        <a-input-password v-model:value="options.password" placeholder="password" />
                    </a-form-item>
                    <a-form-item label="用户名" name="username">
                        <a-input v-model:value="options.username" placeholder="ACL in Redis>=6.0" />
                    </a-form-item>
                    <a-checkbox-group v-model:value="options.security" :options="securityOptions" />
                </template>
                <template v-else>
                    <a-form-item label="分隔符">
                        <a-input v-model:value="options.separator" placeholder=":" />
                    </a-form-item>
                </template>
            </a-form>
        </div>
        <template #footer>
            <a-button @click="open = false">取消</a-button>
            <a-button type="primary" @click="handleOk">确定</a-button>
        </template>
    </a-modal>
</template>
<script>
export default {
    name: 'NewConnectionModal',
    data() {
        return {
            open: false,
            activeTab: '1',
            options: {
                name: 'localhost',
                host: '127.0.0.1',
                port: 3306,
                separator: ':'
            },
            securityOptions: [
                { label: 'SSL', value: 'ssl' },
                { label: 'SSH', value: 'ssh' }
            ]
        };
    },
    methods: {
        /* 提交 */
        handleOk() {
            this.$refs.optionsForm.validateFields().then(() => {
                console.log(this.options);
            }).catch(() => { })
        }
    },
    mounted() {

    }
}
</script>
<style lang="less" scoped>
.new-connection-modal {
    :deep(.ant-modal) {
        top: 150px;

        .ant-modal-content {
            padding: 0;

            .ant-modal-header {
                padding: 16px 24px;
                color: #000000d9;
                background: #fff;
                border-bottom: 1px solid #f0f0f0;
                border-radius: 2px 2px 0 0;
                margin-bottom: 0;
            }

            .ant-modal-body {
                padding: 24px;
                font-size: 14px;
                line-height: 1.5715;
                word-wrap: break-word;

                .switch-wrap {
                    width: 100%;
                    height: 40px;
                    background-color: #f3f5f7;
                    display: flex;
                    justify-content: center;
                    flex-flow: row nowrap;

                    .wrap-item {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-flow: row nowrap;
                        flex: 1;
                        color: #000;
                        background-color: #f3f5f7;
                        cursor: pointer;

                        &.active {
                            background-color: #fff;
                            font-weight: 600;
                        }
                    }
                }

                .options-wrap {
                    margin-top: 16px;
                }
            }

            .ant-modal-footer {
                padding: 10px 16px;
                text-align: right;
                background: transparent;
                border-top: 1px solid #f0f0f0;
                border-radius: 0 0 2px 2px;
            }
        }
    }
}
</style>