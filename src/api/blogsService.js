import axios from "./axiosConfig";

export const getAllBlogs = async () => {
    const response = await axios.get("/blogs/allBlogs")
    return response.data;
}

    export const createNewBlogs = async (formData) => {
    return axios.post("/blogs/newBlog", formData);
}