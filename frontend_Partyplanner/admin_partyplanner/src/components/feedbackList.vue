<script>
import info from "@/services/info.service";
export default {

    props: {
        feedbacks: { type: Array, default: [] },
    },
    data() {
        return {
            feedbacksWithNames: []
        };
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
            return formattedDate;
        },
        async loadNames() {
            // Create a temporary array to store feedbacks with names
            const feedbacksWithNames = [];

            // Loop through each feedback and retrieve the name of the user
            for (const feedback of this.feedbacks) {
                const rs = await info.getInfoUser(feedback.userId);
                feedbacksWithNames.push({
                    ...feedback,
                    fullname: rs.fullname
                });
               
            }
            // console.log("fb",feedbacksWithNames)

            // Set the feedbacksWithNames data property to the temporary array
            this.feedbacksWithNames = feedbacksWithNames;
        }
    },
    //created sẽ được gọi khi một instance của component được tạo ra
    created() {
        // Load the names of the users when the component is created
        this.loadNames();
    }
};

</script>

<template>
    <div class="row">
        <div class="col-md-6" v-for="(feedback, index) in feedbacksWithNames" :key="feedback._id">
            <!-- Hiển thị thông tin đơn hàng -->
            <ul class="list-group mb-5">
                <li class="list-group-item">
                    <b>Người góp ý: </b>{{ feedback.fullname }}<br>
                    <b>Ngày: </b>{{ formatDate(feedback.date_feedback) }}<br>
                    <b>Nội dung: </b>{{ feedback.content }}<br>
                </li>
            </ul>
        </div>
    </div>
</template>