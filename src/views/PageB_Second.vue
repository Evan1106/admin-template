<template>
  <el-table
    class="customer-table"
    :data="tableData">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.company_name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
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
</template>

<style>
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
    /* color: white; */
    /* max-width: calc( 100% - 350px ); */
    border: 1px solid black;
    height: 100%;
  }
</style>

<script>
  export default {
    data() {
      return {
        tableData:[]
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
        }, 3000)
      
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
    }
  }
</script>
