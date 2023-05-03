<template>
    <div class=" row ">
        <div class="col-md-8">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-8">
            <div class="row">
                <h4 class="col-10">
                    Party Planner 
                    <i class="fa fa-book" aria-hidden="true"></i>
                </h4>
                <div class="col-2 mb-3">
                    <button class="btn btn-sm btn-primary" @click="refreshList()">
                        <i class="fas fa-redo"></i> Làm mới
                    </button>
                </div>
            </div>

            <FoodList v-if="filteredFoodCount > 0" :foods="filteredFood" v-model:activeIndex="activeIndex" />
            <p v-else>Không có món ăn nào.</p>

        </div>
        <div class="col-md-4 mt-3">
            <div v-if="activeFood" class="text-center" >
                <h4>
                    Chi tiết món
                    <i class="fa fa-cutlery" aria-hidden="true"></i>
                </h4>

                <FoodCard :food="activeFood" />
                <button class="btn btn-sm btn-primary" @click="addFoodToMenu()">
                    <i class="fas fa-add"></i> Thêm vào menu
                </button>
                <hr>
                <div>
                    <h4>Menu</h4>
                    <div>
                        <Menu :menu="menu" ></Menu>
                        <!-- <Menu :menu="menu"></Menu> -->
                    </div>

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
import Menu from '@/components/Menu.vue';
export default {
    components: {
        FoodCard,
        InputSearch,
        FoodList,
        Menu,
    },
    data() {
        return {
            foods: [],
            menu: [],
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
        // Chuyển các đối tượng Food thành chuỗi để tiện cho tìm kiếm.
        foodString() {
            return this.foods.map((food) => {

                const { food_name, food_categories, price } = food;
                return [food_name, food_categories, price].join("");
            });
        },
        // Trả về các Food có chứa thông tin cần tìm kiếm.
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
        updateMenu(){
            this.refreshList();
        },
       

        // async addFoodToMenu() {
        //     if (this.activeFood) {
        //         //Thêm món vào menu với số lượng đầu tiên là 1 món
        //         this.activeFood.quantity = 1;
        //         // Thêm món ăn vào menu
        //         this.menu.push(this.activeFood);
        //         // Xóa món ăn vừa thêm vào menu khỏi danh sách hiển thị
        //         this.foods.splice(this.activeIndex, 1);
        //         // Đặt lại chỉ số phần tử đang được chọn trên danh sách
        //         this.activeIndex = -1;
        //         console.log("menu", this.menu)
        //         // Lưu menu vào localStorage
        //         localStorage.setItem('menu', JSON.stringify(this.menu));
        //         //Nếu đặt thành công thì xóa dữ liệu trong localStorage.setItem('menu')
        //     }
        // },

        async addFoodToMenu() {
            if (this.activeFood) {
                // Kiểm tra xem món ăn đã có trong menu hay chưa
                const existingFood = this.menu.find(food => food._id === this.activeFood._id);
                if (existingFood) {
                    // Nếu món ăn đã có trong menu thì tăng số lượng lên 1
                    existingFood.quantity += 1;
                    alert(`Món ăn ${existingFood.food_name} đã có trong menu, số lượng hiện tại là ${existingFood.quantity}`);
                    this.refreshList();
                } else {
                    // Nếu món ăn chưa có trong menu thì thêm vào menu với số lượng đầu tiên là 1 món
                    this.activeFood.quantity = 1;
                    // Thêm món ăn vào menu
                    this.menu.push(this.activeFood);
                    // Đặt lại chỉ số phần tử đang được chọn trên danh sách
                    this.activeIndex = -1;
                    alert(`Món ăn  đã được thêm vào menu của bạn!!!`);
                }
                // Lưu menu vào localStorage
                localStorage.setItem('menu', JSON.stringify(this.menu));
            }
        }


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