<?php require_once('../html/head2.php')?>

<div class="row">

    <div class="col-lg-8 d-flex align-items-stretch">
        <div class="card w-100">
            <div class="card-body p-4">
                <h5 class="card-title fw-semibold mb-4">Lista de Estudiantes</h5>

                <div class="table-responsive">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal_estudiantes">
                        Nuevo Alumno
                    </button>
                    <table class="table text-nowrap mb-0 align-middle">
                        <thead class="text-dark fs-4">
                            <tr>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">#</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Cedula</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Nombres</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Edad</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Carrera</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Proemdio</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Opciones</h6>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="tabla_estuadiantes">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="Modal_estudiantes" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="post" id="frm_estudiantes">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Estudiantes</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <input type="hidden" name="Id_estudiante" id="Id_estudiante">

                    <div class="form-group">
                        <label for="Cedula">Cedula del Estudiante</label>
                        <input type="text" oninput="soloNumeros(event);" required class="form-control" id="Cedula" name="Cedula" placeholder="Ingrese la cedula del Estudiante">
                    </div>
                  
                    <div class="form-group">
                        <label for="nombre">Nombre del Estudiante</label>
                        <input type="text" oninput="soloLetras(event);" required class="form-control" id="Nombre" name="Nombre" placeholder="Ingrese el nombre del Estudiante">
                    </div>

                    <div class="form-group">
                        <label for="Edad">Edad del Estudiante</label>
                        <input type="text"  oninput="soloNumeros(event);" required class="form-control" id="Edad" name="Edad" placeholder="Ingrese la Edad del Estudiante">
                    </div>

                    <div class="form-group">
                        <label for="Carrera">Carrera del Estudiante</label>
                        <input type="text"  oninput="soloLetras(event);"  required class="form-control" id="Carrera" name="Carrera" placeholder="Ingrese la Carrera del Estudiante">
                    </div>

                    <div class="form-group">
                        <label for="Promedio">Promedio del Estudiante</label>
                        <input type="text"  oninput="soloNumeros(event);" required class="form-control" id="Promedio" name="Promedio" placeholder="Ingrese el Promedio del Estudiante">
                    </div>
                
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

<script src="estudiantes.js"></script>
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
<!--Solo letras al ingresar los nombres y apellidos-->
<script>
    function soloLetras(event) {
        // Obtener el valor actual del campo
        var valorCampo = event.target.value;

        // Reemplazar cualquier carácter que no sea una letra con una cadena vacía
        var nuevoValor = valorCampo.replace(/[^a-zA-Z]/g, '');

        // Actualizar el valor del campo con el nuevo valor
        event.target.value = nuevoValor;
    }
</script>

