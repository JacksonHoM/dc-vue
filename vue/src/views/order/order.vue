<template>
  <div class="app-container">
    <div class="filter-container" >
      <el-form ref="form" :model="form" inline="true" label-width="150px"  style='margin-left:50px;' prop="orderList">
            <span prop="order_id" type="hidden"></span>
            <el-form-item label="用户名:">
              <span prop="user_name"></span>
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
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitOrder()">提交订单</el-button>
            </el-form-item>
            <el-table :data="itemData" style="width: 100%" label="订单商品列表" > 
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
          itemData:[]
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
          this.form.itemData = data.orderItem;
          this.form.user_id = data.orderId;
          this.form.user_name = data.orderUser.userName;
          this.form.order_total = data.orderTotal;
          this.listLoading = false;
        })
      },
      decreaseNum(){
        this.form.item_num=this.form.item_num-1;
        this.api({
          url: "/order/updateItemNum",
          method: "post",
          data: this.form
        }).then(data =>{
          this.form.order_total = data.orderTotal;
        })
      },
      addNum(){
        this.form.item_num=this.form.item_num+1;
        this.api({
          url: "/order/updateItemNum",
          method: "post",
          data: this.form
        }).then(data =>{
          this.form.order_total = data.orderTotal;
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
           
        })
      }
      
    }
  }
</script>
