function init(){
    $("#frm_estudiantes").on("submit", function(e){
        guardaryeditar(e);
    });
}


$().ready(()=>{
    todos();
});

var todos = () =>{
    var html = "";
    $.get("../../Controllers/estudiantes.controller.php?op=todos", (res) => {
      res = JSON.parse(res);
      $.each(res, (index, valor) => {
       
        html += `<tr>
                <td>${index + 1}</td>
                <td>${valor.Cedula}</td>
                <td>${valor.Nombre}</td>
                <td>${valor.Edad}</td>
                <td>${valor.Carrera}</td>
                <td>${valor.Promedio}</td>
            <td>
            <button class='btn btn-success' onclick='editar(${
              valor.Id_estudiante
            })'>Editar</button>
            <button class='btn btn-danger' onclick='eliminar(${
              valor.Id_estudiante
            })'>Eliminar</button>
            <button class='btn btn-info' onclick='ver(${
              valor.Id_estudiante
            })'>Ver</button>
            </td></tr>
                `;
      });
      $("#tabla_estuadiantes").html(html);
    });
  };
  var guardaryeditar=(e)=>{
    e.preventDefault();
    var dato = new FormData($("#frm_estudiantes")[0]);
    var ruta = '';
    var Id_estudiante = document.getElementById("Id_estudiante").value
    if(Id_estudiante > 0){
     ruta = "../../Controllers/estudiantes.controller.php?op=actualizar"
    }else{
        ruta = "../../Controllers/estudiantes.controller.php?op=insertar"
    }
    $.ajax({
        url: ruta,
        type: "POST",
        data: dato,
        contentType: false,
        processData: false,
        success: function (res) {
          res = JSON.parse(res);
          if (res == "ok") {
            Swal.fire("estudiantes", "Registrado con éxito" , "success");
            todos();
          limpia_Cajas();
          } else {
            Swal.fire("estudiantes", "Error al guardo, intente mas rtarde", "error");
          }
        },
      });
  }
  var editar = (Id_estudiante)=>{
  
    $.post(
      "../../Controllers/estudiantes.controller.php?op=uno",
      { Id_estudiante: Id_estudiante },
      (res) => {
        res = JSON.parse(res);
        $("#Id_estudiante").val(res.Id_estudiante);
        $("#Cedula").val(res.Cedula);
        $("#Nombre").val(res.Nombre);
        $("#Edad").val(res.Edad);
        $("#Carrera").val(res.Carrera);
        $("#Promedio").val(res.Promedio);
    
      }
    );
    $("#Modal_estudiantes").modal("show");
  }

  var eliminar = (Id_estudiante)=>{
    Swal.fire({
        title: "Estudiantes",
        text: "Esta seguro de eliminar el estudiante",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          $.post(
            "../../Controllers/estudiantes.controller.php?op=eliminar",
            { Id_estudiante: Id_estudiante },
            (res) => {
              res = JSON.parse(res);
              if (res === "ok") {
                Swal.fire("Estudiantes", "Estudiante Eliminado", "success");
                todos();
              } else {
                Swal.fire("Error", res, "error");
              }
            }
          );
        }
      });
     limpia_Cajas();
  }

  function validarCedula() {
    var cedula = $("#Cedula").val();

    if (cedula.length == 10) {
        var digito_region = cedula.substring(0, 2);
        if (digito_region >= 1 && digito_region <= 24) {
            var ultimo_digito = cedula.substring(9, 10);
            var pares =
                parseInt(cedula.substring(1, 2)) +
                parseInt(cedula.substring(3, 4)) +
                parseInt(cedula.substring(5, 6)) +
                parseInt(cedula.substring(7, 8));
            var numero1 = cedula.substring(0, 1);
            numero1 = numero1 * 2;
            if (numero1 > 9) {
                numero1 = numero1 - 9;
            }
            var numero3 = cedula.substring(2, 3);
            numero3 = numero3 * 2;
            if (numero3 > 9) {
                numero3 = numero3 - 9;
            }
            var numero5 = cedula.substring(4, 5);
            numero5 = numero5 * 2;
            if (numero5 > 9) {
                numero5 = numero5 - 9;
            }
            var numero7 = cedula.substring(6, 7);
            numero7 = numero7 * 2;
            if (numero7 > 9) {
                numero7 = numero7 - 9;
            }
            var numero9 = cedula.substring(8, 9);
            numero9 = numero9 * 2;
            if (numero9 > 9) {
                numero9 = numero9 - 9;
            }
            var impares = numero1 + numero3 + numero5 + numero7 + numero9;
            var suma_total = pares + impares;
            var primer_digito_suma = String(suma_total).substring(0, 1);
            var decena = (parseInt(primer_digito_suma) + 1) * 10;
            var digito_validador = decena - suma_total;
            if (digito_validador == 10) digito_validador = 0;
            if (digito_validador == ultimo_digito) {
                $("#errorCedula").addClass("d-none");
                $("#errorCedula").html("");
                $("#CedulaRepetida").addClass("d-none");
            } else {
                $("#errorCedula").removeClass("d-none");
                $("#errorCedula").html("El número de cédula ingresado no es correcto");
                $("#CedulaRepetida").addClass("d-none");
            }
        } else {
            $("#errorCedula").removeClass("d-none");
            $("#errorCedula").html("El número de cédula ingresado no es correcto");
            $("#CedulaRepetida").addClass("d-none");
        }
    } else {
        $("#errorCedula").removeClass("d-none");
        $("#errorCedula").html("La cédula debe tener 10 dígitos");
        $("#CedulaRepetida").addClass("d-none");
    }
}
  
  function cedulaRepetida() {
    var cedula = $("#Cedula").val();
    $.post(
      "../../Controllers/usuario.controller.php?op=cedula_repetida",
      { Cedula: cedula },
      (res) => {
        res = JSON.parse(res);
        if (parseInt(res.cedula_repetida) > 0) {
          $("#CedulaRepetida").removeClass("d-none");
          $("#CedulaRepetida").html(
            "La cédula ingresada ya existe en la base de datos"
          );
          $("button").prop("disabled", true);
        } else {
          $("#CedulaRepetida").addClass("d-none");
          $("button").prop("disabled", false);
        }
      }
    );
  }
  


    var limpia_Cajas = () => {
    document.getElementById("Id_estudiante").value = "";
    document.getElementById("Cedula").value = "";
    document.getElementById("Nombre").value = "";
    document.getElementById("Edad").value = "";
    document.getElementById("Carrera").value = "";
    document.getElementById("Promedio").value = "";
    $("#Modal_estudiantes").modal("hide");
            
        }
    
    



 

init();