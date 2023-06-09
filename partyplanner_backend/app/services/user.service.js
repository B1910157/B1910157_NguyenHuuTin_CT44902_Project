//sU DUNG CAC api CUA THU VIEN MONGODB DE THUC HIEN CAC THAO TAC CSDL MONGODB
const bcrypt = require('bcrypt')
const { ObjectId } = require("mongodb");
const ApiError = require('../api-error');
const ServiceProvider = require("../controllers/serviceProvider.controller")

class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API

    async extractUserData(payload) {
        const hashPass = await bcrypt.hash(payload.password, 10)
        const user = {
            username: payload.username,
            password: hashPass,
            fullname: payload.fullname,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
            orders: payload.orders || [],
            admin: 0

        };

        //Remove undefined fields
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    async create(payload) {
        const user = await this.extractUserData(payload);
        const result = await this.User.insertOne(user);
        return result.insertedId;
    }


    async findUsername(username) {
        const user = await this.User.findOne({ username: username, admin: 0 });
        return user;
    }
    async findAdmin(username) {
        const user = await this.User.findOne({ username: username, admin: 1 });
        console.log("hi", user)
        return user;
    }

    async findById(id) {

        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async findByIdUser(userId) {
        return await this.User.findOne({ _id: new ObjectId(userId) })
    }

    
    // Phan Order

    extractOrderData(payload) {

        const order = {
            _id: new ObjectId(),
            order_date: new Date,
            // event_date: payload.event_date,
            // tray_quantity: payload.tray_quantity,
            menus: payload.menus || [],
            address_book: payload.address_book,
            // total: payload.total * payload.tray_quantity,
            total: payload.total ,
            status: "0"

        };
        // console.log("order cuar tui",order);
        return order;
    }
    async createOrder(userId, payload) {

        const order = await this.extractOrderData(payload);
        console.log("order", order.menus)
        //chuyển menus từ JSON về đối tượng để lưu vào cơ sở dữ liệu
        const menu1 = JSON.parse(order.menus);
        console.log("ko", menu1)
        // const menu = this.extractMenuData(menu1);
        // order.menus=menu;
        // console.log("hihi",menu);
        const result = await this.User.updateOne(
            { _id: new ObjectId(userId) },
            //thêm mảng order vào, menus là một mảng của order đó
            { $push: { orders: { ...order, menus: menu1 } } }
        );
        console.log("them roi")


    }
    //Tìm order dựa theo id của order và userid
    async findIdOrder(userId, orderId) {
        const user = await this.User.findOne({
            _id: new ObjectId(userId)
        });
        console.log("hih")

        //find(o) tìm trong mảng
        const order = user.orders.find((o) => o._id.toString() === orderId);
        return order;
    }
     //Tìm 1 order dựa trên id của order đó: (Dùng duyệt và hủy đơn từ admin)
     async findOrderById(orderId) {
        const orders = await this.findAllOrders();
        const order = orders.find((o) => o.order._id == orderId);
        return order;
    }

    //Tìm tất cả các order của tất cả các user
    async findAllOrders() {
        //aggregate() để kết hợp dữ liệu từ nhiều bảng trong MongoDB
        const orders = await this.User.aggregate([
            {
                //tách các mảng đơn hàng ra khỏi orders
                $unwind: "$orders"
            },
            {
                //project tạo một đối tượng kết quả mới bao gòm các trường...
                $project: {
                    _id: 0, //loại bỏ trường id
                    userId: "$_id", //thêm trường userId vào để biết order này của ai
                    fullname: "$fullname",
                    email: "$email",
                    phone: "$phone",
            
                    order: "$orders" //thêm trường order -> sử dụng orders sau khi tách để gán vào đây
                }
            }

        ]).toArray();
        return orders;
    }


    //Tìm đơn hàng theo ngày (**)
    async findOrdersByDate(date) {
        const orders = await this.User.aggregate([
          {
            // tách các mảng đơn hàng ra khỏi orders
            $unwind: "$orders"
          },
          {
            // lọc các đơn hàng có ngày trùng với ngày truyền vào
            $match: {
              "orders.date": date
            }
          },
          {
            // project tạo một đối tượng kết quả mới bao gồm các trường...
            $project: {
              _id: 0, // loại bỏ trường id
              userId: "$_id", // thêm trường userId vào để biết order này của ai
              fullname: "$fullname",
              email: "$email",
              phone: "$phone",
              order: "$orders" // thêm trường order -> sử dụng orders sau khi tách để gán vào đây
            }
          }
        ]).toArray();
        return orders;
      }




//Tìm tất cả các order có trạng thái = 0(chưa duyệt)
    async findAllOrdersUnconfirm() {
        //
        const orders = await this.User.aggregate([
            {
                $unwind: "$orders"
            },
            {

                //lọc các order có status = 0
                $match: {
                    "orders.status": "0"
                }
            },
            {
                $project: {
                    _id: 0, //loại bỏ trường id
                    userId: "$_id", //thêm trường userId vào để biết order này của ai
                    fullname: "$fullname",
                    email: "$email",
                    phone: "$phone",
                    order: "$orders" //thêm trường order chứa thông tin của order
                }
            }

        ]).toArray();
        return orders;
    }

    async updateOrderStatus(userId, orderId) {
            console.log("â",userId)
        const result = await this.User.updateOne(
            { _id: new ObjectId(userId), 'orders._id': new ObjectId(orderId) },
            { $set: { 'orders.$.status': "1" } }
        );
        console.log("rs", result)
        return result.modifiedCount;
    }
    async updateOrderStatusCancel(userId, orderId) {

        const result = await this.User.updateOne(
            { _id: new ObjectId(userId), 'orders._id': new ObjectId(orderId) },
            { $set: { 'orders.$.status': "2" } }
        );
        console.log("rs", result)
        return result.modifiedCount;
    }
    async cancelOrderUser(userId, orderId){
        try {
          const filter = { _id: new ObjectId(userId), "orders._id": new ObjectId(orderId) };
          const update = { $set: { "orders.$.status": 2 } };
          const options = { new: true };
          console.log("1")
          const updatedUser = await this.User.findOneAndUpdate(filter, update, options);
          console.log(updatedUser);
          return updatedUser;
        } catch (error) {
          console.log(error);
          throw new Error("Failed to cancel order for user.");
        }
      }
    

    extractMenuData(payload) {
        const menu = payload.menus.map((item) => {
            const menuItem = {
                id: item.id,
                food_name: item.food_name,
                price: item.price,
                quantity: item.quantity,
            };
            return menuItem;
        });
        return menu;

    }


    //Dùng để lấy thông tin cá nhân
    async findAllOfUser(userId) {

        const user = await this.User.findOne({
            _id: new ObjectId(userId)
        });
        return user;
    }
    //cap nhat thong tin ca nhân
    async updateUserInfo(userId, newInfo) {

        const result = await this.User.updateOne(
            { _id: new ObjectId(userId) },
            {
                $set: {
                    fullname: newInfo.fullname,
                    email: newInfo.email,
                    phone: newInfo.phone,
                    address: newInfo.address
                }
            }
        );
        console.log(result)
        return result.acknowledged;
    }

    //Dùng để fecth các order của user
    async findAllOrdersOfUser(userId) {

        const user = await this.User.findOne({
            _id: new ObjectId(userId)
        });
        return user.orders;
    }


}


module.exports = UserService;