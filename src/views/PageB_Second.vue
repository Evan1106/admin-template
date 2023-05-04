<template>
  <div class="table">
    <div class="filter-container">
        <el-input v-model="searchFilter" placeholder="Search" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          Add
        </el-button>
    </div>

    <el-table
    class="customer-table"
    :data="this.allFilteredresults()">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="客戶名稱" class="form-item">
            <span>{{ props.row.company_name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺" class="form-item">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID" class="form-item">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID" class="form-item">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类" class="form-item">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址" class="form-item">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述" class="form-item">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="統一編號"
      prop="GUI_number">
    </el-table-column>
    <el-table-column
      label="客戶名稱"
      prop="company_name">
    </el-table-column>
    <el-table-column
      label="聯絡人"
      prop="contacter">
    </el-table-column>
    <el-table-column
      label="聯絡電話"
      prop="phone">
    </el-table-column>
    <el-table-column
      label="狀態"
      prop="status">
    </el-table-column>
    <el-table-column
      label="備註"
      prop="desc">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData:[],
        searchFilter: "",
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
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      async getGoodList() {
        const { data: res } = await this.$http.get('/api/goodslist')
        console.log(res)
        this.tableData = res.data;
      },
      handleFilter() {
        console.log("123")
      },
      handleCreate() {
        console.log("234")
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
      }
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
    border: 1px solid;
    width: 100%;
  }
  .table {
    width: 100%;
    height: calc( 100vh - 60px );
    overflow-y: auto;
  }
</style>
