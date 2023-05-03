//sU DUNG CAC api CUA THU VIEN MONGODB DE THUC HIEN CAC THAO TAC CSDL MONGODB

const { ObjectId } = require("mongodb");
const ApiError = require('../api-error');

class FoodService {
    constructor(client) {
        this.Food = client.db().collection("foods");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API

    async extractFoodData(payload) {

        const food = {
            food_name: payload.food_name,
            food_categories: payload.food_categories,
            price: payload.price,
            image: payload.image ? payload.image : "",

        };

        //Remove undefined fields
        Object.keys(food).forEach(
            (key) => food[key] === undefined && delete food[key]
        );
        console.log("return", food)
        return food;

    }

    async create(payload) {
        const food = await this.extractFoodData(payload);
        const result = await this.Food.insertOne(
            food
        );
        // const foodId = result.insertedId;
        // const imageName = foodId + path.extname(file.originalname);
        // const imagePath = path.join(__dirname, '..', 'public', 'images', imageName);
        // // Lưu ảnh trên server
        // await fs.writeFile(imagePath, file.buffer);
        // // Cập nhật đường dẫn ảnh trong cơ sở dữ liệu
        // await this.Food.updateOne(
        //     { _id: foodId },
        //     { $set: { image: '/images/' + imageName } }
        // );
        // return await this.findById(foodId);
        return result;
    }
    async find(filter) {
        const cursor = await this.Food.find(filter);
        return await cursor.toArray();
    }
    async findByName(food_name) {
        return await this.find({
            food_name: { $regex: new RegExp(food_name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.Food.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = await this.extractFoodData(payload);
        const result = await this.Food.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        console.log("rs", result)
        return result.value;
    }


    async delete(id) {
        const result = await this.Food.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Food.deleteMany({});
        return result.deletedCount;
    }

    // async findFavorite() {
    //     return await this.find({
    //         favorite: true
    //     });
    // }

}


module.exports = FoodService;