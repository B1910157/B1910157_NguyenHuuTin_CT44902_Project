const ServiceProvider = require("../services/serviceProvider")
const {client} = require("../utils/mongodb.util")

const MongoDB = require("../utils/mongodb.util");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");

exports.create = async (req, res, next) => {
    if (!req.body?.email) {
        return next(new ApiError(400, "Email can not be empty"));
    }

    if (!req.body?.password) {
        return next(new ApiError(400, "Password can not be empty"));
    }

    try {
        const serviceProvider = new ServiceProvider(MongoDB.client);
        const document = await serviceProvider.create(req.body);
        return res.send(document);
        // return res.send(`Inserted new service have Id: ${document.insertedId}`);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the service")
        );
    }
};

exports.login = async (req, res, next) => {
    console.log(req.body)
    if (!req.body?.email || !req.body?.password) {
        return next(new ApiError(400, "Input email/password"))
    }
    try {
        const serviceProvider = new ServiceProvider(MongoDB.client);
        const service = await serviceProvider.findEmail(req.body.email);
        const comparePass = await bcrypt.compare(req.body.password, service.password);
        if (!service) {
            return next(new ApiError(401, "Email Service notfound"));
        }
        else if (!comparePass) {
            return next(new ApiError(400, "Password fail"));
        }
        else {
            const token = jwt.sign({ id: service._id }, "secret", { expiresIn: 864000 });
            return res.send({
                status: 'success', message: "Login successfully", token: token
            });
        }
    } catch (error) {
        return next(new ApiError(500, "Login error"))
    }
};

exports.logout = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        console.log(auth)
        if (!auth) {
            return next(new ApiError(401, "Unauthorized"))
        }
        const token = auth.split(" ")[1];
        const decoded_service = jwt.decode(token);
        console.log('decoded: ', decoded_service)
        return res.send({ message: "Logout success" })

    } catch (error) {
        return next(new ApiError(500, "logout fail"))
    }
}
//Tim dich vu dua vao id
exports.findOneService = async (req, res, next) => {
    try{
        
        const serviceProvider = new ServiceProvider(MongoDB.client)
       
        console.log(req.params.serviceId)
        const service = await serviceProvider.findById(req.params.serviceId)
        console.log(service)
        if(!service){
            return next(new ApiError(404, "Service not found"))
        }
        return res.send(service)

    }catch(err){
        return next(new ApiError(500, `Error find service whit id = ${req.params.serviceId}`))

    }
}

exports.findAllService = async (req, res, next) => {
   

    try {
        const serviceProvider = new ServiceProvider(MongoDB.client);
        const document = await serviceProvider.findAllService();
        return res.send(document);
        // return res.send(`Inserted new service have Id: ${document.insertedId}`);
    }
    catch (error) {
        return next(
            new ApiError(500, "findAllService error")
        );
    }
};



//Food


exports.addFood = async (req, res, next) => {
    try {
        const serviceId = req.service.id;
        const serviceProvider= new ServiceProvider(MongoDB.client);
        const service = await serviceProvider.findById(serviceId);
        if (!service) {
            return next(new ApiError(404, "Service not found"));
        }
        console.log("oayload: ", req.body)
        const addFood = await serviceProvider.createFood(serviceId, req.body);
        console.log("helalala:", addFood)
        return res.send(addFood);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the foood")
        );
    }
};

//tim 1 mon an cua dich vu
exports.findOne = async (req, res, next) => {
    try {
        const serviceId = req.service.id;
        const foodId  = req.params.id;
        console.log("conta",foodId)
      
        const serviceProvider = new ServiceProvider(MongoDB.client);
        const service = await serviceProvider.findById(serviceId);
        if (!service) {
            return next(new ApiError(404, "Service not found"));
        }

       console.log("hi")
        const food = await serviceProvider.findOneFood(serviceId, foodId)
        
        console.log("findOne", food)
        if (!food) {
            return next(new ApiError(404, "Food not found"));
        }
        return res.send(food);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving the food")
        );
    }
};


exports.findAll = async (req, res, next) => {
    let foods = [];
    try {
        const  serviceId  = req.service.id;
        console.log("idser",serviceId)
        const serviceProvider = new ServiceProvider(MongoDB.client);
        const service = await serviceProvider.findById(serviceId);
        if (!service) {
            return next(new ApiError(404, "Food not found"));
        }
        // const contactserviceService = new ContactserviceService(MongoDB.client);
        foods = await serviceProvider.findAllFoodOfService(serviceId);
        return res.send(foods);
        
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving foods")
        );
    }
};

exports.deleteOne = async (req, res, next) => {
    const serviceId = req.service.id;
    console.log("service ne: ",serviceId)
    const foodId = req.params;
    console.log("food:", foodId)
    try{
        const serviceProvider = new ServiceProvider(MongoDB.client)
        const deleteOne = await serviceProvider.deleteOneFood(serviceId, foodId)
        if(!deleteOne){
            return next(new ApiError(404, "food not found"))
        }
        return res.send({message: "Delete success"})

    }catch(error){
        return next(new ApiError(500, "An error occurred while delete the food"))
    }

   
}

exports.deleteAll = async (req, res, next) => {
    const serviceId = req.service.id;
    
    try{
        const serviceProvider = new ServiceProvider(MongoDB.client);
        const deleteAll = await serviceProvider.deleteAllFood(serviceId)
        return res.send({message: "Delete All contact success"})
    }catch(error){
        return next(new ApiError(500, "An error occurred while deleteall the contact"))
    }

   
}

exports.updateOne = async (req, res, next) => {
    const serviceId = req.service.id;
    const foodId = req.params;
    const { foodName, price } = req.body;
    if (!foodName) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const serviceProvider = new ServiceProvider(MongoDB.client);
        const document = await serviceProvider.updateOneFood(
            serviceId,
            foodId,
            req.body
        );
        if (!document) {
            return next(new ApiError(404, "food not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while updating the food")
        );
    }
};






