
const UserService = require("../services/user.service");
const ServiceProvider = require("../services/serviceProvider")

const { client } = require("../utils/mongodb.util");

const MongoDB = require("../utils/mongodb.util");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");

exports.create = async (req, res, next) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "Username can not be empty"));
    }

    if (!req.body?.password) {
        return next(new ApiError(400, "Password can not be empty"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        return res.send(document);
        // return res.send(`Inserted new user have Id: ${document.insertedId}`);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the User11111")
        );
    }
};

exports.login = async (req, res, next) => {
    console.log(req.body)
    if (!req.body?.username || !req.body?.password) {
        return next(new ApiError(400, "Input username/password"))
    }
    try {
        const userService = new UserService(MongoDB.client);
        const user = await userService.findUsername(req.body.username);
        const comparePass = await bcrypt.compare(req.body.password, user.password);
        if (!user) {
            return next(new ApiError(401, "Username notfound"));
        }
        else if (!comparePass) {
            return next(new ApiError(400, "password fail"));
        }
        else {
            const token = jwt.sign({ id: user._id }, "secret", { expiresIn: 864000 });
            return res.send({
                status: 'success', message: "Login successfully", token: token
            });
        }
    } catch (error) {
        return next(new ApiError(500, "Login error"))
    }
}


exports.loginadmin = async (req, res, next) => {
    console.log(req.body)
    if (!req.body?.username || !req.body?.password) {
        return next(new ApiError(400, "Input username/password"))
    }
    try {
        const userService = new UserService(MongoDB.client);
        console.log("123")
        const user = await userService.findAdmin(req.body.username);
        console.log("145")
        const comparePass = await bcrypt.compare(req.body.password, user.password);
        console.log(user);
        if (!user) {
            return next(new ApiError(401, "Username notfound"));
        }
        else if (!comparePass) {
            return next(new ApiError(400, "password fail"));
        }
        else {
            const token = jwt.sign({ id: user._id }, "secret", { expiresIn: 864000 });
            console.log("token",token)
            return res.send({
                status: 'success', message: "Login successfully", token: token
            });
        }
    } catch (error) {
        return next(new ApiError(500, "Login error"))
    }
}

exports.logout = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        console.log(auth)
        if (!auth) {
            return next(new ApiError(401, "Unauthorized"))
        }
        const token = auth.split(" ")[1];
        const decoded_user = jwt.decode(token);
        console.log('decoded: ', decoded_user)
        return res.send({ message: "Logout success" })

    } catch (error) {
        return next(new ApiError(500, "logout fail"))
    }
}


exports.findOneUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const userService = new UserService(MongoDB.client);
        console.log(userId)
        
        const info = await userService.findByIdUser(userId);
        console.log(info);
        console.log("sss")
        if(!info) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send(info);
    } catch (error) {
        return next(
            new ApiError(500, `Error updating user with userid=${userId}`)
        );
    }

}

//Cap nhat thong tin ca nhan
exports.updateInfo = async (req, res, next) => {
    const userId = req.user.id;
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        console.log(userId)
        console.log(req.body)
        const document = await userService.updateUserInfo(userId, req.body);
        console.log(document);
        console.log("HOHO")
        if(!document) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send({ message: "InfoOfUser was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating user with userid=${userId}`)
        );
    }
};


exports.findFoodOfService = async (req,res, next) => {

    try{
        const serviceId = req.params.serviceId;
        const foodId = req.params.foodId;
        const serviceProvider = new ServiceProvider(MongoDB.client)
        const food = await serviceProvider.findOneFood(serviceId, foodId)

        if(!food){
            return next(new ApiError(404, "Food not found"))
        }

        return res.send(food)

    }catch(err){
        return next(new ApiError(500, "error findFoodOfService"))
    }
}

//Phan order

exports.findOneOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orderId  = req.params.id;
        console.log("conta",orderId)
      
        const userService = new UserService(MongoDB.client);
        const user = await userService.findById(userId);
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }

       console.log("hi")
        const order = await userService.findIdOrder(userId, orderId);
        console.log("aa")
        console.log("findOne6", order)
        if (!order) {
            return next(new ApiError(404, "order not found"));
        }
        return res.send(order);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving the order")
        );
    }
};

//Tìm order chỉ dựa vào id của order

exports.findOneOrderAdmin = async (req, res, next) => {
    try {
        
        const orderId  = req.params.id;
        console.log("conta",orderId)
      
        const userService = new UserService(MongoDB.client);
    

       console.log("hi")
        const order = await userService.findOrderById(orderId);
        console.log("aa")
        console.log("findOne2", order)
        if (!order) {
            return next(new ApiError(404, "order not found"));
        }
        return res.send(order);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving the order")
        );
    }
};


//USER
//HỦY ORDER

