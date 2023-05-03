<template>
    <div class="container">
        <div>
            <h4 class="text-secondary">
               Quản lý đơn đặt món
            </h4>
            <div class="row">
                <div class="col-12 text-right p-3">
                    <button @click="showUnconfirmed = false" class="btn btn-secondary m-3">Tất cả đơn hàng </button>
                    <button @click="showUnconfirmed = true" class="btn btn-warning m-3">Chưa duyệt </button>
                </div>

            </div>
            <OrderList v-if="filleredordercount > 0" :orders="filteredorder" @accept="acceptEvent" @cancel="cancelEvent" />


            <p v-else>Bạn chưa có đơn nào.</p>
        </div>

    </div>
</template>
<script>
import OrderList from "@/components/OrderList.vue";
import orderService from "../services/order.service";
import OrderGetItemService from "../services/orderGetItem.service"

// import { EventBus } from './event-bus';

export default {
    components: {
        OrderList,
    },
    data() {
        return {
            orders: [],
            ordersUnconfirm: [],
            showUnconfirmed: false,
        };
    },

    computed: {

        // Trả về các foood có chứa thông tin cần tìm kiếm.
        // filteredorder() {
        //     return this.orders;

        // },
        filteredorder() {
            if (this.showUnconfirmed) {
                return this.ordersUnconfirm;
            } else {
                return this.orders;
            }
        },
        // filteredorderUnconfirm() {
        //     return this.ordersUnconfirm;

        // },
        filleredordercount() {
            return this.filteredorder.length;
        },

    },
    methods: {
        async retrieveOrders() {
            try {
                this.orders = await orderService.findAll();
                // console.log(this.orders);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveOrders();
        },
        acceptEvent() {
            this.refreshList();
            this.refreshListUnconfirm();
        },
        cancelEvent() {
            this.refreshList();
            this.refreshListUnconfirm();
        },

        async retrieveOrdersUnconfirm() {
            try {
                this.ordersUnconfirm = await OrderGetItemService.getOrder();
                // console.log(this.ordersUnconfirm);
            } catch (error) {
                console.log(error);
            }
        },

        refreshListUnconfirm() {
            this.retrieveOrdersUnconfirm();
        },


    },
    mounted() {
        this.refreshList();
        this.refreshListUnconfirm();

    },

};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>