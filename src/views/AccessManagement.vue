
<template>
  <div class="Access">
    <br>
    <el-button class="btn" type="primary" @click="handleAddRole">{{ $t('__newData') }}</el-button>
    <br><br>
    <el-table
      :data="tableData"
      border
      style="width: min-content; margin-left: 50px;">
      <el-table-column
        align="center"
        prop="key"
        :label="$t('__workers_id')"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        :label="$t('__workers_name')"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="permission"
        :label="$t('__workers_permission')"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        :label="$t('__status')"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('__operation')"
        width="360">
        <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">{{ $t('__edit') }}</el-button>
            <!-- <el-button type="warning" size="small" @click="handleFreeze(scope)">凍結</el-button> -->
            <el-button type="danger" size="small" @click="handleDelete(scope)">{{ $t('__delete') }}</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?$t('__edit') : $t('__newData')">
        <el-form :model="worker" label-width="80px" label-position="left">
          <el-form-item :label="$t('__workers_name')">
            <el-input v-model="worker.name" placeholder="Name" />
          </el-form-item>
          <el-form-item :label="$t('__workers_permission')">
            <el-input v-model="worker.permission" placeholder="Permission" />
          </el-form-item>
          <el-form-item :label="$t('__active') + '?'">
            <el-checkbox v-model="worker.isActive">{{ $t('__active') }}</el-checkbox>
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="cancelSubmit">{{ $t('__cancel') }}</el-button>
          <el-button type="primary" @click="confirmRole">{{ $t('__confirm') }}</el-button>
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
        this.$confirm( this.$t('__this_will_close_account_continue'), this.$t('__hint'), {
          confirmButtonText: this.$t('__confirm'),
          cancelButtonText: this.$t('__cancel'),
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('__successful')
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('__cancel')
          });
        });
      },
      handleDelete(scope) {
        this.$confirm( this.$t('__this_will_delete_data_continue'), this.$t('__hint'), {
          confirmButtonText: this.$t('__confirm'),
          cancelButtonText: this.$t('__cancel'),
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
            message: this.$t('__successful')
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('__cancel')
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