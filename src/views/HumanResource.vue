
<template>
  <div class="Access">
    <br>
    <el-button class="btn" type="primary" @click="handleAddRole">New</el-button>
    <br><br>
    <el-table
      :data="tableData"
      border
      style="width: min-content; margin-left: 50px;">
      <el-table-column
        align="center"
        prop=""
        label="員工編號"
        width="110">
      </el-table-column>
      <el-table-column
        align="center"
        prop="role"
        label="名字"
        >
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="身分證字號"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="生日"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="到職日"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="離職日"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="狀態"
        width="90">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="離職原因"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        label="Operations"
        width="180">
        <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">編輯</el-button>
            <!-- <el-button type="warning" size="small" @click="handleEdit(scope)">凍結</el-button> -->
          </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
        <el-form :model="role" label-width="80px" label-position="left">
          <el-form-item label="Name">
            <el-input v-model="role.name" placeholder="Role Name" />
          </el-form-item>
          <el-form-item label="Desc">
            <el-input
              v-model="role.description"
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder="Role Description"
            />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
          <el-button type="primary" @click="confirmRole">Confirm</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}
  export default {
    data() {
      return {
        dialogVisible: false,
        dialogType: 'new',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        role: Object.assign({}, defaultRole),
        tableData: [{
          role: '小明',
          name: 'www@test.com',
          description: 'admin',
          routes:[],
        }, {
          role: '小天',
          name: 'www@test2.com',
          description: 'editor',
          routes:[],
        }, {
          role: '大壯',
          name: 'www@test3.com',
          description: 'visitor',
          routes:[],
        }]
      }
    },
    methods: {
      handleEdit(scope) {
        console.log(scope)
        this.dialogType = 'edit'
        this.dialogVisible = true;
        console.log(this.dialogVisible)
      },
      handleAddRole() {
        this.dialogType = 'new'
        this.dialogVisible = true;
      },
      handleDelete() {
        console.log("delete")
      },
      handleNodeClick(data) {
        console.log(data);
      },
      confirmRole() {
        this.$loadingself('loading...', {
          icon: 'el-icon-loading',
          success: (res) => {
            console.log(res)
          }
        })
        setTimeout(() => {
          this.$loadingself.hide()
        }, 5000)
      },  
    }
  }
</script>

<style scoped>
.Access {
  width: 100%;
  height: calc( 100vh - 60px );
  border: 1px solid;
}
.btn {
  height: 40px;
  margin-left: 50px;
}
</style>