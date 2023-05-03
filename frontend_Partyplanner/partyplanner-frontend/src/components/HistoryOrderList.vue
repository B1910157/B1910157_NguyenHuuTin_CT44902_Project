<script>
import orderService from "@/services/order.service";
export default {
  props: {
    orders: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  // emits: ["update:activeIndex"],
  methods: {
    // updateActiveIndex(index) {
    //     this.$emit("update:activeIndex", index);
    // }
    toggleMenu(index) {
      this.orders[index].showMenu = !this.orders[index].showMenu;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      return formattedDate;
    },
    showConfirmCancel(orderId) {
      if (confirm("Bạn có chắc chắn muốn hủy đơn này?")) {
        this.cancel(orderId);
      }
    },
    async cancel(orderId) {
      console.log(orderId)
      try {
        const rs = await orderService.cancelOrder(orderId);
        // console.log("hike", rs)
        if (rs) {
          // Cập nhật lại trang
          // location.reload();
          this.$emit('cancel', this.orders)
        }
      } catch (error) {
        console.log(error);
      }
    },
  }



};

</script>
<template>
  <div class="row">
    <div class="col-md-6 p-3" v-for="(order, index) in orders" :key="order._id">
      <!-- Hiển thị thông tin đơn hàng -->
      <ul class="list-group mb-3">
        <li class="list-group-item">

          <b>Ngày thực hiện: </b>{{ formatDate(order.order_date) }}<br>
          <!-- <b>Ngày diễn ra tiệc: </b>{{ order.event_date }}<br> -->
          <b>Địa chỉ giao hàng: </b>{{ order.address_book }}<br>
          <!-- <b>Menu: </b>
            <ul>
              <li v-for="menu in order.menus"> {{ menu.food_name }} - giá: {{ menu.price }} - số lượng: {{ menu.quantity }}</li>
            </ul> -->

          <!-- <b>Số lượng bàn: </b>{{ order.tray_quantity }}<br> -->
          <b>Tổng tiền: </b>{{ order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}<br>
          <b>Trạng thái: </b>
          <span class="text-warning" v-if="order.status == 0">Chưa duyệt <button class="btn btn-danger"
              @click="showConfirmCancel(order._id)">Hủy</button></span>
          <span class="text-success" v-if="order.status == 1">Đã duyệt <i class="fa fa-check"
              aria-hidden="true"></i></span>
          <span class="text-danger" v-if="order.status == 2">Đã hủy <i class="fa fa-times" aria-hidden="true"></i></span>
          <div class="dropdown">
            <p class=" dropdown-toggle" type="button" id="menuButton" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false" @click="toggleMenu(index)">
              <b>Menu</b>
            </p>
            <ul class="dropdown-menu p-2" :class="{ 'd-block': order.showMenu }" aria-labelledby="menuButton">
              <li v-for="menu in order.menus">*** {{ menu.food_name }} - giá: {{ menu.price }} - số
                lượng:
                {{ menu.quantity }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>