
<template>
    <h2>Menu</h2>
    <div v-if="menuData.length === 0">Menu trống</div>
    <table v-else class="table tbale-bordered text-center" >
        <thead>
            <th width="20%">Hình ảnh</th>
            <th>Tên món</th>
            <th>Giá</th>
            <th >Số lượng</th>
            <th width="15%">Thao tác</th>

        </thead>
        <tbody>
            <tr v-for="(food, index) in menuData" :key="index">
                <td > <img :src="getImage(food)" alt="" class="w-50 h-50"></td>
                <td>{{ food.food_name }}</td>
                <td>{{ formatCurrency(food.price) }} </td>

                <td><input type="number" v-model="food.quantity" min="1" style="width: 50px;" >
                </td>
                <td><button @click="confirmDelete(index)" class="btn btn-danger">Xóa</button> <button @click="updateQuantity(index)" class="btn btn-warning">Sửa</button></td>
                
            </tr>
        </tbody>
    </table>
    <Form @submit="submitOrder" :validation-schema="orderFormSchema">


        <!-- <input type="text" name="menus" :value="JSON.stringify(menuData)"> -->

        <span class="float-right"> <b>Tổng Menu: </b><b class="text-danger">{{ Total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</b></span>
        <Field name="menu" type="hidden" class="form-control" v-model="orderLocal.menus" />
        <!-- <input type="text" name="total" v-model="Total"> -->
        <Field name="total" type="hidden" class="form-control" v-model="orderLocal.total" />
        <!-- <div class="form-group">
            <label for="event_date">Ngày diễn ra </label>
            <Field name="event_date" type="date" class="form-control" v-model="orderLocal.event_date" />
            <ErrorMessage name="event_date" class="error-feedback" />
        </div> -->
<hr>
        <div class="form-group">
            <label for="address_book " class="font-weight-bold"> Địa chỉ nhận hàng </label>
            <Field style="height: 100px;" name="address_book" type="text" class="form-control" placeholder="Địa chỉ nhận hàng..." v-model="orderLocal.address_book" />
            <ErrorMessage name="address_book" class="error-feedback" />
        </div>
        <!-- <div class="form-group">
            <label for="tray_quantity">Số lượng bàn</label>
            <Field name="tray_quantity" type="number" class="form-control" v-model="orderLocal.tray_quantity" />
            <ErrorMessage name="tray_quantity" class="error-feedback" />
        </div> -->
        <!-- ko{{ menuData }} -->
        <div class="form-group float-right">
            <button class="btn btn-primary">Xác nhận</button>

        </div>
    </Form>
</template>
  
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";



export default {
    components: {
        Form,
        Field,
        ErrorMessage,

    },
    emits: ["submit:order"],
    props: {
        // menu: { type: Array, required: true },
        // order: { type: Object, required: true }

    },
    data() {
        const orderFormSchema = yup.object().shape({

            address_book: yup.string()
                .max(100, "Địa chỉ tối đa 100 ký tự.")
                .required("Vui lòng nhập địa chỉ")
            ,

        });
        return {
            menuData: "",
            totalData: "",
            orderLocal: {
                // event_date: "",
                // tray_quantity: "",
                menus: this.menuData,
                address_book: "",
                total: this.totalData
            },

            orderFormSchema,

        };
    },

    mounted() {
        // Cập nhật giao diện sau khi đã lấy được dữ liệu từ localStorage
        this.$forceUpdate();
    },
    computed: {
        Total() {
            let total = 0;
            if (this.menuData) {
                this.menuData.forEach((item) => {
                    total += +item.price * item.quantity;
                });
            }
            return total;
        },



    },
    watch: {
        menuData() {
            console.log("thay doi");
            console.log(this.orderLocal.menus)
            console.log(localStorage.getItem('menu'));
            this.$forceUpdate;
        }


    },
    created() {
        // Lấy dữ liệu từ localStorage và gán vào biến menuData
        const menuData = localStorage.getItem('menu');
        if (menuData) {
            this.menuData = JSON.parse(menuData);
            this.orderLocal.menus = JSON.stringify(this.menuData);


            this.orderLocal.total = this.Total;

            // this.$emit('update:menu', this.menuData);

        }

    },

    methods: {
        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },
        confirmDelete(index) {
            if (window.confirm('Bạn có chắc chắn muốn xóa món này khỏi menu?')) {
                this.menuData.splice(index, 1);
                this.orderLocal.menus = JSON.stringify(this.menuData);
                console.log(this.orderLocal.menus)
                localStorage.setItem('menu', JSON.stringify(this.menuData));
                this.$emit('update:menu', this.menuData);
                // console.log("hihihihih",this.Total);
                this.orderLocal.total = this.Total;
                // this.totalPrice = this.Total();
            }

        },

        updateQuantity(index) {
            const newQuantity = this.menuData[index].quantity;
            // Cập nhật số lượng mới của món ăn trong menuData
            for (let i = 0; i < this.menuData.length; i++) {
                if (i === index) {
                    this.menuData[i].quantity = newQuantity;
                }
            }
            // Lưu menuData mới vào localStorage
            localStorage.setItem('menu', JSON.stringify(this.menuData));
            //cập nhật lại orderLocal.menus
            this.orderLocal.menus = localStorage.getItem('menu');
            //cập nhật lại total
            this.orderLocal.total = this.Total;
        },

        submitOrder() {
            this.$emit("submit:order", this.orderLocal);
        },
        getImage(food) {
            return `http://localhost:3000/${food.image}`;
        },


    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
