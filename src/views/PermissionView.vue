
<template>
  <div class="permission">
    <br>
    <el-button class="btn" type="primary">New Role</el-button>
    <br><br>
    <el-table
    :data="tableData"
    border
    style="width: 90%; margin-left: 50px;">
    <el-table-column
      align="center"
      prop="role"
      label="Role key"
      width="180">
    </el-table-column>
    <el-table-column
      align="center"
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      align="header-center"
      prop="address"
      label="備註">
    </el-table-column>
    <el-table-column
      align="center"
      label="operations">
      <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
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
        <el-form-item label="Menus">
          <el-tree
            :data="testData"
            show-checkbox
            :props="defaultProps"
            @node-click="handleNodeClick"
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
        dialogType: 'edit',
        testData:[
        {
          label: '首頁',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '表格',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '權限',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        role: Object.assign({}, defaultRole),
        tableData: [{
          role: 'admin',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          role: 'editor',
          name: '王小A',
          address: '上海市普陀区金沙江路 1517 弄',
        }, {
          role: 'normal user',
          name: '王小B',
          address: '上海市普陀区金沙江路 1519 弄',
        }]
      }
    },
    methods: {
      handleEdit() {
        this.dialogVisible = true;
        console.log(this.dialogVisible)
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
.permission {
  width: 100%;
  height: 100%;
}
.btn {
  height: 40px;
  margin-left: 50px;
}
</style>