//archivo de donde llamar al procedimiento
//controlador

function init() {
  $("#form_materias").on("submit", function (e) {
    guardaryeditar(e);
  });
}

$().ready(() => {
  //detecta carga de la pagina
  todos_controlador();
});

var todos_controlador = () => {
  var todos = new Materias_Model("", "", "", "", "","","todos");
  todos.todos();
};

var guardaryeditar = (e) => {
  e.preventDefault();
  var formData = new FormData($("#form_materias")[0]);
 
  var Id_materia = document.getElementById("Id_materia").value
  console.log(Id_materia);
  if(Id_materia > 0){
    var materias = new Materias_Model("","","","","",formData,"editar");
    materias.editar();
  }else{
    var materias = new Materias_Model("","","","","",formData,"insertar");
    materias.insertar();  
  }
};

var editar = (Id_materia) => {
  var uno = new Materias_Model(Id_materia, "", "", "", "", "", "uno");
  uno.uno();
};


var eliminar=(Id_materia)=>{
    var eliminar = new Materias_Model(Id_materia,"", "", "", "", "","eliminar");
    eliminar.eliminar();
}


init();
