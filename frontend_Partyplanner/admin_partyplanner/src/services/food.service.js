import createApiClient from "./api.service";
class FoodService {
    constructor(baseUrl = "/api/foods") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        const setHeader = {
            headers: {
                "Content-Type": "multipart/form-data",
                Acccept: "multipart/form-data"
            },
        };
        return (await this.api.post("/", data, setHeader)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        const setHeader = {
            headers: {
                "Content-Type": "multipart/form-data",
                Acccept: "multipart/form-data"
            },
        };

        return (await this.api.put(`/${id}`, data, setHeader)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

}
export default new FoodService();

