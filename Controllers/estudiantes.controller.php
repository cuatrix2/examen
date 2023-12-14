<?php
require_once('../Models/cls_estudiante.model.php');
$estudiantes = new Clase_Estudiantes();
switch ($_GET['op']) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $estudiantes->todos(); //llamo al modelo de estudiantes e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;
    case "uno":
        $Id_estudiante = $_POST["Id_estudiante"];
        $datos = array();
        $datos = $estudiantes->uno($Id_estudiante);
        $uno = mysqli_fetch_assoc($datos);
        echo json_encode($uno);
        break;

    case "insertar":
        $Cedula = $_POST["Cedula"];
        $Nombre = $_POST["Nombre"];
        $Edad = $_POST["Edad"];
        $Carrera = $_POST["Carrera"];
        $Promedio = $_POST["Promedio"];
        $datos = array();
        $datos = $estudiantes->insertar($Cedula, $Nombre, $Edad, $Carrera, $Promedio);
        echo json_encode($datos);
        break;

    case "actualizar":
        $Id_estudiante = $_POST["Id_estudiante"];
        $Cedula = $_POST["Cedula"];
        $Nombre = $_POST["Nombre"];
        $Edad = $_POST["Edad"];
        $Carrera = $_POST["Carrera"];
        $Promedio = $_POST["Promedio"];
        $datos = array();
        $datos = $estudiantes->actualizar($Id_estudiante, $Cedula, $Nombre, $Edad, $Carrera, $Promedio);
        echo json_encode($datos);
        break;

    case "eliminar":
        $Id_estudiante = $_POST["Id_estudiante"];
        $datos = array();
        $datos = $estudiantes->eliminar($Id_estudiante);
        echo json_encode($datos);
        break;

    case "cedula_repetida":
        $Cedula = $_POST["Cedula"];
        $datos = array(); //defino un arreglo
        $datos = $estudiantes->cedula_repetida($Cedula); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
}
