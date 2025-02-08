document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('file');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const response = await fetch('http://localhost:8088/api/files/upload', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        alert('Archivo subido con éxito');
        loadFiles();
    }
});

async function deleteFile(id) {
    const response = await fetch(`http://localhost:8089/api/files/delete/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Archivo eliminado');
        loadFiles(); // Recargar la lista después de eliminar
    } else {
        alert('Error al eliminar archivo');
    }
}

async function loadFiles() {
    try {
        const response = await fetch('http://localhost:8090/api/files');
        const files = await response.json();
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';

        if (files.length === 0) {
            fileList.innerHTML = "<li>No hay archivos disponibles.</li>";
            return;
        }

        files.forEach(file => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${file.filename}</span>
                <button class="delete-btn" onclick="deleteFile('${file._id}')">Eliminar</button>`;
            fileList.appendChild(li);
        });

        console.log("📄 Lista de archivos cargada:", files);
    } catch (error) {
        console.error("❌ Error al cargar archivos:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadFiles);

