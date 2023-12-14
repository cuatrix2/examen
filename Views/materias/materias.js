function init() {
    $("#frm_materias").on("submit", function (e) {
      guardaryeditar(e);
    });
  }
  
  $().ready(()=>{
    todos();
});

var todos = () =>{
    var html = "";
    $.get("../../Controllers/materias.controller.php?op=todos", (res) => {
        console.log(res);
      res = JSON.parse(res);
      $.each(res, (index, valor) => {
       
        html += `<tr>
                <td>${index + 1}</td>
                <td>${valor.Nombre_materia}</td>
                <td>${valor.Nombre}</td>
                <td>${valor.Calificacion}</td>
                <td>${valor.Fecha_examen}</td>
                
            <td>
            <button class='btn btn-success' onclick='editar(${
              valor.Id_materia
            })'>Editar</button>
            <button class='btn btn-danger' onclick='eliminar(${
              valor.Id_materia
            })'>Eliminar</button>
            <button class='btn btn-info' onclick='ver(${
              valor.Id_materia
            })'>Ver</button>
            </td></tr>
                `;
      });
      $("#tabla_materias").html(html);
    });
  };
  var guardaryeditar = (e) => {
    e.preventDefault();
    var dato = new FormData($("#frm_materias")[0]);
    var ruta = "";
    var Id_materia = document.getElementById("Id_materia").value;
    if (Id_materia > 0) {
      ruta = "../../Controllers/materias.controller.php?op=actualizar";

    } else {
      ruta = "../../Controllers/materias.controller.php?op=insertar";
    }
    $.ajax({
      url: ruta,
      type: "POST",
      data: dato,
      contentType: false,
      processData: false,
      success: function (res) {
        res = JSON.parse(res);
        console.log(res);
        if (res == "ok") {
          Swal.fire("materias", "Registrado con éxito", "success");
          todos();
          limpia_Cajas();
        } else {
          Swal.fire("materias", "Error al guardo, intente mas tarde", "error");
        }
      },
    });
  };

  var cargaEstudiantes = () => {
    return new Promise((resolve, reject) => {
      $.post("../../Controllers/estudiantes.controller.php?op=todos", (res) => {
        res = JSON.parse(res);
        var html = "";
        $.each(res, (index, val) => {
          html += `<option value="${val.Id_estudiante}"> ${val.Nombre}</option>`;
        });
        $("#Id_estudiante").html(html);
        resolve();
      }).fail((error) => {
        reject(error);
      });
    });
  };
  var editar = async (Id_materia) => {
    await cargaEstudiantes();
    $.post(
      "../../Controllers/materias.controller.php?op=uno",
      { Id_materia: Id_materia },
      (res) => {
        res = JSON.parse(res);
        console.log(res);
  
        $("#Id_materia").val(res.Id_materia);
        $("#Id_estudiante").val(res.Id_estudiante);
        //document.getElementById("PaisId").value = res.PaisesId
       
      }
    );
    $("#Modal_materias").modal("show");
  };
  var eliminar = (Id_materia) => {
    Swal.fire({
      title: "Materia",
      text: "Esta seguro de eliminar la provincia",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        $.post(
          "../../Controllers/materias.controller.php?op=eliminar",
          { Id_materia: Id_materia },
          (res) => {
            res = JSON.parse(res);
            if (res === "ok") {
              Swal.fire("materias", "materia Eliminada", "success");
              todos();
            } else {
              Swal.fire("Error", res, "error");
            }
          }
        );
      }
    });
  
    limpia_Cajas();
  };
  var limpia_Cajas = () => {
    document.getElementById("Id_materia").value = "";
    document.getElementById("Id_estudiante").value = "";
    document.getElementById("Nombre_materia").value = "";
    document.getElementById("Calificacion").value ="";
    document.getElementById("Fecha_examen").value = "";
    $("#Modal_materias").modal("hide");
  };

  init();