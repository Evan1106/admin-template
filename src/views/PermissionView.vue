
<template>
  <div class="permission">
    <br>
    <el-button class="btn" type="primary" @click="handleAddRole">{{ $t('__newData') }}</el-button>
    <br><br>
    <el-table
      :data="tableData"
      border
      style="width: 90%; margin-left: 50px;">
      <el-table-column
        align="center"
        prop="key"
        :label="$t('__role_key')"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        :label="$t('__role_name')"
        width="180">
      </el-table-column>
      <el-table-column
        align="header-center"
        prop="description"
        :label="$t('__description')">
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('__operation')">
        <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">{{ $t('__edit') }}</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope)">{{ $t('__delete') }}</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?$t('__edit') : $t('__newData')">
        <el-form :model="role" label-width="80px" label-position="left">
          <el-form-item :label="$t('__role_key')">
            <el-input v-model="role.key" placeholder="Role Key" :disabled="dialogType==='edit'?true:false" />
          </el-form-item>
          <el-form-item :label="$t('__role_name')">
            <el-input v-model="role.name" placeholder="Role Name" />
          </el-form-item>
          <el-form-item :label="$t('__description')">
            <el-input
              v-model="role.description"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="Role Description"
            />
          </el-form-item>
          <el-form-item label="Menus">
            <el-tree
              ref="tree"
              :check-on-click-node="true"
              node-key="path"
              :data="role.routes"
              show-checkbox
              :props="defaultProps"
            />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisible=false">{{ $t('__cancel') }}</el-button>
          <el-button type="primary" @click="confirmRole">{{ $t('__confirm') }}</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import path from 'path'
const defaultRole = {
  id:'',
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
        routes: [],
        testData:
        [
          { title: '客戶管理', path:'/customerManagement' }, 
          {
            title: '權限相關',
            children: [{ title: '權限管理', path:'/permissionManagement' }, { title: '權限設定', path: '/permissionSetting' }]
          }, 
          { title: '人員管理', path:'/humanResource' }
        ],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        role: Object.assign({}, defaultRole),
        rolesList:[],
        tableData: [{
          id: 0,
          key: 'admin',
          name: 'admin',
          description: 'Super Administrator. Have access to view all pages.',
          routes:[],
        }, {
          id: 1,
          key: 'editor',
          name: 'editor',
          description: 'Normal Editor. Can see all pages except permission page',
          routes:[],
        }, {
          id: 2,
          key: 'visitor',
          name: 'visitor',
          description: 'Just a visitor. Can only see the home page and the document page',
          routes:[],
        }]
      }
    },
    computed: {
      routesData() {
        // console.log(this.routes)
        return this.routes
      }
    },
    created() {
      this.getRoutes()
      this.getRoles()
    },
    methods: {
      async getRoutes() {
        const res = await this.$http.get('/vue-element-admin/routes')
        this.serviceRoutes = res.data
        // console.log(res.data)
      },
      async getRoles() {
        const res = await this.$http.get('/vue-element-admin/roles')
        this.rolesList = res.data
      },
      handleEdit(scope) {
        // console.log(scope)
        // console.log(this.role)
        this.dialogType = 'edit'
        this.dialogVisible = true;
        this.role.key = scope.row.key
        this.role.id = scope.row.id
        this.role.name = scope.row.name
        this.role.description = scope.row.description
        this.role.routes = [ 
          { title: '客戶管理', path:'/customerManagement' }, 
          {
            title: '權限相關',
            children: [{ title: '權限管理', path:'/permissionManagement' }, { title: '權限設定', path: '/permissionSetting' }]
          }, 
          { title: '人員管理', path:'/humanResource' }
        ]
        if(this.role.routes.length === 0 && this.tableData[scope.row.id].routes.length === 0){
          this.role.routes = [...this.testData] //無數據則賦予初始數據
        }else{
          let tmp = this.tableData[scope.row.id].routes
          this.$nextTick(() => {  //避免dom還未加載完畢而報錯
            this.$refs.tree.setCheckedNodes(tmp) //取出已勾選資料
          })
          
        }
      },
      handleAddRole() {
        this.dialogType = 'new'
        this.dialogVisible = true;
        this.role.key = ""
        this.role.name = ""
        this.role.id = ""
        this.role.description = ""
        this.role.routes = this.testData
      },
      // handleNodeCheck(scope) {
      //   console.log(scope)
      // },
      handleDelete(scope) {
        //彈出警告視窗
        this.$confirm(this.$t('__this_will_delete_data_continue'), this.$t('__hint'), {
          confirmButtonText: this.$t('__confirm'),
          cancelButtonText: this.$t('__cancel'),
          type: 'warning'
        }).then(() => {
        let index;
        for(let i =0; i< this.tableData.length; i++){
          if(scope.row.role == this.tableData[i].role){
            index = scope.$index;
          }
        }
        this.tableData.splice(index,1) // 刪除對應欄位
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
      async confirmRole() {
        const isEdit = this.dialogType === 'edit' // if this.dialogType === edit 回傳true

        const checkedKeys = this.$refs.tree.getCheckedNodes()
        // console.log(checkedKeys)
        // this.role.routes = this.generateTree((this.serviceRoutes), '/', checkedKeys)
        this.role.routes = checkedKeys
        if (isEdit) {
          for (let index = 0; index < this.tableData.length; index++) {
            if (this.tableData[index].key === this.role.key) {
              this.tableData.splice(index, 1, Object.assign({}, this.role))
              // console.log(this.tableData[index])
              break
            }
          }
        } else {
          this.role.id = 3 //流水號測試用，屆時用後端產生id流水號對照。
          this.tableData.push(this.role)
        }

        const { description, key, name } = this.role
        this.dialogVisible = false
        // console.log(this.role)

        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: `
              <div>Role Key: ${key}</div>
              <div>Role Name: ${name}</div>
              <div>Description: ${description}</div>
            `,
          type: 'success'
        })
        this.role = Object.assign({}, defaultRole)
      },  
      // 測試用，目前router數量少用不到。在router有children的時候使用
      generateTree(routes, basePath = '/', checkedKeys) {
        const res = []
        // console.log(routes)

        for (const route of Object.entries(routes)) {
          console.log(route)
          let routePath = "" 
          if(typeof(route.path) == "string"){
           routePath = path.resolve(basePath, route.path)
          }

          // recursive child routes
          if (route.children) {
            route.children = this.generateTree(route.children, routePath, checkedKeys)
          }
          
          if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
            res.push(route)
          }
        }
        // console.log(res)
        return res
      },      
    }
  }
</script>

<style scoped>
.permission {
  width: 100%;
  height: calc( 100vh - 60px );
  border: 1px solid;
}
.btn {
  height: 40px;
  margin-left: 50px;
}
</style>