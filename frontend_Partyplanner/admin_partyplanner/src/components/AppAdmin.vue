<template>
    <nav class="drawer-nav">111
        <ul class="drawer-nav-list">
            <li class="drawer-nav-item">

                <router-link :to="{ name: 'home' }" class="drawer-nav-link">

                    <i class="fas fa-home"></i> Home
                </router-link>
            </li>

            <div v-if="!Auth">
                <li class="drawer-nav-link">
                    <router-link :to="{ name: 'login' }" class="nav-link btn btn-link btn-outline-primary">
                        Đăng nhập

                    </router-link>
                </li>
            </div>



            <div class="navbar-nav" v-else-if="Auth">
                <li class="drawer-nav-item">
                    <router-link :to="{ name: 'order' }" class="drawer-nav-link">

                        <i class="fa fa-bell" aria-hidden="true"></i> Đơn đặt tiệc
                    </router-link>
                </li>
                <li class="drawer-nav-item">
                    <router-link :to="{ name: 'order' }" class="drawer-nav-link">

                        <i class="fa fa-bell" aria-hidden="true"></i> Đơn đặt tiệc
                    </router-link>
                </li>     
                <li class="drawer-nav-item">
                    <router-link :to="{ name: 'feedback' }" class="drawer-nav-link">
                        <i class="fa fa-envelope"></i> Góp ý
                    </router-link>
                </li>
                <li class="drawer-nav-item">
                    <router-link :to="{ name: 'info' }" class="drawer-nav-link">
                        <i class="fas fa-user"></i> Cá nhân
                    </router-link>
                </li>
                <li class="drawer-nav-item">
                    <i @click="logOut" class="drawer-nav-link">
                        <i class="fa fa-power-off" aria-hidden="true"></i> Đăng xuất
                    </i>
                </li>
            </div>


            
        </ul>
    </nav>
    <!-- <button class="drawer-toggle">Toggle Drawer</button> -->
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

<style scoped>
.drawer-nav {
    background-color: #ffffff;
    /* color: #010000; */
    /* height: 100vh; */
    position: fixed;
    top: 20;
    /* right: -300px;  */
    width: 240px;
    /* z-index: 1000; */
    transition: right 0.3s ease-in-out;
}

.drawer-nav-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.drawer-nav-item {
    margin: 0;
}

.drawer-nav-link {
    color: #040000;
    display: block;
    padding: 10px;
    text-decoration: none;
    /* transition: background-color 0.3s ease-in-out; */
}

.drawer-nav-link:hover {
    background-color: #beaef8;
}
</style>