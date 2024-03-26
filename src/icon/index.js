import { defineAsyncComponent } from 'vue';

const svgRequired = require.context('./svg', false, /\.svg$/);
svgRequired.keys().forEach((item) => svgRequired(item));

export default (app) => {
    app.component('Icon', defineAsyncComponent(() =>
        import(/* webpackChunkName:'Icon' */'@/components/Icon')
    ))
}