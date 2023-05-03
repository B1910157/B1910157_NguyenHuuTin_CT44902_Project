<template>
    <div class="container">
        <div>
            <h4 class="text-secondary pb-4">
                Góp ý của khách hàng 
            </h4>
            <FeedbackList v-if="filleredfeedbackcount > 0" :feedbacks="filteredfeedback"/>


            <p v-else>Không có góp ý nào.</p>
        </div>

    </div>
</template>
<script>
import FeedbackList from "@/components/FeedbackList.vue";
import feedbackService from "@/services/feedback.service";
// import { EventBus } from './event-bus';

export default {
    components: {
        FeedbackList,
    },
    data() {
        return {
            feedbacks: [],
            // updateView: false


        };
    },

    computed: {

        // Trả về các foood có chứa thông tin cần tìm kiếm.
        filteredfeedback() {
            return this.feedbacks;

        },
        // acceptEvent(){
        //     return this.feedbacks;

        // },


        filleredfeedbackcount() {
            return this.filteredfeedback.length;
        },

    },
    methods: {
        async retrievefeedbacks() {
            try {
                this.feedbacks = await feedbackService.getAll();
                console.log("hihi",this.feedbacks);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievefeedbacks();
            
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