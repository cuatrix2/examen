<?php
require_once('cls_conexion.model.php');
class Clase_Estudiantes
{

    public function todos()
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT * FROM `estudiantes`";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function uno($Id_estudiante)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT * FROM `estudiantes` WHERE `Id_estudiante` = $Id_estudiante";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (\Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function insertar($Cedula, $Nombre, $Edad, $Carrera, $Promedio)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "INSERT INTO `estudiantes`(`Cedula`, `Nombre`, `Edad`, `Carrera`, `Promedio`) VALUES ('$Cedula','$Nombre','$Edad','$Carrera','$Promedio')";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (\Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function actualizar($Id_estudiante, $Cedula, $Nombre, $Edad, $Carrera, $Promedio)
    {

        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "UPDATE `estudiantes` SET `Cedula`='$Cedula',`Nombre`='$Nombre',`Edad`='$Edad',`Carrera`='$Carrera',`Promedio`='$Promedio' WHERE `Id_estudiante`='$Id_estudiante'";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (\Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($Id_estudiante)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "delete from estudiantes where Id_estudiante=$Id_estudiante";
            $result = mysqli_query($con, $cadena);
            return "ok";
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function cedula_repetida($Cedula)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT count(*) as cedula_repetida FROM `estudiantes` WHERE `Cedula`= '$Cedula'";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
