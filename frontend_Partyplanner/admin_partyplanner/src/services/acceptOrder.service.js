import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server 
class AcceptOrder {
    constructor(baseUrl = "/api/allOrders") {
        this.api = createApiClient(baseUrl);
    }
    //Gọi đến endpoint trong routes
    async accept(userId, orderId) {
        return (await this.api.get(`/${userId}/${orderId}`)).data;
    }
    
}

export default new AcceptOrder();
