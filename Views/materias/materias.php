<?php require_once('../html/head2.php') ?>

<div class="row">

    <div class="col-lg-8 d-flex align-items-stretch">
        <div class="card w-100">
            <div class="card-body p-4">
                <h5 class="card-title fw-semibold mb-4">Lista de Materias</h5>

                <div class="table-responsive">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal_materias">
                        Agregar Asignatura
                    </button>
                    <table class="table text-nowrap mb-0 align-middle">
                        <thead class="text-dark fs-4">
                            <tr>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">#</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Materia</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Nombre de Alumno</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Calificacion</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Fecha de Examen</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Opciones</h6>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="tabla_materias">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="Modal_materias" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="post" id="frm_materias">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Materias o Asignaturas </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <input type="hidden" name="Id_materia" id="Id_materia">

                    <div class="form-group">
                        <label for="Nombre_materia">Materia</label>
                        <input type="text" requiered class="form-control" id="Nombre_materia" name="Nombre_materia" placeholder="Ingrese las materias">
                    </div>
                    <div class="form-group">
                        <label for="Id_estudiante"> Estudiante</label>
                        <select name="Id_estudiante" id="Id_estudiante" class="form-control">
                            <option value="0">Seleccione un Estudiante</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="Calificacion">Calificacion</label>
                        <input type="text"  oninput="soloNumeros(event);" requiered class="form-control" id="Calificacion" name="Calificacion" placeholder="Ingrese la calificacion">
</div>
                    <div class="form-group">
                        <label for="Fecha_examen">Fecha de Examen</label>
                        <input type="date" requiered class="form-control" id="Fecha_examen" name="Fecha_examen" placeholder="Ingrese la fecha de examen">




                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Grabar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php require_once('../html/script2.php') ?>
<script src="materias.js"></script>

<!--Solo numeros al ingresar la cedula-->
<script>
    function soloNumeros(event) {
        // Obtener el valor actual del campo
        var valorCampo = event.target.value;

        // Reemplazar cualquier carácter que no sea un número con una cadena vacía
        var nuevoValor = valorCampo.replace(/[^0-9]/g, '');

        // Actualizar el valor del campo con el nuevo valor
        event.target.value = nuevoValor;

        // Llamar a otras funciones, como algoritmo_cedula y cedula_repetida, si es necesario

    }
</script>
