class Materias_Model {
    constructor(
      Id_materia,
      Nombre_materia,
      Id_estudiante,
      Calificacion,
      Fecha_examen,
      Rol,
      Ruta
    ) { 
        this.Id_materia = Id_materia;
        this.Nombre_materia = Nombre_materia;
        this.Id_estudiante = Id_estudiante;
        this.Calificacion = Calificacion;
        this.Fecha_examen = Fecha_examen;
        this.Rol = Rol;
        this.Ruta = Ruta;
    }
    todos() {
        var html = "";
        $.get("../../Controllers/materias.controller.php?op=" + this.Ruta, (res) => {
          res = JSON.parse(res);

          $.each(res, (index, valor) => {
            html += `<tr>
                    <td>${index + 1}</td>
                    <td>${valor.Nombre_materia}</td>
                    <td>${valor.Id_estudiante}</td>
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
      }
    
      insertar() {
        var dato = new FormData();
        dato = this.Rol;
        $.ajax({
          url: "../../Controllers/materias.controller.php?op=insertar",
          type: "POST",
          data: dato,
          contentType: false,
          processData: false,
          success: function (res) {
            res = JSON.parse(res);
            console.log(res);
            if (res === "ok") {
              Swal.fire("Materias", "Materia Registrada", "success");
              todos_controlador();
            } else {
              Swal.fire("Error", res, "error");
            }
          },
        });
        this.limpia_Cajas();
      }
    
    
    
      uno() {
        var Id_materia = this.Id_materia;
        console.log(Id_materia);
        $.post(
          "../../Controllers/materias.controller.php?op=uno",
          { Id_materia: Id_materia },
          (res) => {
            console.log(res);
            res = JSON.parse(res);
            $("#Id_materia").val(res.Id_materia);
            $("#Nombre_materia").val(res.Nombre_materia);
            $("#Id_estudiante").val(res.Id_estudiante);
            $("#Calificacion").val(res.Calificacion);
            $("#Fecha_examen").val(res.Fecha_examen);
          
            }
            
        );
        $("#Modal_materias").modal("show");
      }
    
      editar() {
        var dato = new FormData();
        dato = this.Rol;
        $.ajax({
          url: "../../Controllers/materias.controller.php?op=actualizar",
          type: "POST",
          data: dato,
          contentType: false,
          processData: false,
          success: function (res) {
            res = JSON.parse(res);
            if (res === "ok") {
              Swal.fire("materias", "materias Registrada", "success");
              todos_controlador();
            } else {
              Swal.fire("Error", res, "error");
            }
          },
        });
        this.limpia_Cajas();
      }
    
      eliminar() {
        var Id_materia = this.Id_materia;
    
        Swal.fire({
          title: "materias",
          text: "Esta seguro de eliminar el usuario",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Eliminar",
        }).then((result) => {
          if (result.isConfirmed) {
            $.post(
              "../../Controllers/materia.controller.php?op=eliminar",
              { Id_materia: Id_materia },
              (res) => {
              
                res = JSON.parse(res);
                if (res === "ok") {
                  Swal.fire("materias", "materia Eliminada", "success");
                  todos_controlador();
                } else {
                  Swal.fire("Error", res, "error");
                }
              }
            );
          }
        });
    
        this.limpia_Cajas();
      }
    
      limpia_Cajas() {
        document.getElementById("Nombre_materia").value = "";
        document.getElementById("Calificacion").value = "";
        $("#Id_materia").val("");
        $("#Modal_materias").modal("hide");
      }
     
}