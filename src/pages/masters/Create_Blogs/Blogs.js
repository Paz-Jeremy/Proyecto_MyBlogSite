import { useState, useRef } from "react";
import "./Blogs.css";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

function Blogs() {
  const editorRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    editorContent: "",
    publishDate: ""
  });

  const [blogs, setBlogs] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Inputs plano: title, author, description, publishDate
  const handleOnChangeInputs = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Manejador “Editar” (cargar datos de un blog existente en el formulario)
  const handleOnEdit = (id) => {
    setForm(blogs[id]);
    setEditIndex(id);
  };

  // Manejador “Eliminar” (borrar un blog de la lista)
  const handleOnDelete = (id) => {
    // Crea un nuevo array excluyendo el elemento cuya posición es id, filter recorre todo el array y mantiene todos los índices distintos de id.
    const updatedBlogs = blogs.filter((blog, index) => index !== id);

    // Actualiza el estado blogs con ese array filtrado (es decir, el blog en posición id desaparece).
    setBlogs(updatedBlogs);

    if (editIndex === id) {
      // Si estaba editando ese mismo índice, cancelar edición
      setEditIndex(null);
      // Y limpio los campos
      setForm({
        title: "",
        author: "",
        description: "",
        editorContent: "",
        publishDate: ""
      });
    }
  };

  // Manejador “Agregar” o “Actualizar” (al enviar el formulario)
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(editIndex !== null){
      // Modo “Actualizar”
      const updatedBlogs = [...blogs];
      updatedBlogs[editIndex] = form;
      setBlogs(updatedBlogs);
      setEditIndex(null);
    }else{
      // Modo “Agregar”
      setBlogs([...blogs, form]);
      // console.log(form);
    }
      
    setForm({
      title: "",
      author: "",
      description: "",
      editorContent: "",
      publishDate: ""
    });
  };

  // Definir inputs de texto
  const fields = [
    { name: "title", label: "Título", type: "text" },
    { name: "author", label: "Autor", type: "text" },
    { name: "description", label: "Descripción", type: "text" },
    { name: "publishDate", label: "Fecha de Publicación", type: "date" }
  ];

  // Usamos la key solo basada en editIndex: no va ligada al contenido.
  const editorKey = editIndex !== null ? `edit-${editIndex}` : "new-editor";

  return (
    <div style={{ padding: "20px 40px" }}>
      <h2>Gestión de Blogs</h2>

      <form onSubmit={handleOnSubmit} className="mb-4 form-Blogs">
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

        {/* EDITOR RICH-TEXT */}
        <div className="contenedorEditor">
          <SunEditor
            key={editorKey}
            ref={editorRef}
            defaultValue={form.editorContent}
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
              setForm((prev) => ({ ...prev, editorContent: html }));
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
