import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server 
class CancelOrder {
    constructor(baseUrl = "/api/cancelOrder") {
        this.api = createApiClient(baseUrl);
    }
    //Gọi đến endpoint trong routes
    async cancel(userId, orderId) {
        return (await this.api.get(`/${userId}/${orderId}`)).data;
    }
   
}

export default new CancelOrder();
