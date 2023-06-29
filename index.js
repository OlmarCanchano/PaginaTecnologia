const express = require('express');
const app = express();
const multer = require('multer');
const xlsx = require('xlsx');

const storage = multer.diskStorage({
    destination: 'uploads/', // Carpeta donde se guardarán los archivos
    filename: function(req, file, cb) {
      // Renombrar el archivo
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  const upload = multer({ storage: storage });

// Ruta para subir el archivo
app.post('/upload', upload.single('excelFile'), (req, res) => {
    const filePath = req.file.path;

    // Cargar el archivo de Excel
    const workbook = xlsx.readFile(filePath);
    
    // Obtener la primera hoja de cálculo
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  
    // Convertir los datos a formato JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
    // Hacer algo con los datos...
    console.log(jsonData);
  
    res.send('Archivo cargado y procesado');
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/formulario.html');
});

app.listen(3000, 'localhost', () => {
  console.log('Servidor iniciado en http://localhost:3000');
});