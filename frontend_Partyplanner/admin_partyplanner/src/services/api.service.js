import axios from "axios";
const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    // headers: {
    //     "Content-Type": "multipart/form-data",
    //     Acccept: "multipart/form-data"
    // },

};

// if (0) {
//     commonConfig.headers["Content-Type"] = "multipart/form-data";
//     commonConfig.headers["Accept"] = "multipart/form-data";
// }

export default (baseURL) => {
    const addToken = axios.create({
        baseURL,
        ...commonConfig,
    });
    addToken.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return addToken;
};
