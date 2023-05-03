<template>
    <div class="container">
        <div >
            <h4>
                Lịch sử 
            </h4>
            <HistoryOrderList v-if="filleredordercount > 0" :orders="filteredorder"  @cancel = "cancelEvent" />
            <p v-else>Bạn chưa có đơn nào.</p>
        </div>
       
    </div>
</template>
<script>
import HistoryOrderList from "@/components/HistoryOrderList.vue";
import orderService from "../services/order.service";

export default {
    components: {
        HistoryOrderList,
    },
    data() {
        return {
            orders: [],
            

        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng foood thành chuỗi để tiện cho tìm kiếm.
        // orderString() {
        //     return this.orders.map((order) => {

        //         const { order_date, event_order, address_book } = order;
        //         return [order_date, event_order, address_book].join("");
        //     });
        // },
        // Trả về các foood có chứa thông tin cần tìm kiếm.
        filteredorder() {
           return this.orders;
           
        },

        
        filleredordercount() {
            return this.filteredorder.length;
        },
       
    },
    methods: {
        async retrieveOrders() {
            try {
                this.orders = await orderService.historyOrder();
                console.log(this.orders);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveOrders();
            this.activeIndex = -1;
        },
        cancelEvent(){
            this.refreshList();
        }
        

    },
    mounted() {
        this.refreshList();
        
    },

};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>