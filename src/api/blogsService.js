import axios from "./axiosConfig";

export const getAllBlogs = async () => {
    const response = await axios.get("/blogs/allBlogs")
    return response.data;
}

export const createNewBlogs = async (formData) => {
    return axios.post("/blogs/newBlog", formData);
}

export const updateBlogs = async (id, formData) => {
    return axios.put(`/blogs/updateBlog/${id}`, formData);
}

export const deleteBlogs = async (id) => {
    return axios.delete(`/blogs/deleteBlog/${id}`);
}

export const getBlogByUser = async (id) => {
    const response = await axios.get(`/blogs/blogsByUser/${id}`);
    return response.data;
}