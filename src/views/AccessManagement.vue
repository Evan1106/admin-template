
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
        prop="status"
        label="狀態"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        label="Operations"
        width="360">
        <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">編輯</el-button>
            <!-- <el-button type="warning" size="small" @click="handleFreeze(scope)">凍結</el-button> -->
            <el-button type="danger" size="small" @click="handleDelete(scope)">刪除</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit worker':'New worker'">
        <el-form :model="worker" label-width="80px" label-position="left">
          <el-form-item label="Name">
            <el-input v-model="worker.name" placeholder="Name" />
          </el-form-item>
          <el-form-item label="Permission">
            <el-input v-model="worker.permission" placeholder="Permission" />
          </el-form-item>
          <el-form-item label="isActive?">
            <el-checkbox v-model="worker.isActive">啟用</el-checkbox>
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="cancelSubmit">Cancel</el-button>
          <el-button type="primary" @click="confirmRole">Confirm</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
const defaultWorker = {
  key: '',
  name: '',
  permission: '',
  isActive: false,
  status: '凍結'
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
        worker: Object.assign({}, defaultWorker),
        tableData: [{
          name: '小明',
          key: '001',
          permission: 'admin',
          isActive: true,
          status: '正常'
        }, {
          name: '小天',
          key: '002',
          permission: 'editor',
          isActive: true,
          status: '正常'
        }, {
          name: '大壯',
          key: '003',
          permission: 'visitor',
          isActive: false,
          status: '凍結'
        }]
      }
    },
    methods: {
      handleEdit(scope) {
        // console.log(scope)
        this.dialogType = 'edit'
        this.dialogVisible = true;
        this.worker.key = scope.row.key
        this.worker.name = scope.row.name
        this.worker.permission = scope.row.permission
        this.worker.isActive = scope.row.isActive
        this.worker.status = scope.row.status
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
      cancelSubmit(){
        this.worker = Object.assign({}, defaultWorker)
        this.dialogVisible = false
      },
      confirmRole() {
        const isEdit = this.dialogType === 'edit'
        if (isEdit) {
          for (let index = 0; index < this.tableData.length; index++) {
            if (this.tableData[index].key === this.worker.key) {
              if(this.worker.isActive == true){//判斷凍結與否
                this.worker.status = '正常'
              }else{
                this.worker.status = '凍結'
              }
              this.tableData.splice(index, 1, Object.assign({}, this.worker))
              break
            }
          }
        } else {
          // this.role.key = 3 //流水號測試用，屆時用後端產生之id流水號對照
          this.tableData.push(this.worker)
          if(this.worker.isActive == true){
                this.worker.status = '正常'
              }else{
                this.worker.status = '凍結'
              }
        }
        const { isActive, permission, name } = this.worker
        this.dialogVisible = false

        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: `
              <div>Role Name: ${name}</div>
              <div>Role permission: ${permission}</div>
              <div>isActive: ${isActive}</div>
            `,
          type: 'success'
        })
        this.worker = Object.assign({}, defaultWorker)        
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