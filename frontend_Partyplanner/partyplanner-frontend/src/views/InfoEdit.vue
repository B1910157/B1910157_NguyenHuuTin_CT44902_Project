<template>
    <div class="container">
        <div >
            <h4>
                Thông tin cá nhân
            </h4>
            <InfoForm :info="filteredinfo" @updateInfo="updateInfo"  />
          
          <p class="text-success">{{ message }}</p>
            
            <div class="mt-3 row justify-content-around align-items-center">
               
            </div>
           
        </div>
       
    </div>
</template>
<script>
// import Info from "@/components/Info.vue";
import infoService from "../services/info.service";
import { object } from "yup";
import InfoForm from "../components/InfoForm.vue";
// import { array, object } from 'yup';

export default {
    components: {
    // Info,
    InfoForm
},
    data() {
        return {
            info: object,
            message:""

        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
       
    },
    // props:{
    //     info: this.info

    // },
    computed: {
      
        
        // Trả về các foood có chứa thông tin cần tìm kiếm.
        filteredinfo() {
             return this.info;
           
        },

      
       
    },
    methods: {
        async retrieveInfo() {
            try {
                this.info = await infoService.info();
                console.log(this.info);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveInfo();
            this.activeIndex = -1;
        },
        async updateInfo(data) {
            try {
                await infoService.update(data);
                this.message = "Thông tin cá nhân được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },

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