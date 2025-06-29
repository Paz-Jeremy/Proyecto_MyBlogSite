import { useState, useRef, useEffect } from "react";
import "./Blogs.css";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import es from "suneditor/src/lang/es";

import {createNewBlogs} from "../../../api/blogsService";
import { updateBlogs } from "../../../api/blogsService";
import { deleteBlogs } from "../../../api/blogsService";
import { supabase } from "../../../utils/supabaseClient";
import { getBlogByUser } from "../../../api/blogsService";

const BUCKET = process.env.REACT_APP_SUPABASE_BUCKET;
const uploadImage = async (file, bucket = BUCKET, folder = 'images') => {
  const fileExt = file.name.split('.').pop(); // Obtiene la extensión del archivo
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`; // Genera un nombre único para evitar colisiones
  const filePath = `${folder}/${fileName}`; // Define la ruta completa del archivo en el bucket

  // Sube el archivo
  const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600', upsert: true
  });

  // Si hay un error al subir, lo lanzamos
  if (uploadError) throw uploadError;

  // Obtiene la URL pública del archivo subido
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return urlData.publicUrl;
};

function Blogs( { blogs, setBlogs } ) {
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

  const [blogsByUser, setBlogsByUser] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // cargar blogs del usuario al montar el componente y los asigna a blogsByUser
  useEffect(()=>{
          const fetchBlogsByUser = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem("user")).id;
                const { data } = await getBlogByUser(userId);
                setBlogsByUser(data);
                console.log("Blogs del usuario:", data);
            } catch (err) {
                console.log("Error al obtener blogs del usuario:", err);
            }
          }
          fetchBlogsByUser();
      }, [])

  // Resetea el formulario a su estado inicial
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
  const handleOnEdit = (index) => {
    const blog = blogsByUser[index];
    setForm(blog);
    setEditIndex(index);
  };

  // Manejador “Eliminar” (borra un blog de la lista)
  const handleOnDelete = async (index) => {
    if (!window.confirm("¿Estás seguro de eliminar este blog? Esta acción no se puede deshacer.")) return;
    try {
      await deleteBlogs(blogsByUser[index].id);
      const updated = blogsByUser.filter((_, i) => i !== index);
      setBlogsByUser(updated); // Actualiza el estado local de blogsByUser
      setBlogs(prev => prev.filter(b => b.id !== blogsByUser[index].id)); // ← actualiza el global
      alert("Blog eliminado exitosamente");
      if (editIndex === index) {
        setEditIndex(null);
        resetForm();
      }
    } catch (err) {
      console.error("Error al eliminar blog:", err);
      alert("Error al eliminar el blog. Revisa la consola.");
    }
  };

  // Manejador “Agregar” o “Actualizar” (al enviar el formulario)
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let imageUrl = form.image_url;
      if (imageUrl instanceof File) {
        imageUrl = await uploadImage(imageUrl);
      }
      const payload = { ...form, image_url: imageUrl };

      if (editIndex !== null) {
        // Modo edición
        const { data } = await updateBlogs(blogsByUser[editIndex].id, payload);
        console.log("Blog actualizado:", data);
        const updated = [...blogsByUser];
        updated[editIndex] = payload;
        setBlogsByUser(updated);
        setBlogs(prev =>
          prev.map(b => (b.id === payload.id ? payload : b))
        );
        alert("Blog actualizado exitosamente");
      } else {
        // Modo creación
        const response = await createNewBlogs(payload);
        const newBlog = Array.isArray(response.data?.data) ? response.data.data[0] : response.data;
        console.log("Blog creado:", newBlog);
        setBlogsByUser([...blogsByUser, newBlog]); // Agrega el nuevo blog al estado local
        setBlogs(prev => [...prev, newBlog]); // Actualiza el estado global de blogs
        alert("Blog agregado exitosamente");
        editorRef.current.setContents(""); // Limpiar el editor
      }
    } catch (error) {
      console.error("Error en envío de blog:", error);
      alert("Hubo un error al subir la imagen o crear el blog. Revisa la consola.");
    } finally {
      resetForm();
      setEditIndex(null);
      setIsLoading(false);
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
          {isLoading ? (
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              {' '}{editIndex !== null ? "Actualizando..." : "Agregando..."}
            </button>
          ) : (
            <button className="btn btn-primary" type="submit">
              {editIndex !== null ? "Actualizar" : "Agregar"}
            </button>
          )}
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
        <tbody className="table-group-divider">
          {blogsByUser.map((blog, id) => (
          <tr key={id}>
            <td className="align-middle">
              {blog.image_url ? (
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
            <td className="align-middle">{blog.title}</td>
            <td className="align-middle">{blog.author}</td>
            <td className="align-middle">{blog.description}</td>
            <td className="align-middle">{blog.publish_date}</td>
            <td className="align-middle">
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
