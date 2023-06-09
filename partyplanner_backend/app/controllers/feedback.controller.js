const FeedBackService = require("../services/feedback.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createFeedBack = async (req, res, next) => {
    const userId = req.user.id;
    console.log("Userid: ")
    console.log(userId)
    if (!req.body?.content) {
        return next(new ApiError(400, "COntent can not be empty"));
    }
    try {
        const feedbackservice = new FeedBackService(MongoDB.client);
        const document = await feedbackservice.createFeedBack(req.body, userId);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }

}


exports.findAllFeedBack = async (req, res, next) => {
    let documents = [];
    console.log("hi")
    try {
        console.log("hi")
        const feedbackservice = new FeedBackService(MongoDB.client);
        console.log("hi")
        // const userId = req.user.id;
       
        documents = await feedbackservice.findAllFeedBack();
        console.log("hi")
        return res.send(documents);

    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving contact")
        );
    }

};





exports.findAllFeedBackHasName = async (req, res, next) => {
    let documents = [];
    console.log("hi")
    try {
        console.log("hi")
        const feedbackservice = new FeedBackService(MongoDB.client);
        console.log("hi")
        // const userId = req.user.id;
       
        documents = await feedbackservice.findFeedbackOfUser();
        console.log("hi")
        return res.send(documents);

    } catch (error) {
        return next(
            new ApiError(500, "errror lấy feedback có tên user")
        );
    }

};