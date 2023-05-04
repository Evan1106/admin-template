<template>
  <div>
    <p>DashBoard</p>
    <!-- <div style="width: 600px;">
      <vue-dropzone
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
      ></vue-dropzone>
    </div>
    <div style="height: 200px; max-height: 200px; overflow-y: ;">
      <div v-for="(n,i) in 5" :key="i">placeholder</div>
    </div>
    
    <el-tooltip placement="top" content="tooltip">
        <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
      </el-tooltip> -->
  </div>
</template>

<script>
// import BackToTop from '../components/BackToTop.vue'
// import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: "DashBoard",
  components: {
    // vueDropzone: vue2Dropzone,
    // BackToTop
  },
  data() {
    return {
      backToTop_visible:false,
      dropzone: '',
      initOnce: true,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        // thumbnailWidth: 100,
        maxFilesize: 0.5,
        headers: { 'My-Awesome-Header': 'header value' },
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
        addRemoveLinks: true,
      },
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  // display: flex;
  // justify-content: center;
  // overflow-x:scroll;
  border: 1px solid ;
}
p {
  font-size: 50px;
  font-weight: 600;
  text-align: center;
  width: 100%;
  box-shadow: 7px 0px 20px 0px grey;
  color: black;
}
</style>
