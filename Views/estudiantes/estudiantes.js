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