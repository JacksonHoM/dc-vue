<template>
  <div class="app-container">
    <div class="filter-container" >
      <el-form ref="form" :model="form" inline="true" label-width="150px"  style='margin-left:50px;' prop="orderList">
            <el-form-item label="订单号:">
              <span prop="order_num"></span>
            </el-form-item>
            <el-form-item label="总金额:">
              <span prop="order_total"></span>
            </el-form-item>
            <el-form-item prop="order_paytype" label="支付方式">
              <el-select v-model="formInline.region" placeholder="支付方式">
                <el-option label="微信支付" value="wechatpay"></el-option>
                <el-option label="支付宝支付" value="zfbpay"></el-option>
                <el-option label="银行卡支付" value="bankcardpay"></el-option>
              </el-select>
              <el-button type="text" @click="updatePayType()">确认</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitOrder()">提交订单</el-button>
            </el-form-item>
            <el-table :data="tableData" style="width: 100%" label="订单商品列表" > 
              <el-table-column prop="item_name" label="商品名" ></el-table-column>
              <el-table-column prop="item_info" label="商品描述" ></el-table-column>
              <el-table-column prop="item_price" label="商品单价" ></el-table-column>
              <el-table-column prop="item_num" label="商品数量" >
                <template slot-scope="scope">
                  <el-button size="mini" icon="el-icon-remove" @click="decreaseNum()"></el-button>
                  <el-button size="mini" icon="el-icon-circle-plus" @click="addNum()"></el-button>
                </template>
              </el-table-column>
            </el-table>                 
       
      </el-form>
      <el-form ref="form" :model="form" label-width="150px"  style='margin-left:50px;'>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        form: {
          tableData:[]
        },
        listLoading: false,//数据加载等待动画
        dialogStatus: 'create',
        dialogFormVisible: false
      }
    },
    mounted(){
    //动态设置内容高度 让footer始终居底   header+footer的高度是100
    this.height = document.documentElement.clientHeight - 1000;  
　　//监听浏览器窗口变化　
    window.onresize = ()=> {this.height = document.documentElement.clientHeight -1000}
    },
    created() {
      this.getList();
    },
    
    methods: {
      
      getList() {
        //查询列表
        this.listLoading = true;
        this.api({
          url: "/order/loadOrderList",
          method: "get"
        }).then(data => {
          this.tableData = data.list;
          this.listLoading = false;
        })
      },
      decreaseNum(){
        this.api({
          url: "/order/decreaseItemNum",
          method: "get"
        }).then(data =>{
          this.item_num = data.item_num;
        })
      },
      addNum(){
        this.api({
          url: "/order/addItemNum",
          method: "get"
        }).then(data =>{
          this.item_num = data.item_num;
        })
      },
      updatePayType(){
        this.api({
          url: "/order/updatePayType",
          method: "post"
        }).then(data =>{

        })
      },
      submitOrder(){
        this.api({
          url: "/order/submitOrder",
          method: "post",
          data: this.form
        }).then(data =>{
          if(data.result){
          this.$message.success('订单提交成功');
          }else{
          this.$message.warning('订单提交失败');
        }
        })
      }
      
    }
  }
</script>
