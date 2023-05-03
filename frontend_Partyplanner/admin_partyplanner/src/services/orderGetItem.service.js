import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server 
class OrderGetItemService {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }
    //Gọi đến endpoint trong routes
    // async addOrder(data) {
    //     return (await this.api.post("/", data)).data;
    // }
    async getOrder() {
        return (await this.api.get("/getOrder")).data;
    }
    
    // async login(data) {
    //     return (await this.api.post("/login", data)).data;
    // }
    // async logout() {
    //     return (await this.api.post("/logout")).data;
    // }
    
}

export default new OrderGetItemService();
