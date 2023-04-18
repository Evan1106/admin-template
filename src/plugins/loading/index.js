 /* eslint-disable */
import Loading from './index.vue'

 const loadingself = {}

loadingself.install = function(Vue, pluginOptions = {}) {
        //構造器
        const VueLoading = Vue.extend(Loading)
        let loading = null
        function $loading(tips, options ={}) {
            if(!loading){
                loading = new VueLoading()
                loading.$mount()
                document.querySelector('#app').appendChild(loading.$el)
            }
            loading.icon = options.icon
            loading.showLoading(tips)
 
        }

        $loading.hide = () => {
            if(!loading) return
            loading.hideLoading()
        }
        Vue.prototype.$loadingself = $loading
}
// module.exports = loadingself
export default loadingself