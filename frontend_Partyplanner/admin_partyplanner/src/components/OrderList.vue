<script>
import AcceptOrder from "@/services/acceptOrder.service";
import CancelOrder from "@/services/cancelOrder.service";
// import { EventBus } from './event-bus';
export default {

    props: {
        orders: { type: Array, default: [] },
        // activeIndex: { type: Number, default: -1 },
    },
    // emits: ["update:activeIndex"],
    methods: {
        // updateActiveIndex(index) {
        //     this.$emit("update:activeIndex", index);
        // }
        toggleMenu(index) {
            this.orders[index].showMenu = !this.orders[index].showMenu;
        },
        async accept(userId, orderId) {
            console.log(userId, orderId)
            try {
                const rs = await AcceptOrder.accept(userId, orderId);
                console.log("hike", rs)
                if (rs) {
                    // Cập nhật lại trang
                    // location.reload()
                    console.log(this.orders)
                    this.$emit('accept', this.orders)

                }
            } catch (error) {
                console.log(error);
            }
        },
        async cancel(userId, orderId) {
            console.log(userId, orderId)
            try {
                const rs = await CancelOrder.cancel(userId, orderId);
                console.log("hike", rs)
                if (rs) {
                    // Cập nhật lại trang
                    // location.reload();
                    this.$emit('cancel', this.orders)
                }
            } catch (error) {
                console.log(error);
            }
        },
        showConfirm(userId, orderId) {
            if (confirm("Bạn có chắc chắn muốn duyệt đơn này?")) {
                this.accept(userId, orderId);
            }
        },
        showConfirmCancel(userId, orderId) {
            if (confirm("Bạn có chắc chắn muốn hủy đơn này?")) {
                this.cancel(userId, orderId);
            }
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
        }



    }
};

</script>

<template>
    <div class="row">
        <div class="col-md-6 " v-for="(order, index) in orders" :key="order._id">
            <!-- Hiển thị thông tin đơn hàng -->
            <ul class="list-group mb-5">
                <li class="list-group-item">
                    <b>Khách hàng: </b>{{ order.fullname }}<br>
                    <b>Số điện thoại: </b>{{ order.phone }}<br>
                    <b>Email: </b>{{ order.email }}<br>

                    <b>Ngày thực hiện: </b>{{ formatDate(order.order.order_date) }}<br>
                    <!-- <b>Ngày diễn ra tiệc: </b>{{ order.order.event_date }}<br> -->
                    <b>Địa chỉ giao hàng: </b>{{ order.order.address_book }}<br>


                    <!-- <b>Số lượng bàn: </b>{{ order.order.tray_quantity }}<br> -->
                    <b>Tổng tiền: </b>{{ order.order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    }}<br>
                    <b>Trạng thái: </b>
                    <span class="text-warning" v-if="order.order.status == 0">Chưa duyệt</span>
                    <span class="text-success" v-if="order.order.status == 1">Đã duyệt</span>
                    <span class="text-danger" v-if="order.order.status == 2">Đã hủy</span>
                    <div class="dropdown">
                        <p class=" dropdown-toggle" type="button" id="menuButton" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false" @click="toggleMenu(index)">
                            <b>Menu</b>
                        </p>
                        <ul class="dropdown-menu p-2" :class="{ 'd-block': order.showMenu }" aria-labelledby="menuButton">
                            <li v-for="menu in order.order.menus">*** {{ menu.food_name }} - giá: {{ menu.price }} - số
                                lượng:
                                {{ menu.quantity }}</li>
                        </ul>

                    </div>

                    <div class="btn float-right" v-if="order.order.status == 0">
                        <button class="btn btn-success" @click="showConfirm(order.userId, order.order._id)">Duyệt</button>
                        <button class="btn btn-danger  ml-2"
                            @click="showConfirmCancel(order.userId, order.order._id)">Hủy</button>
                    </div>
                </li>

            </ul>

        </div>
    </div>
</template>
