<template>
    <div class="loading" v-if="isShow">
        <div class="test">
        <i :class="icon" style="font-size: 55px; color: white;"></i>
        <span class="font">{{ message }}</span>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow: false,
            icon: 'el-icon-loading',
            message: 'LoAding',
        }
    },
    methods: {
        showLoading(msg){
            this.message = msg
            this.isShow = true
        },
        hideLoading() {
            this.isShow = false
        }
    }
}
</script>

<style scoped>
.loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: .3;
}
.font {
    font-size: x-large;
    color: white;
}
.test {
    width: 100%;
    height: 100%;
    /* z-index: 99; */
    /* background-color: red; */
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>