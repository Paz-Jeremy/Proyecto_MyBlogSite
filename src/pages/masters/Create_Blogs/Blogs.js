import { useState, useRef } from "react";
import "./Blogs.css";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import es from "suneditor/src/lang/es";

import {createNewBlogs} from "../../../api/blogsService";
import { updateBlogs } from "../../../api/blogsService";
import { supabase } from "../../../utils/supabaseClient";

const BUCKET = process.env.REACT_APP_SUPABASE_BUCKET;
const uploadImage = async (file, bucket = BUCKET, folder = 'images') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;
  const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600', upsert: true
  });
  if (uploadError) throw uploadError;
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return urlData.publicUrl;
};

function Blogs({ blogs, setBlogs }) {
  const editorRef = useRef(null);
  const [form, setForm] = useState({
    image_url: null,
    title: "",
    author: "",
    description: "",
    content: "",
    publish_date: "",
    userId: JSON.parse(localStorage.getItem("user")).id
  });
  // Ahora ‘blogs’ y ‘setBlogs’ vienen de props, ya no los inicializamos aquí.
  const [editIndex, setEditIndex] = useState(null);

  const resetForm = () => {
    setForm({ image_url: null, title: "", author: "", description: "", content: "", publish_date: "", userId: JSON.parse(localStorage.getItem("user")).id });
  };

  const handleOnChangeInputs = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Manejador específico para el input de tipo file (imagen)
  const handleOnImageChange = (e) => {
    const file = e.target.files[0];
    setForm(prev => ({ ...prev, image_url: file || null }));
  };

  // Manejador “Editar” (cargar datos de un blog existente en el formulario)
  const handleOnEdit = (id) => {
    setForm(blogs[id]);
    setEditIndex(id);
  };

  // Manejador “Eliminar” (borra un blog de la lista)
  const handleOnDelete = (id) => {
    const updated = blogs.filter((_, index) => index !== id);
    setBlogs(updated);
    if (editIndex === id) {
      // Si estaba editando ese mismo índice, cancelar edición
      setEditIndex(null);
      resetForm();
    }
  };

  // Manejador “Agregar” o “Actualizar” (al enviar el formulario)
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image_url;
      if (imageUrl instanceof File) {
        imageUrl = await uploadImage(imageUrl);
      }
      const payload = { ...form, image_url: imageUrl };

      if (editIndex !== null) {
        // Modo edición
        const { data } = await updateBlogs(blogs[editIndex].id, payload);
        console.log("Blog actualizado:", data);
        const updated = [...blogs];
        updated[editIndex] = payload;
        setBlogs(updated);
        alert("Blog actualizado exitosamente");
      } else {
        // Modo creación
        const res = await createNewBlogs(payload);
        console.log("Blog agregado (backend response):", res.data || res);
        setBlogs([...blogs, payload]);
        alert("Blog agregado exitosamente");
        editorRef.current.setContents(""); // Limpiar el editor
      }
    } catch (error) {
      console.error("Error en envío de blog:", error);
      alert("Hubo un error al subir la imagen o crear el blog. Revisa la consola.");
    } finally {
      resetForm();
      setEditIndex(null);
    }
  };

  // Definir inputs de texto
  const fields = [
    { name: "title", label: "Título", type: "text" },
    { name: "author", label: "Autor", type: "text" },
    { name: "description", label: "Descripción", type: "text" },
    { name: "publish_date", label: "Fecha de Publicación", type: "date" }
  ];

  // Usamos la key solo basada en editIndex: no va ligada al contenido. fuerza a React a remontar el SunEditor cuando cambias de blog a editar, reiniciando su estado interno.
  const editorKey = editIndex !== null ? `edit-${editIndex}` : "new-editor";

  return (
    <div style={{ padding: "20px 40px" }}>
      <h2>Gestión de Blogs</h2>

      <form onSubmit={handleOnSubmit} className="mb-4 form-Blogs">
        {/* --- INPUT para cargar la imagen --- */}
        <div className="contenedor-Upload">
          <label className="label-img">Imagen de portada:</label>
          <input
            className="input-img"
            name="image_url"
            type="file"
            accept="image/*"
            onChange={handleOnImageChange}
          />
        </div>

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

        {/* SunEditor */}
        <div className="contenedorEditor">
          <SunEditor
            lang={es}
            key={editorKey}
            // Aquí recibimos la instancia core (Es para obtener algunas funciones del editor)
            getSunEditorInstance={(core) => {
              editorRef.current = core;
            }}
            defaultValue={form.content}
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
                      [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock','paragraphStyle', 'blockquote'],
                      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                      ['fontColor', 'hiliteColor', 'textStyle'],
                      ['removeFormat'],
                      ['outdent', 'indent'],
                      ['align', 'horizontalRule', 'list', 'lineHeight'],
                      ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks','codeView', 'preview'],
                      ['-right', ':r-Table&Media-default.more_plus', 'table', 'link', 'image','video'],
                  ]],
                  ['%893', [
                      ['undo', 'redo'],
                      [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock','paragraphStyle', 'blockquote'],
                      ['bold', 'underline', 'italic', 'strike'],
                      [':t-Fonts-default.more_text', 'subscript', 'superscript', 'fontColor','hiliteColor', 'textStyle'],
                      ['removeFormat'],
                      ['outdent', 'indent'],
                      ['align', 'horizontalRule', 'list', 'lineHeight'],
                      ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks','codeView', 'preview'],
                      ['-right', ':r-Table&Media-default.more_plus', 'table', 'link', 'image','video'],
                  ]],
                  ['%855', [
                      ['undo', 'redo'],
                      [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock','paragraphStyle', 'blockquote'],
                      [':t-Fonts-default.more_text', 'bold', 'underline', 'italic', 'strike','subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
                      ['removeFormat'],
                      ['outdent', 'indent'],
                      ['align', 'horizontalRule', 'list', 'lineHeight'],
                      [':r-Table&Media-default.more_plus', 'table', 'link', 'image', 'video'],
                      ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks','codeView', 'preview'],
                  ]],
                  ['%563', [
                      ['undo', 'redo'],
                      [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock','paragraphStyle', 'blockquote'],
                      [':t-Fonts-default.more_text', 'bold', 'underline', 'italic', 'strike','subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
                      ['removeFormat'],
                      ['outdent', 'indent'],
                      [':e-List&Line-default.more_horizontal', 'align', 'horizontalRule','list', 'lineHeight'],
                      [':r-Table&Media-default.more_plus', 'table', 'link', 'image', 'video'],
                      ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks','codeView', 'preview'],
                  ]],
                  ['%458', [
                      ['undo', 'redo'],
                      [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock','paragraphStyle', 'blockquote'],
                      [':t-Fonts-default.more_text', 'bold', 'underline', 'italic', 'strike','subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle','removeFormat'],
                      [':e-List&Line-default.more_horizontal', 'outdent', 'indent', 'align','horizontalRule', 'list', 'lineHeight'],
                      [':r-Table&Media-default.more_plus', 'table', 'link', 'image', 'video'],
                      ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks','codeView', 'preview'],
                  ]]
              ],
              placeholder: "Comienza a escribir tu blog..."
            }}
            onChange={(html) => {
              setForm((prev) => ({ ...prev, content: html }));
            }}
          />
        </div>

        <div className="d-grid gap-2 col-4 mx-auto">
          <button className="btn btn-primary">
            {editIndex !== null ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </form>

      <h3>Mis Blogs:</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Imagen</th>
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
              <td>
                {blog.image_url ? (
                  // Si es URL (string) o File, lo muestro con createObjectURL:
                  <img
                    src={
                      blog.image_url instanceof File
                        ? URL.createObjectURL(blog.image_url)
                        : blog.image_url
                    }
                    alt={`Blog ${id}`}
                    style={{ width: '80px', objectFit: 'cover' }}
                  />
                ) : (
                  '–'
                )}
              </td>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>{blog.description}</td>
              <td>{blog.publish_date}</td>
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
