// Opciones que tiene el editor de texto

const toolbar = [

    // Estilos de letra
    ['bold', 'italic', 'underline', 'strike'], 
    [{align: [] }], // Alineamientos

    [{ size: ['small', false, 'large', 'huge '] }], //Tamaños de letras

    // Tipos de listas
    [{ list: 'ordered' }, { list: 'bullet' }], 
    [{ indent: '-1'}, {indent: '+1'}], //Tabulador

    [{ header: [1, 2, 3, 4, 5, 6, false] }], //Tamaños de encabezado
    ['link', 'image', 'video'],
    [{ color: [] }, { background: [] }], //Colores de fondo

    ['clean']
]

export default toolbar