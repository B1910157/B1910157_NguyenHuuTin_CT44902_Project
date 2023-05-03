<template>
    <div class=" row ">
        <div class="col-md-8">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-8">


            <div class="row p-4">
                <h4 class="col-5">
                    Danh sách món ăn
                    <i class="fa fa-book icon" aria-hidden="true"></i>
                </h4>
                <div class="col-7">
                    <button class="btn btn-sm btn-primary" @click="goToAddFood">
                    <i class="fas fa-plus"></i> Thêm món mới
                </button>
                </div>
               
            </div>

            <FoodList v-if="filteredFoodCount > 0" :foods="filteredFood" v-model:activeIndex="activeIndex" />
            <p v-else>Không có món ăn nào.</p>

        </div>
        <div class=" col-md-4 text-center" style="margin-top: 200px; ">
            <div v-if="activeFood">
                <h4>
                    Chi tiết món ăn
                    <i class="fa fa-cutlery" aria-hidden="true"></i>
                </h4>
                <!-- {{ activeFood }} -->
                <FoodCard :food="activeFood" />
                <router-link :to="{
                        name: 'editFood',
                        params: { id: activeFood._id },
                    }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span>
                </router-link>


                <!-- <button >xóa</button> -->
                <div>


                </div>


            </div>
        </div>
    </div>
</template>
<script>
import FoodCard from "@/components/FoodCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import FoodList from "@/components/FoodList.vue";
import FoodService from "@/services/food.service";

export default {
    components: {
        FoodCard,
        InputSearch,
        FoodList,

    },
    data() {
        return {
            foods: [],

            activeIndex: -1,
            searchText: "",

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
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        foodString() {
            return this.foods.map((food) => {

                const { food_name, food_categories, price } = food;
                return [food_name, food_categories, price].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredFood() {
            if (!this.searchText) return this.foods;
            return this.foods.filter((_food, index) =>
                this.foodString[index].includes(this.searchText)
            );
        },

        activeFood() {
            if (this.activeIndex < 0) return null;
            return this.filteredFood[this.activeIndex];
        },
        filteredFoodCount() {
            return this.filteredFood.length;
        },
        // Trả về số lượng food đã được chọn vào menu
        menuCount() {
            return this.menu.length;
        },

        // Tính tổng giá tiền của các món trong menu
        menuTotalPrice() {
            let total = 0;
            this.menu.forEach((food) => {
                total += food.price;
            });
            return total;
        },
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
        // async addFoodToMenu(food) {

        //     food = this.activeFood;
        //     console.log("food", food)
        //     // Thực hiện các xử lý cần thiết, ví dụ như kiểm tra dữ liệu hợp lệ, gọi service để lưu dữ liệu vào cơ sở dữ liệu, ...

        //     // Thêm food vào danh sách menu
        //     this.menu.push(food);
        //     console.log("order", menu)
        // }
        goToAddFood() {
            this.$router.push({ name: "addFood" });
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