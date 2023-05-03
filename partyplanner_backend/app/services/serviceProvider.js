//sU DUNG CAC api CUA THU VIEN MONGODB DE THUC HIEN CAC THAO TAC CSDL MONGODB
const bcrypt = require('bcrypt')
const { ObjectId } = require("mongodb");
const ApiError = require('../api-error');

class ServiceProvider {
    constructor(client) {
        this.Service = client.db().collection("services");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API

    async extractServiceData(payload) {
        const hashPass = await bcrypt.hash(payload.password, 10)
        const service = {
            service_name: payload.service_name,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
            password: hashPass,
            status: '1',
            menu: payload.menu || []

        };

        //Remove undefined fields
        Object.keys(service).forEach(
            (key) => service[key] === undefined && delete service[key]
        );
        return service;
    }

    async create(payload) {
        const service = await this.extractServiceData(payload);
        const result = await this.Service.insertOne(service);
        return result.insertedId;
    }
    async updateService(serviceId, payload) {
        const filter = {
            _id: ObjectId.isValid(serviceId) ? new ObjectId(serviceId) : null,
        };
        const update = this.extractServiceData(payload);
        const result = await this.Service.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;


    }
    async findAllService(){
        const service = await this.Service.find().toArray()
        return service;

    }

    async findEmail(email) {
        const service = await this.Service.findOne({ email: email });
        return service;
    }

    async findById(id) {

        return await this.Service.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
   





    ///
    extractMenuData(payload) {

        const food = {
            _id: new ObjectId(),
            foodName: payload.foodName,
            price: payload.price,

        };
        // console.log("food cuar tui",food);
        return food;
    }
    async createFood(serviceId, payload) {

        const food = await this.extractMenuData(payload);
        console.log("asss", food)


        const result = await this.Service.updateOne(
            { _id: new ObjectId(serviceId) },
            { $push: { menu: food } }
        );
        return result.modifiedCount > 0;
    }

    async findAllFoodOfService(serviceId) {

        const service = await this.Service.findOne({
            _id: new ObjectId(serviceId)
        });
        return service.menu;
    }

    async findOneFood(serviceId, foodId) {
        console.log("hi")
        console.log(serviceId)
        const service = await this.findById(serviceId);
        console.log(service)
        const food = service.menu.find(c => c._id.toString() === foodId.toString());

        if (!food) {
            throw new ApiError(400, 'food not found');
        }
        return food;
    }

    async findByName(nameService) {
        const service = await this.Service.findOne({ service_name: nameService });
        return service;
    }
   

    async deleteAllFood(serviceId) {
        const rs = await this.Service.updateOne(
            { _id: new ObjectId(serviceId) },
            { $unset: { menu: [] } }
        );
        return rs.modifiedCount > 0;
    }
    async deleteOneFood(serviceId, foodId) {
        const rs = await this.Service.updateOne(
            { _id: new ObjectId(serviceId) },
            { $pull: { menu: { _id: new ObjectId(foodId) } } }
        );
        return rs.modifiedCount > 0;
    }



    async updateOneFood(serviceId, foodId, updated) {

        const result = await this.Service.updateOne(
            { _id: new ObjectId(serviceId), "menu._id": new ObjectId(foodId) },
            {
                $set: {
                    "menu.$.foodName": updated.foodName,
                    "menu.$.price": updated.price
                },
            }
        );
        return result.modifiedCount > 0;
    }


}


module.exports = ServiceProvider;