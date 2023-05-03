<template>
    <div class=" row shadow ">
        <h4 class="text-primary mt-3 ml-3">
                Đơn hàng
                <i class="fas fa-book"></i>
        </h4>
        <div class="mt-3 col-md-12">
            
            <div>
                <OrderForm @submit:order="addOrder" />
                {{ message }}
                <!-- <OrderForm :menu="menu" :order="order" @submit:order="addOrder"></OrderForm> -->
            </div>


        </div>

    </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import FoodService from "@/services/food.service";
import Menu from '@/components/Menu.vue';
import OrderForm from '@/components/OrderForm.vue';
import orderService from "../services/order.service";
export default {
    components: {
        Menu,
        OrderForm,
    },
    data() {
        return {
            foods: [],
            menu: [],
            totalPrice: 0,
            message: ""
        };
    },
    computed: {
        // Trả về số lượng food đã được chọn vào menu
        menuCount() {
            return this.menu.length;
        },
        // Tính tổng giá tiền của các món trong menu
        // Total() {
        //     let total = 0;
        //     this.menuData.forEach((item) => {
        //         total += +item.price;
        //     });
        //     return total;
        // },
        Total() {
            let total = 0;
            this.menuData.forEach((item) => {
                total += +item.price * item.quantity;
            });
            return total;
        }
    },
    methods: {
        async retrieveFoods() {
            try {
                this.foods = await FoodService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveFoods();
            this.activeIndex = -1;
        },

        async addFoodToMenu() {
            if (this.activeFood) {
                // Thêm món ăn vào menu
                this.menu.push(this.activeFood);
                // Xóa món ăn vừa thêm vào menu khỏi danh sách hiển thị
                // this.foods.splice(this.activeIndex, 1);
                // Đặt lại chỉ số phần tử đang được chọn trên danh sách
                // this.activeIndex = -1;
                console.log("menu", this.menu)
                // Lưu menu vào localStorage
                localStorage.setItem('menu', JSON.stringify(this.menu));
                //Nếu đặt thành công thì xóa dữ liệu trong localStorage.setItem('menu')
            }
        },
        async addOrder(data) {
            try {
                this.menu = localStorage.getItem("menu");
                if (!this.menu) {
                    alert("Bạn chưa có món ăn. Vui lòng chọn món trước khi đặt.");
                    return;
                }
                const confirmed = confirm("Bạn chắc chắn muốn đặt tiệc?");
                if (!confirmed) {
                    return;
                }
                await orderService.addOrder(data);
                this.message = "Thêm đơn thành công.";
                localStorage.setItem("menu", "");
                // localStorage.removeItem("menu");
                this.$router.push("/history");
            } catch (error) {
                console.log(error);
            }
        },

    },
    mounted() {
        this.refreshList();
        const menuData = localStorage.getItem('menu');
        if (menuData) {
            this.menu = JSON.parse(menuData);
        }
    },
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>