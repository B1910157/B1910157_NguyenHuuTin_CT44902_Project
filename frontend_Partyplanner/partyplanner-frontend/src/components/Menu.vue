

<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                
                <th>Tên món</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
         
            <tr v-for="(food, index) in menuData" :key="index">
              
                    <td>{{ food.food_name }}</td>
                    <td>{{ food.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</td>
                    <td>{{ food.quantity }}</td>
                    <td><button @click="confirmDelete(index)" class="btn btn-danger">Xóa</button></td>
                </tr>
        </tbody>
    </table>

    <p>Tổng menu: {{ Total.toLocaleString() }} vnđ</p>
</template>
  
<script>
import { array } from 'yup';
// import ContactCard from '../components/ContactCard.vue';


export default {
    components: {
        // ContactCard,
    },
    props: {
        menu: { type: Array, required: true },

    },
    data() {
        return {
            menuData: this.menu,
            totalPrice: 0,

        };
    },

    mounted() {
        // Cập nhật giao diện sau khi đã lấy được dữ liệu từ localStorage
        this.$forceUpdate();
    },
    computed: {
        Total() {
            let total = 0;
            this.menuData.forEach((item) => {
                total += +item.price * item.quantity;
            });
            return total;
        },


    },
    created() {

        // Lấy dữ liệu từ localStorage và gán vào biến menu
        const menuData = localStorage.getItem('menu');
        // console.log("xinchao", menuData)
        if (menuData) {
            this.menuData = JSON.parse(menuData);
            this.$emit('update:menu', this.menuData);
            // this.totalPrice = this.Total();

        }

    },
    methods: {

        confirmDelete(index) {
            if (window.confirm('Bạn có chắc chắn muốn xóa món này khỏi menu?')) {
                this.menuData.splice(index, 1);
                localStorage.setItem('menu', JSON.stringify(this.menuData));
                this.$emit('update:menu', this.menuData);
                this.totalPrice = this.Total;
            }

        },
       

    },
};
</script>
