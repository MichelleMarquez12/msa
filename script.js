$(document).ready(function () {
  var jsonData; // Variable para almacenar los datos JSON
  var currentIndex = 0; // Índice actual de los datos mostrados
  var filteredData; // Datos filtrados

  // Obtener los datos JSON mediante Ajax al cargar la página
  $.ajax({
    url: 'data.json',
    dataType: 'json',
    success: function (data) {
      jsonData = data;
      showNextData(); // Mostrar los primeros 10 datos al cargar la página
    },
    error: function () {
      alert('Error al obtener los datos.');
    }
  });

  // Búsqueda mediante Ajax
  $('#search-input').on('input', function () {
    var searchText = $(this).val().toLowerCase();

    filteredData = jsonData.filter(function (item) {
      var found = false;

      // Verificar si el término de búsqueda coincide en alguno de los campos
      $.each(item, function (key, value) {
        var fieldValue = value.toString().toLowerCase();
        if (fieldValue.includes(searchText)) {
          found = true;
          return false; // Salir del bucle cuando se encuentra una coincidencia
        }
      });

      return found;
    });

    // Ordenar los datos por fecha y hora de forma descendente
    filteredData.sort(function (a, b) {
      var dateA = new Date(a.fecha + ' ' + a.hora);
      var dateB = new Date(b.fecha + ' ' + b.hora);
      return dateB - dateA;
    });

    currentIndex = 0; // Reiniciar el índice actual al realizar una nueva búsqueda
    showNextData(); // Mostrar los datos filtrados o todos los datos
  });

  // Función para mostrar los siguientes 10 datos de la tabla
  function showNextData() {
    var tableBody = $('#data-body');
    tableBody.empty();

    var data = filteredData || jsonData; // Usar los datos filtrados o todos los datos

    if (data.length === 0) {
      // No se encontraron datos
      var row = $('<tr>');
      row.append('<td colspan="7">No se encuentran los datos </td>');
      tableBody.append(row);
      return;
    }

    // Calcular el índice final a mostrar
    var endIndex = currentIndex + 10;
    if (endIndex > data.length) {
      endIndex = data.length;
    }

    // Recorrer los datos y construir las filas de la tabla
    for (var i = currentIndex; i < endIndex; i++) {
      var item = data[i];
      var row = $('<tr>');
      row.append('<td>' + item.tipo_rep + '</td>');
      row.append('<td>' + item.usr + '</td>');
      row.append('<td>' + item.tipo_usr + '</td>');
      row.append('<td>' + item.ubicacion + '</td>');
      row.append('<td>' + item.fecha + '</td>');
      row.append('<td>' + item.hora + '</td>');
      row.append('<td>' + item.descripcion + '</td>');
      tableBody.append(row);
    }

    // Actualizar el índice actual
    currentIndex = endIndex;

    // Mostrar u ocultar el botón "Mostrar más" según corresponda
    if (currentIndex < data.length) {
      $('#show-more-button').show();
    } else {
      $('#show-more-button').hide();
    }

    // Mostrar el botón de reset si se ha mostrado al menos una vez
    if (currentIndex > 10) {
      $('#reset-button').show();
    } else {
      $('#reset-button').hide();
    }
  }

  // Manejador de evento para el botón "Mostrar más"
  $('#show-more-button').on('click', function () {
    showNextData();
  });

  // Manejador de evento para el botón "Reset"
  $('#reset-button').on('click', function () {
    currentIndex = 0; // Reiniciar el índice actual
    filteredData = null; // Reiniciar los datos filtrados
    $('#search-input').val(''); // Limpiar el campo de búsqueda
    showNextData(); // Mostrar los primeros 10 datos
    $('#reset-button').hide(); // Ocultar el botón de reset
  });
  
});

