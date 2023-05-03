import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server 
class OrderService {
    constructor(baseUrl = "/api/allOrders") {
        this.api = createApiClient(baseUrl);
    }
    //Gọi đến endpoint trong routes
    // async addOrder(data) {
    //     return (await this.api.post("/", data)).data;
    // }
    async findAll() {
        return (await this.api.get("/")).data;
    }
    
    // async login(data) {
    //     return (await this.api.post("/login", data)).data;
    // }
    // async logout() {
    //     return (await this.api.post("/logout")).data;
    // }
    
}

export default new OrderService();
