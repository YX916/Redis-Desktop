// 连接模块
export default {
    namespaced: true,
    state() {
        return {
            Connections: JSON.parse(localStorage.getItem('Connections')) || []
        }
    },
    actions: {
        /* 获取连接 */
        GET_CONNECTIONS() {
            return state.Connections;
        },
        /* 删除连接 */
        REMOVE_CONNECTION: (state, id) => {
            state.Connections = state.Connections.filter(item => item.id !== id);
            localStorage.setItem('Connections', JSON.stringify(state.Connections));
        }
    },
    mutations: {
        /* 添加连接 */
        ADD_CONNECTION: (state, connection) => {
            connection.id = new Date().getTime() + '';
            state.Connections.push(connection);
            localStorage.setItem('Connections', JSON.stringify(state.Connections));
        }
    }
}