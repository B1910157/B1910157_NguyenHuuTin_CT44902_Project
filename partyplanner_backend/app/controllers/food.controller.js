const FoodService = require("../services/food.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const path = require('path');
const fs = require('fs');

exports.create = async (req, res, next) => {
    // console.log(req.body)
    // console.log(req.file);
    console.log(req.file);
    if (!req.body?.food_name) {
        return next(new ApiError(400, "Food Name can not be empty!"));
    }
    try {
        const foodService = new FoodService(MongoDB.client);

        // Lấy đường dẫn đến thư mục hình ảnh từ biến imagePath.
        const imagePath = path.join(__dirname, '../../public/images');
        console.log("hida");
        console.log(imagePath);
        const stringDate = new Date().getTime();
       //Tạo một tên tệp hình ảnh mới 
        const filename = stringDate + '_' + req.file.originalname;
        //đọc file từ bộ đệm;
        //Đọc dữ liệu hình ảnh từ tệp tạm thời được tải lên từ yêu cầu
        const buffer = fs.readFileSync(req.file.path);
        // lưu hình ảnh vào thư mục hình ảnh đã được xác định (../../public/image)
        fs.writeFile(`${imagePath}/${filename}`,  buffer, function (err) {
            if (err) {
              return console.error(err);
            }
            console.log('File saved!');
          });
          //Gán req.body.image = tên hình ảnh để lưu trên cơ sở dữ liệu
        req.body.image = filename;
        const document = await foodService.create(req.body);
        console.log("hi", document)
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while creating the food!")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const foodService = new FoodService(MongoDB.client);
        const {food_name} = req.query;
        if (food_name) {
            documents = await foodService.findByName(food_name);
        } else {
            documents = await foodService.find({});
        }
            
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving food!")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const foodService = new FoodService(MongoDB.client);
        const document = await foodService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "food not found!"));
        }
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(
                500,
                `Error retrieving food with id = ${req.params.id} !`
            )
        );
    }
}; 

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next (new ApiError(400, "Data to update can not be empty!"));
    }

    try {
        const foodService = new FoodService(MongoDB.client);
        console.log("id mon:",req.params.id)
        console.log("body", req.body)
        const imagePath = path.join(__dirname, '../../public/images');
        console.log("hida");
        console.log(imagePath);
        const stringDate = new Date().getTime();
       
        const filename = stringDate + '_' + req.file.originalname;
        //đọc file từ bộ đệm;
        const buffer = fs.readFileSync(req.file.path);
        fs.writeFile(`${imagePath}/${filename}`,  buffer, function (err) {
            if (err) {
              return console.error(err);
            }
            console.log('File saved!');
          });
        req.body.image = filename;

        const document = await foodService.update(req.params.id, req.body);
        console.log("document",document)
        if (!document) {
            return next (new ApiError(404, "food not found!"));
        }
        return res.send({message: "Food was updated successfully!"});
    } catch (error) {
        return next (
            new ApiError(
                500,
                `Error updating food with id = ${req.params.id} !`
            )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const foodService = new FoodService(MongoDB.client);
        const document = await foodService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "food not found!"));
        }
        return res.send({message: "Food was deleted successfully"});
    } catch (error) {
        return next (
            new ApiError(
                500,
                `Could not delete food with id = ${req.params.id} !`
            )
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const foodService = new FoodService(MongoDB.client);
        const deletedCount = await foodService.deleteAll();
        return res.send({message: `${deletedCount} foods were deleted successfully`});
    } catch (error) {
        return next (
            new ApiError(
                500,
                `An error occurred while removing all food`
            )
        );
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const foodService = new FoodService(MongoDB.client);
        const documents = await foodService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next (
            new ApiError(
                500,
                `An error occured while retrieving favorite foods`
            )
        );
    }
};