exports.cancelOrderUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        console.log("userId",userId)
        const orderId  = req.params.orderId;
        console.log("conta",orderId)
      
        const userService = new UserService(MongoDB.client);
    

       console.log("hi")
        const order = await userService.findOrderById(orderId);
        if (!order) {
            return next(new ApiError(404, "order not found"));
        }
        console.log("aa", userId)
        console.log("findOne1", orderId)
        const status = await userService.cancelOrderUser(userId, orderId)
        console.log("st",status)
        
        return res.send(order);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving the order")
        );
    }
};



//ADMIN

//Duyet order

exports.acceptOrder = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        console.log("userId",userId)
        const orderId  = req.params.orderId;
        console.log("conta",orderId)
      
        const userService = new UserService(MongoDB.client);
    

       console.log("hi")
        const order = await userService.findOrderById(orderId);
        if (!order) {
            return next(new ApiError(404, "order not found"));
        }
        console.log("aa")
        console.log("findOne3", order)
        const status = await userService.updateOrderStatus(userId, orderId)
        console.log("st",status)
        
        return res.send(order);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving the order")
        );
    }
};


//Hủy order

exports.cancelOrder = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        console.log("userId",userId)
        const orderId  = req.params.orderId;
        console.log("conta",orderId)
      
        const userService = new UserService(MongoDB.client);
    

       console.log("hihi")
        const order = await userService.findOrderById(orderId);
        if (!order) {
            return next(new ApiError(404, "order not found"));
        }
        console.log("aa")
        console.log("findOne5", order)
        const status = await userService.updateOrderStatusCancel(userId, orderId)
        console.log("st",status)
        
        return res.send(order);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving the order")
        );
    }
};


//Tìm tất cả các order của tất cả các user
exports.findAllOrders = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const orders = await userService.findAllOrders();
        // console.log("can tim",orders);
        return res.send(orders)
    }catch(error){
        return next(new ApiError(500, "Error find All order"))
    }
}

//Lấy số lượng đơn hàng chưa duyệt

exports.getOrderUnconfirm = async (req, res, next) => {
    
    try {
        const userService = new UserService(MongoDB.client);
        const orders = await userService.findAllOrdersUnconfirm();
        console.log("can tim",orders);
      
        const rs = orders.length;
        console.log(rs);
        return res.send(orders)
        
        
    } catch (error) {
        return next(
            new ApiError(500, "error get order uncomfirm")
        );
    }
};



exports.findAllOrdersOfUser = async (req, res, next) => {
    let orders = [];
    try {
        const  userId  = req.user.id;
        console.log("iduser",userId)
        const userService = new UserService(MongoDB.client);
        const user = await userService.findById(userId);
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }
        // const contactUserService = new ContactUserService(MongoDB.client);
        orders = await userService.findAllOrdersOfUser(userId);
        return res.send(orders);
        
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving orders")
        );
    }
};

exports.findAllOfUser = async (req, res, next) => {
    let orders = [];
    try {
        const  userId  = req.user.id;
        console.log("iduser",userId)
        const userService = new UserService(MongoDB.client);
        const user = await userService.findById(userId);
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }
        // const contactUserService = new ContactUserService(MongoDB.client);
        orders = await userService.findAllOfUser(userId);
        return res.send(orders);
        
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving orders")
        );
    }
};




exports.addOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userService = new UserService(MongoDB.client);
        const user = await userService.findById(userId);
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }
        console.log("hihihi")
        console.log("payload: ", req.body)
        const addContact = await userService.createOrder(userId, req.body);
        console.log("helalala:", addContact)
        return res.send(addContact);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    const userId = req.user.id;
    
    try{
        const userService = new UserService(MongoDB.client);
        const deleteAll = await userService.deleteAll(userId)
        return res.send({message: "Delete All contact success"})
    }catch(error){
        return next(new ApiError(500, "An error occurred while deleteall the contact"))
    }

   
}
exports.deleteOneContact = async (req, res, next) => {
    const userId = req.user.id;
    console.log("id_user ne: ",userId)
    const contactId = req.params;
    console.log("contact:", contactId)
    try{
        const userService = new UserService(MongoDB.client)
        const deleteOne = await userService.deleteOneContact(userId, contactId)
        if(!deleteOne){
            return next(new ApiError(404, "contact not found"))
        }
        return res.send({message: "Delete success"})

    }catch(error){
        return next(new ApiError(500, "An error occurred while delete the contact"))
    }

   
}

exports.updateOneContact = async (req, res, next) => {
    const userId = req.user.id;
    const contactId = req.params;
    const { name, email, phone } = req.body;
    if (!name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.updateOneContact(
            userId,
            contactId,
            req.body
        );
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while updating the contact")
        );
    }
};




