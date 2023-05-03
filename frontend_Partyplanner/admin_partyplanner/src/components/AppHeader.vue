<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark p-3">
        <!-- Load trang -->
        <a href="/" class="navbar-brand"> <i class="fa fa-users icon" aria-hidden="true"></i> Party Planner - ADMIN PAGE</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link">
                   
                    <i class="fas fa-home"></i> Home
                </router-link>
            </li>
        </div>
       <!-- Người dùng chưa login thì Auth có giá trị là false, AppHeader sẽ hiển thị Đăng nhập đăng ký cho người dùng -->
        <div class="navbar-nav" v-if="!Auth">
            <li class="nav-item">
                <router-link :to="{ name: 'login' }" class="nav-link btn btn-link btn-outline-primary">
                    Đăng nhập

                </router-link>
            </li>
            <!-- <li class="nav-item">
                <router-link :to="{ name: 'register' }" class="nav-link btn btn-link btn-outline-primary">
                    Đăng ký

                </router-link>
            </li> -->
        </div>
        <!-- Nếu người dùng đã đăng nhập thì giá tri của Auth là true, sẽ hiển thị btn đăng xuất -->
        <div class="navbar-nav" v-else-if="Auth">
            <li class="nav-item">
                <router-link :to="{ name: 'order' }" class="nav-link">
                   
                    <i class="fa fa-bell" aria-hidden="true"></i> Đơn đặt món
                </router-link>
            </li>
            <!-- <li class="nav-item">
                <router-link :to="{ name: 'history' }" class="nav-link">
                    Lịch sử
                    <i class="fas fa-history"></i>
                </router-link>
            </li> -->
            <li class="nav-item">
                <router-link :to="{ name: 'feedback' }" class="nav-link">
                    
                    <i class="fa fa-envelope"></i> Góp ý
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'info' }" class="nav-link">
                    
                    <i class="fas fa-user"></i> Cá nhân
                </router-link>
            </li>
            <li class="nav-item ">
                <button @click="logOut" class="nav-link btn btn-link btn-outline-primary">
                    <i class="fa fa-power-off" aria-hidden="true"></i> Đăng xuất 
                </button>
            </li>
        </div>
    </nav>
</template>
  

<script>
import { mapState, mapMutations } from 'vuex';
import userService from "@/services/user.service";
// import OrderGetItemService from "@/services/orderGetItem.service"

export default {

    computed: {
        ...mapState(['Auth']),
        

        // filteredOrder() {
           
        //     return this.order;
            
        // },

        // filteredOrderCount() {
        //     return this.filteredOrder.length;
        // },
    },
    // data() {
    //     return {
    //         order: [],

    //     };
    // },
    methods: {
        ...mapMutations(['setAuth']),
        async logOut() {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                };
                await userService.logout({ headers });
                //Xóa token khỏi localStorage
                localStorage.removeItem('token');
                //set lại giá trị của Auth là false
                this.setAuth(false);
                //Chuyển trang về login
                this.$router.push({ name: 'login' });
            } catch (error) {
                console.log(error);
            }
        },
        // async getOrder(){
           
        //     try {
        //         this.order = await OrderGetItemService.getOrder();
        //         // console.log("alooooo",this.order)
        //     } catch (error) {
        //         console.log(error);
        //     }
        
        // },
        
        
    }
}

</script>