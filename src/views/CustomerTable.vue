<template>
  <div class="table">
    <div class="filter-container">
        <el-input v-model="searchFilter" placeholder="Search" style="width: 200px;" class="filter-item"/>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          {{ $t('__newData') }}
        </el-button>
    </div>

    <el-table
    class="customer-table"
    :data="this.allFilteredresults()">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item :label=" $t('__NO')+ '：'" class="form-item">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item :label="$t('__customer_name')+ '：'" class="form-item">
            <span>{{ props.row.company_name }}</span>
          </el-form-item>
          <el-form-item :label="$t('__contacter')+ '：'" class="form-item">
            <span>{{ props.row.contacter }}</span>
          </el-form-item>
          <el-form-item :label="$t('__GUI_number')+ '：'" class="form-item">
            <span>{{ props.row.GUI_number }}</span>
          </el-form-item>
          <el-form-item :label="$t('__phone')+ '：'" class="form-item">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item :label="$t('__status')+ '：'" class="form-item">
            <!-- <span>{{ props.row.status }}</span> -->
            <el-tag :type="props.row.status | statusFilter">{{ props.row.status }}</el-tag>
          </el-form-item>
          <el-form-item label="email：" class="form-item">
            <span>{{ props.row.email }}</span>
          </el-form-item>
          <el-form-item :label="$t('__webPage')+ '：'" class="form-item">
            <span>{{ props.row.domain }}</span>
          </el-form-item>
          <el-form-item :label="$t('__create_date')+ '：'" class="form-item">
            <span>{{ props.row.date }}</span>
          </el-form-item>
          <el-form-item :label="$t('__memo')+ '：'" class="form-item">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      :label=" $t('__NO') "
      prop="id">
    </el-table-column>
    <el-table-column
      :label="$t('__GUI_number')"
      prop="GUI_number">
    </el-table-column>
    <el-table-column
      :label="$t('__customer_name')"
      prop="company_name">
    </el-table-column>
    <el-table-column
      :label="$t('__boss')"
      prop="contacter">
    </el-table-column>
    <el-table-column
      :label="$t('__contacter')"
      prop="contacter">
    </el-table-column>
    <el-table-column
      :label="$t('__phone')"
      prop="phone">
    </el-table-column>
    <el-table-column
      :label="$t('__status')"
      prop="status"
      >
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
      </template>
    </el-table-column>
    <!-- <el-table-column
      label="備註"
      prop="desc">
    </el-table-column> -->
    <el-table-column :label="$t('__operation')">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">{{ $t('__edit') }}</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">{{ $t('__delete') }}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 編輯資訊popout -->
  <el-dialog :visible.sync="showDialog" :title="dialogType === 'edit'? $t('__edit') : $t('__newData')">
    <el-form :model="tmpEditData" label-width="80px" label-position="left">
      <el-form-item :label="$t('__GUI_number')">
        <el-input v-model="tmpEditData.GUI_number"/>
      </el-form-item>
      <el-form-item :label="$t('__customer_name')">
        <el-input v-model="tmpEditData.company_name" />
      </el-form-item>
      <el-form-item :label="$t('__contacter')">
        <el-input v-model="tmpEditData.contacter" />
      </el-form-item>
      <el-form-item :label="$t('__phone')">
        <el-input v-model="tmpEditData.phone" />
      </el-form-item>
      <el-form-item :label="$t('__status')">
        <el-select v-model="tmpEditData.status">
          <el-option :value="$t('__approach')">{{ $t('__approach') }}</el-option>
          <el-option :value="$t('__urgent')">{{ $t('__urgent') }}</el-option>
          <el-option :value=" $t('__done') ">{{ $t('__done') }}</el-option>
          <el-option :value="$t('__potential_customers')">{{ $t('__potential_customers') }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('__memo')">
        <el-input
          v-model="tmpEditData.description"
          :autosize="{ minRows: 2, maxRows: 4}"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button type="danger" @click="showDialog=false">{{ $t('__cancel') }}</el-button>
      <el-button type="primary" @click="dataSubmit">{{ $t('__confirm') }}</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
const defaultCustomerData = {
  id: '',
  company_name: '',
  contacter: '',
  phone: '',
  GUI_number: '',
  status: '',

}
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          急件: 'danger',
          接洽中:'info',
          待聯絡:'warning',
          結案: 'success'
        }
        return statusMap[status]
      }
    },

    data() {
      return {
        tableData:[],
        searchFilter: "",
        showDialog: false,
        customerData: Object.assign({}, defaultCustomerData),
        dialogType: 'edit',
        tmpEditData: Object.assign({}, defaultCustomerData),
      }
    },
    mounted() {
      this.$loadingself('loading...', {
          icon: 'el-icon-loading',
          success: (res) => {
            console.log(res)
          }
        })
        setTimeout(() => {
          this.$loadingself.hide()
          this.getGoodList();
        }, 1000)
      
    },
    methods: {
      async handleEdit(index, row) {
        console.log(index, row);
        this.tmpEditData.GUI_number = row.GUI_number
        this.tmpEditData.company_name = row.company_name
        this.tmpEditData.contacter = row.contacter
        this.tmpEditData.id = row.id
        this.tmpEditData.phone = row.phone
        this.tmpEditData.status = row.status
        this.dialogType = "edit"
        this.showDialog = true
      },
      handleDelete( $index, row ) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          // console.log(row)
          await this.deleteRole(row.id)
          this.tableData.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete successed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    async deleteRole(id) {
       const {data: res} = await this.$http.delete(`/api/deletegoods`, id)
       console.log(id)
       console.log(res)
    },



      async getGoodList() {
        const { data: res } = await this.$http.get('/api/goodslist')
        console.log(res)
        this.tableData = res.data;
      },
      handleCreate() {
        this.tmpEditData = Object.assign({}, defaultCustomerData)
        this.dialogType = "new"
        this.showDialog = true
      },
      async dataSubmit() {
        let tmpDatas = {'GUI_number': this.tmpEditData.GUI_number, 'company_name': this.tmpEditData.company_name}
        const {data: res} = await this.$http.post('/api/editgoods',tmpDatas)
        console.log(res)
        
        this.showDialog = false;
      },
      allFilteredresults() {
        let filteredList = [];
        let allUrs = this.tableData;
        let strBuf = null;
        for(let i = 0; i < allUrs.length; i++) {
          strBuf = JSON.stringify((allUrs[i]));
          if(strBuf.includes(this.searchFilter)){
            filteredList.push(allUrs[i]);
          }
        }
        return filteredList;
      },
    }
  }
</script>

<style scoped>
.form-item {
  padding-left: 20px;
}
.filter-item {
  padding: 10px;
}
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .customer-table {
    /* border: 1px solid; */
    width: 100%;
  }
  .table {
    width: 100%;
    height: calc( 100vh - 60px );
    overflow-y: auto;
  }
</style>
