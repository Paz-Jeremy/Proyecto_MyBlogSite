import { useState } from "react";
import React, { useRef } from "react";
import './Blogs.css'

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"

function Blogs() {
    const editorRef = useRef(null);

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

// Campos que queremos renderizar
    const fields = [
        { name: 'title', label: 'Título', type: 'text' },
        { name: 'author', label: 'Autor', type: 'text' },
        { name: 'description', label: 'Descripción', type: 'text' },
        { name: 'publishDate', label: 'Fecha de Publicación', type: 'text' }
    ];

    return (
        <div style={{padding: '20px 40px 20px 40px'}}>
            <h2>Gestión de Blogs</h2>
            <form onSubmit={handleOnSubmit} className="mb-4">
                {fields.map(({ name, label, type }) => (
                    <div className="inputGroup" key={name}>
                        <input
                        id={name}
                        name={name}
                        type={type}
                        value={form[name]}
                        onChange={handleOnChangeInputs}
                        required
                        autoComplete="off"
                        />
                        <label htmlFor={name}>{label}</label>
                    </div>
                ))}

                {/* Editor de texto */}
                <div className="contenedorEditor">
                    <SunEditor
                        ref={editorRef}
                        setOptions={{
                        height: 300,
                        buttonList: [
                            // default
                            ['undo', 'redo'],
                            ['font', 'fontSize', 'formatBlock'],
                            ['paragraphStyle', 'blockquote'],
                            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                            ['fontColor', 'hiliteColor', 'textStyle'],
                            ['removeFormat'],
                            ['outdent', 'indent'],
                            ['align', 'horizontalRule', 'list', 'lineHeight'],
                            ['table', 'link', 'image', 'video'],
                            ['fullScreen', 'showBlocks', 'codeView'],
                            ['preview'],
                            // responsive
                            ['%1161', [
                                ['undo', 'redo'],
                                [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
                                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                ['fontColor', 'hiliteColor', 'textStyle'],
                                ['removeFormat'],
                                ['outdent', 'indent'],
                                ['align', 'horizontalRule', 'list', 'lineHeight'],
                                ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview'],
                                ['-right', ':r-Table&Media-default.more_plus', 'table', 'link', 'image', 'video'],
                            ]],
                            ['%893', [
                                ['undo', 'redo'],
                                [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
                                ['bold', 'underline', 'italic', 'strike'],
                                [':t-Fonts-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
                                ['removeFormat'],
                                ['outdent', 'indent'],
                                ['align', 'horizontalRule', 'list', 'lineHeight'],
                                ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview'],
                                ['-right', ':r-Table&Media-default.more_plus', 'table', 'link', 'image', 'video'],
                            ]],
                            ['%855', [
                                ['undo', 'redo'],
                                [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
                                [':t-Fonts-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
                                ['removeFormat'],
                                ['outdent', 'indent'],
                                ['align', 'horizontalRule', 'list', 'lineHeight'],
                                [':r-Table&Media-default.more_plus', 'table', 'link', 'image', 'video'],
                                ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview'],
                            ]],
                            ['%563', [
                                ['undo', 'redo'],
                                [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
                                [':t-Fonts-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
                                ['removeFormat'],
                                ['outdent', 'indent'],
                                [':e-List&Line-default.more_horizontal', 'align', 'horizontalRule', 'list', 'lineHeight'],
                                [':r-Table&Media-default.more_plus', 'table', 'link', 'image', 'video'],
                                ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview'],
                            ]],
                            ['%458', [
                                ['undo', 'redo'],
                                [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
                                [':t-Fonts-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
                                [':e-List&Line-default.more_horizontal', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
                                [':r-Table&Media-default.more_plus', 'table', 'link', 'image', 'video'],
                                ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview'],
                            ]]
                        ],
                        placeholder: "Comienza a escribir tu blog...",
                        charCounter: true,
                        }}
                        defaultValue=""
                    />
                </div>

                <div className="d-grid gap-2 col-4 mx-auto">
                    <button className="btn btn-primary">
                        {editIndex !== null ? 'Actualizar' : 'Agregar'}
                    </button>
                </div>
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