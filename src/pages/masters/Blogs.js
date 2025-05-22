import { useState } from "react";

function Blogs() {
    const [editIndex, setEditIndex] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [form, setForm] = useState({ title: '', author: '', description: '', publishDate: '' });

    const handleOnChangeInputs = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleOnEdit = (id) => {
        setForm(blogs[id]);
        setEditIndex(id);
    }

    const handleOnDelete = (id) => {
        const updatedBlogs = blogs.filter((blog, index) => index !== id);
        setBlogs(updatedBlogs);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedBlogs = [...blogs];
            updatedBlogs[editIndex] = form;
            setBlogs(updatedBlogs);
            setEditIndex(null);
        } else {
            setBlogs([...blogs, form]);
            console.log(form);
        }
        setForm({ title: '', author: '', description: '', publishDate: '' });
    }

    return (
        <div style={{padding: '20px'}}>
            <h2>Gestión de Blogs</h2>
            <form onSubmit={handleOnSubmit} className="mb-4">
                {['title', 'author', 'description', 'publishDate'].map((field) => (
                    <input
                        key={field}
                        name={field}
                        value={form[field]}
                        onChange={handleOnChangeInputs}
                        placeholder={field}
                        className="form-control mb-2"
                    />
                ))}
                <button className="btn btn-primary">
                    {editIndex !== null ? 'Actualizar' : 'Agregar'}
                </button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Descripción</th>
                        <th>Fecha de Publicación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog, id) => (
                        <tr key={id}>
                            <td>{blog.title}</td>
                            <td>{blog.author}</td>
                            <td>{blog.description}</td>
                            <td>{blog.publishDate}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleOnEdit(id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleOnDelete(id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Blogs;