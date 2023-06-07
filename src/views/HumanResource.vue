
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
        prop=""
        :label="$t('__workers_id')"
        width="110">
      </el-table-column>
      <el-table-column
        align="center"
        prop="role"
        :label="$t('__workers_name')"
        >
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        :label="$t('__identity_number')"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        :label="$t('__birthday')"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        :label="$t('__onboard')"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        :label="$t('__termination_date')"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        :label="$t('__status')"
        width="90">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        :label="$t('__termination_reason')"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('__operation')"
        width="180">
        <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">{{ $t('__edit') }}</el-button>
            <!-- <el-button type="warning" size="small" @click="handleEdit(scope)">凍結</el-button> -->
          </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?$t('__edit') : $t('__newData')">
        <el-form :model="role" label-width="80px" label-position="left">
          <el-form-item :label="$t('__workers_name')">
            <el-input v-model="role.name" placeholder="Role Name" />
          </el-form-item>
          <el-form-item :label="$t('__identity_number')">
            <el-input v-model="role.name" placeholder="Role Name" />
          </el-form-item>
          <el-form-item :label="$t('__birthday')">
            <el-input v-model="role.name" placeholder="Role Name" />
          </el-form-item>
          <el-form-item :label="$t('__onboard')">
            <el-input v-model="role.name" placeholder="Role Name" />
          </el-form-item>
          <el-form-item :label="$t('__termination_date')">
            <el-input v-model="role.name" placeholder="Role Name" />
          </el-form-item>
          <el-form-item :label="$t('__status')">
            <el-input v-model="role.name" placeholder="Role Name" />
          </el-form-item>
          <el-form-item :label="$t('__termination_reason')">
            <el-input v-model="role.name" placeholder="Role Name" />
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