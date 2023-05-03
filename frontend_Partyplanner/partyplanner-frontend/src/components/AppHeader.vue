<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <!-- Load trang -->
        <a href="/" class="navbar-brand">Party Planner</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link">
                    Home
                    <i class="fas fa-home"></i>
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
            <li class="nav-item">
                <router-link :to="{ name: 'register' }" class="nav-link btn btn-link btn-outline-primary">
                    Đăng ký

                </router-link>
            </li>
        </div>
        <!-- Nếu người dùng đã đăng nhập thì giá tri của Auth là true, sẽ hiển thị btn đăng xuất -->
        <div class="navbar-nav" v-else-if="Auth">
            <li class="nav-item">
                <router-link :to="{ name: 'order' }" class="nav-link">
                    Đơn hàng
                    <i class="fas fa-cart-arrow-down"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'history' }" class="nav-link">
                    Lịch sử
                    <i class="fas fa-history"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'feedback' }" class="nav-link">
                    Góp ý
                    <i class="fa fa-envelope"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'info' }" class="nav-link">
                    Cá nhân
                    <i class="fas fa-user"></i>
                </router-link>
            </li>
            <li class="nav-item ">
                <button @click="logOut" class="nav-link btn btn-link btn-outline-primary">
                    Đăng xuất 
                </button>
            </li>
        </div>
    </nav>
</template>
  
<script>
import { mapState, mapMutations } from 'vuex';
import userService from "@/services/user.service";


export default {

    computed: {
        ...mapState(['Auth']),

    },
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
        }
    }
}

</script>