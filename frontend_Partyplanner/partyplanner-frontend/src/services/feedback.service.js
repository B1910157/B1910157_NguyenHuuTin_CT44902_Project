import createApiClient from "./api.service";
//Gửi yêu cầu đến backend trả về dữ liệu phản hồi từ server 
class FeedBackService {
    constructor(baseUrl = "/api/feedback") {
        this.api = createApiClient(baseUrl);
    }
    //Gọi đến endpoint trong routes
    async create(data) {
        return (await this.api.post("/", data)).data;
    }

  
    
}

export default new FeedBackService();
