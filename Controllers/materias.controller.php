<?php

require_once('../Models/cls_materias.model.php');
$materias = new Clase_Materias();

switch ($_GET['op']) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $materias->todos(); //llamo al modelo de estudiantes e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;


    case 'uno':
        $Id_materia = $_POST['Id_materia'];
        $datos = array();
        $datos = $materias->uno($Id_materia);
       $uno = mysqli_fetch_assoc($datos);
        echo json_encode($uno);
        break;

    case 'insertar':
        $Nombre_materia = $_POST['Nombre_materia'];
        $Id_estudiante = $_POST['Id_estudiante'];
        $Calificacion = $_POST['Calificacion'];
        $Fecha_examen = $_POST['Fecha_examen'];
        $datos = array();
        $datos = $materias->insertar($Nombre_materia, $Id_estudiante, $Calificacion, $Fecha_examen);
        echo json_encode($datos);
        break;
    case 'actualizar':
        $Id_materia = $_POST['Id_materia'];
        $Nombre_materia = $_POST['Nombre_materia'];
        $Id_estudiante = $_POST['Id_estudiante'];
        $Calificacion = $_POST['Calificacion'];
        $Fecha_examen = $_POST['Fecha_examen'];
        $datos = array();
        $datos = $materias->actualizar($Id_materia, $Nombre_materia, $Id_materia, $Calificacion, $Fecha_examen);
        echo json_encode($datos);
        break;
    case 'eliminar':
        $Id_materia = $_POST['Id_materia'];
        $datos = array();
        $datos = $materias->eliminar($Id_materia);
        echo json_encode($datos);
        break;
}
