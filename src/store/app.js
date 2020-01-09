const permission = {
    state: {
        // 当前激活的组件名称
        componentName: '',
        // 页面权限
        auth: {},
        // 按钮权限
        buttons: null
    },
    mutations: {
        setComponentName: (state, data) => {
            state.componentName = data;
        },
        setAuth: (state, data) => {
            state.auth = data;
        },
        // 按钮权限
        setButtons (state, data) {
            state.buttons = data;
        }
    },
    actions: {
    }
};

export default permission;
