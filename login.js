/// Obtén referencia al formulario
const loginForm = document.getElementById('loginForm');

// Agrega un evento de escucha para el envío del formulario
loginForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Evita la acción de envío predeterminada

  // Obtiene los valores de nombre de usuario, contraseña y tipo de usuario
  const user = document.getElementById('user').value;
  const password = document.getElementById('password').value;
  const userType = document.getElementById('user-type').value;

  // Crea un objeto de datos para enviar al servidor
  const data = {
    user: user,
    password: password,
    userType: userType
  };

  // Realiza una petición AJAX al servidor
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'loginController.php', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // La autenticación fue exitosa
      const response = JSON.parse(xhr.responseText);

      // Redirecciona al usuario según el tipo de usuario
      if (response.userType === 'U') {
        window.location.href = 'reporte.html';
      } else if (response.userType === 'P') {
        window.location.href = 'reporte.html';
      } else if (response.userType === 'l') {
        window.location.href = 'reporteInten.html';
      }else if($out[0] == "succefull_login"){
        window.location.href = 'tablaex.html';
      }
    } else {
      // La autenticación falló
      console.log('Error de autenticación');
    }
  };
  xhr.send(JSON.stringify(data));
});



/////esta es una segunda opcion de redireccionamiento


// Dentro del bloque "onload" de la petición AJAX
if (xhr.status === 200) {
  const response = JSON.parse(xhr.responseText);
  const username = response.username;
  const password = response.password;
  const userType = response.userType;

  // Lee el archivo Excel
  const data_base = document.getElementById('data_base');
  const file = data_base.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Obtiene la hoja de trabajo del archivo Excel (suponiendo que el nombre de la hoja es "Usuarios")
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convierte los datos de la hoja de trabajo en un objeto JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Realiza la comparación de usuarios
    const foundUser = jsonData.find(function(user) {
      return user.username === username && user.password === password && user.userType === userType;
    });

    if (foundUser) {
      // La autenticación fue exitosa
      if (userType === 'tipo1') {
        window.location.href = 'pagina_tipo1.html';
      } else if (userType === 'tipo2') {
        window.location.href = 'pagina_tipo2.html';
      } else if (userType === 'tipo3') {
        window.location.href = 'pagina_tipo3.html';
      }
    } else {
      // La autenticación falló
      console.log('Error de autenticación');
    }
  };
  reader.readAsArrayBuffer(file);
}
