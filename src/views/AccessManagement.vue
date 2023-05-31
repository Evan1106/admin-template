
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
        prop="key"
        label="員工編號"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="名字"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="permission"
        label="權限"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        label="Operations"
        width="360">
        <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">編輯</el-button>
            <el-button type="warning" size="small" @click="handleFreeze(scope)">凍結</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope)">刪除</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
        <el-form :model="role" label-width="80px" label-position="left">
          <el-form-item label="Name">
            <el-input v-model="role.name" placeholder="Role Name" />
          </el-form-item>
          <el-form-item label="permission">
            <el-input
              v-model="role.permission"
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder="Role permission"
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
          name: '小明',
          key: '001',
          permission: 'admin',
          routes:[],
        }, {
          name: '小天',
          key: '002',
          permission: 'editor',
          routes:[],
        }, {
          name: '大壯',
          key: '003',
          permission: 'visitor',
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
      handleFreeze() {
        this.$confirm('此操作將凍結該帳戶, 是否繼續?', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '凍結成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消凍結'
          });
        });
        console.log("freeze")
      },
      handleDelete(scope) {
        this.$confirm('此操作將永久刪除該文件, 是否繼續?', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        let index;
        for(let i =0; i< this.tableData.length; i++){
          if(scope.row.key == this.tableData[i].key){
            index = scope.$index;
          }
        }
        this.tableData.splice(index,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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