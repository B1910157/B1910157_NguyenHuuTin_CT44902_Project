const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const multer = require('multer');

const serviceRouter = require("./app/routes/service.route");
const foodRoute = require("./app/routes/food.route");
const userRoute = require("./app/routes/user.route");
const orderRoute = require("./app/routes/order.route");
const homeRoute = require("./app/routes/home.route");
const infoRoute = require("./app/routes/info.route");
const acceptOrder = require("./app/routes/acceptOrder")
const cancelOrder = require("./app/routes/cancelOrder")
const feedback = require("./app/routes/feedback");

const checkService = require("./app/middlewares/checkService");
const checkUser = require("./app/middlewares/check_user")

const app = express();  
app.use(cors());
app.use(express.json());
app.use(express.static('public/images'));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Project. This is PartyPLanner." });
});
// const checkUser = require("./app/middlewares/check_user")
// app.use("/api/contacts", checkUser, userContacts);
// app.use("/api/users", usersRouter);
const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image!!!!!!!!!'), false);
        }
        cb(null, true);
    }
});
// app.use("/api/services", serviceRouter);
app.use("/api/foods", checkUser, upload.single('image'), foodRoute);
app.use("/api/users",  userRoute);
app.use("/api/home", homeRoute);
app.use("/api/orders", checkUser, orderRoute);
app.use("/api/info", checkUser, infoRoute);
app.use("/api/allOrders",checkUser, acceptOrder);
app.use("/api/cancelOrder",checkUser, cancelOrder);
app.use("/api/feedback", checkUser, feedback);
// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;