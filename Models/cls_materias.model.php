<?php
require_once('cls_conexion.model.php');
class Clase_Materias
{


    public function todos()
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT materias.Id_materia, materias.Nombre_materia, estudiantes.Nombre, materias.Calificacion, materias.Fecha_examen as Fecha_examen FROM `materias` INNER JOIN estudiantes on estudiantes.Id_estudiante = materias.Id_estudiante";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function uno($Id_materia)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT * FROM `materias` WHERE Id_materia = $Id_materia";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (\Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function insertar($Nombre_materia, $Id_estudiante, $Califcacion, $Fecha_examen)
    {

        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "INSERT INTO `materias`(`Nombre_materia`, `Id_estudiante`, `Califcacion`, `Fecha_examen`) VALUES ('$Nombre_materia','$Id_estudiante','$Califcacion','$Fecha_examen')";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (\Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function actualizar($Id_materia, $Id_estudiante, $Nombre_materia, $Califcacion, $Fecha_examen)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "UPDATE `materias` SET `Nombre_materia`='$Nombre_materia', `Id_estudiante`='$Id_estudiante',`Califacion`= '$Califcacion',`Fecha_examen`='$Fecha_examen' WHERE `Id_materia`='$Id_materia'";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (\Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($Id_materia)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "DELETE FROM `materias` WHERE Id_materia = $Id_materia";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (\Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
