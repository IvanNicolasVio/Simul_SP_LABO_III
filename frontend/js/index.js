import { ValidadorNumero,darDia,crearSpinner,borrarSpinner } from "./funciones.js";
import {TraerTabla,CrearUna,EditarPorId,EliminarPorId,EliminarTodo } from "./clases/ControllerCrypto.js";
const formulario = document.getElementById("tabla_carga");
const form_muestra = document.getElementById("form_muestra");
const checkbox_container = document.getElementById("checkbox-container");
const btnGuardar = document.getElementById("btn");
const btnModificar = document.getElementById("btnModificar");
const btnEliminar = document.getElementById("btnEliminar");
const btnCancelar = document.getElementById("btnCancelar");
const btnBorrar = document.getElementById("btnBorrar");
const nombreInput = document.getElementById("nombre");
const simboloInput = document.getElementById("simbolo");
const precioInput = document.getElementById("precio");
const tipoInput = document.getElementById("tipo");
const cantidadInput = document.getElementById("cantidad");
const algoritmoInput = document.getElementById("algoritmo");
const sitioInput = document.getElementById("sitio");
document.addEventListener("DOMContentLoaded", onInit);


function onInit() {
    rellenarSelectTipo();
    rellenarSelectAlg();
    crearTabla();
    completarPromedios();
    crearCrypto();
    modificar();
    eliminar();
    borrarTodo();
    cancelar();
}

function rellenarSelectTipo(){
    const tipoSelect = document.getElementById('tipo');
    const tipos = ["Proof of Work", "Proof of Stake"];
    tipos.forEach(function (tipo) {
      const option = document.createElement('option');
      option.value = tipo.toLowerCase();
      option.textContent = tipo;
      tipoSelect.appendChild(option);
    });
}

function rellenarSelectAlg(){
    const algoritmoSelect = document.getElementById('algoritmo');
    const tipos = ["SHA-256", "Ethash","Scrypt", "X11"];
    tipos.forEach(function (tipo) {
      const option = document.createElement('option');
      option.value = tipo.toLowerCase();
      option.textContent = tipo;
      algoritmoSelect.appendChild(option);
    });
}

function completarPromedios(){
    const select_promedio = document.getElementById("promedio");
    const resultado_promedio = document.getElementById("resultado");
    select_promedio.addEventListener("change", async (event) => {
        crearSpinner();
        const listaCrypto = await TraerTabla();
        if(select_promedio.value == "sin_filtro"){
            resultado_promedio.value = "N/A";
        }else if(listaCrypto.length === 0){
            resultado_promedio.value = "N/A";
        }else{
            if(select_promedio.value == "precioActual"){
                const sumPrecio = listaCrypto.reduce((acc, crypto) => acc + crypto.precioActual, 0);
                console.log(sumPrecio);
                resultado_promedio.value = sumPrecio / listaCrypto.length;
            }else if(select_promedio.value == "cantCirculacion"){
                const sumCantCirculacion = listaCrypto.reduce((acc, crypto) => acc + crypto.cantCirculacion, 0);
                console.log(sumCantCirculacion);
                resultado_promedio.value = sumCantCirculacion / listaCrypto.length;
            }
        }
        borrarSpinner();
    });
}

function alternarForm(listaCrypto) {
    var formMuestra = document.getElementById("form_muestra");
    if (listaCrypto.length > 0) {
        formMuestra.removeAttribute('hidden');
    } else {
        formMuestra.setAttribute('hidden', '');
    }
}

async function crearTabla() {
    const tablaHeaders = document.getElementById("tabla_headers");
    const tablaBody = document.getElementById("tabla_body");
    tablaBody.innerHTML = "";
    tablaHeaders.innerHTML = "";

    try {
        crearSpinner();
        const listaCrypto = await TraerTabla();
        alternarForm(listaCrypto);
        if (listaCrypto.length === 0) return;
        const keys = Object.keys(listaCrypto[0]);
        keys.forEach(key => {
            const th = document.createElement("th");
            th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            tablaHeaders.appendChild(th);
        });
        listaCrypto.forEach(crypto => {
            const fila = document.createElement("tr");
            keys.forEach(key => {
                const td = document.createElement("td");
                td.textContent = crypto[key];
                fila.appendChild(td);
            });
            tablaBody.appendChild(fila);
            fila.addEventListener("click", () => {
                cargarFormulario(crypto);
            });
        });
        keys.forEach((key, index) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `checkbox-${key}`;
            checkbox.checked = true;
            checkbox.addEventListener("change", () => ocultarColumna(index, checkbox.checked));
            const label = document.createElement("label");
            label.htmlFor = `checkbox-${key}`;
            label.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            const formGroup = document.createElement("div");
            formGroup.classList.add("form-group");
            formGroup.appendChild(checkbox);
            formGroup.appendChild(label);
            checkbox_container.appendChild(formGroup);
        });
    } catch (error) {
        console.error('Error al traer los datos de la tabla:', error);
    } finally {
        borrarSpinner();
    }
}
function ocultarColumna(index, show) {
    const rows = document.querySelectorAll("#tabla_crypto tr");
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        if (cells[index]) {
            cells[index].style.display = show ? "" : "none";
        }
    });
}

function crearCrypto(){
    btnGuardar.addEventListener("click", async (e) => {
        e.preventDefault();
        if (!nombreInput.value || !simboloInput.value || !tipoInput.value || !precioInput.value || !cantidadInput.value || !algoritmoInput.value || !sitioInput.value) {
            alert("Por favor complete todos los campos");
            return;
        }
        if(ValidadorNumero(precioInput.value) && ValidadorNumero(cantidadInput.value)){
            const nuevaCrypto = {id: "",
                nombre: nombreInput.value,
                simbolo: simboloInput.value,
               fechaCreacion: darDia(),
                precioActual: parseInt(precioInput.value),
                consenso: tipoInput.value,
                cantCirculacion: parseInt(cantidadInput.value),
                algoritmo: algoritmoInput.value,
                web: sitioInput.value};
                crearSpinner();
            try {
                const resultado = await CrearUna(nuevaCrypto);
                console.log('Criptomoneda añadida:', resultado);
                await crearTabla();
                formulario.reset();
                form_muestra.reset();
            } catch (error) {
                console.error('Error al añadir la criptomoneda:', error);
                alert('Hubo un error al añadir la criptomoneda.');
            } finally {
                borrarSpinner();
            }
        }else{
            alert("Por favor complete con numeros");
            return;
        }
        
    })
}

function modificar() {
    btnModificar.addEventListener("click", async (e) => {
        e.preventDefault();
        const idAModificar = document.getElementById("id").value;
        let nuevasPropiedades = {
            nombre: nombreInput.value,
            simbolo: simboloInput.value,
            consenso: tipoInput.value,
            precioActual: precioInput.value,
            cantCirculacion: cantidadInput.value,
            algoritmo: algoritmoInput.value,
            web: sitioInput.value
        };
        if (confirm("Confirma la modificacion")) {
            crearSpinner();
            try {
                const cryptoNueva = await EditarPorId(idAModificar, nuevasPropiedades);
                console.log('Criptomoneda actualizada:', cryptoNueva);
                await crearTabla();
                formulario.reset();
                form_muestra.reset();
                ocultarBtn(2);
            } catch (error) {
                console.error('Error al actualizar la criptomoneda:', error);
            } finally {
                borrarSpinner();
            }
        }
    });
}

function eliminar(){
    btnEliminar.addEventListener("click", async (e) => {
        e.preventDefault();
        const idABorrar = document.getElementById("id").value;
        if (confirm("Confirma la eliminacion?")) {
            crearSpinner();
            try {
                await EliminarPorId(idABorrar);
                await crearTabla();
                formulario.reset();
                form_muestra.reset();
                ocultarBtn(2);
            } catch (error) {
                console.error('Error al eliminar la criptomoneda:', error);
            } finally {
                borrarSpinner();
            }
        }
    })
}

function borrarTodo(){
    btnBorrar.addEventListener("click", async (e) => {
        e.preventDefault();
        if (confirm("Confirma la eliminacion?")) {
            crearSpinner();
            try {
                await EliminarTodo();
                await crearTabla();
                formulario.reset();
                form_muestra.reset();
                ocultarBtn(2);
            } catch (error) {
                console.error('Error al eliminar todo:', error);
            } finally {
                borrarSpinner();
            }
        }
    })
}

function cancelar(){
    btnCancelar.addEventListener("click", async (e) => {
        e.preventDefault();
        formulario.reset();
        form_muestra.reset();
        ocultarBtn(2); 
    })
}

function cargarFormulario(crypto) {
    document.getElementById("id").value = crypto['id'];
    document.getElementById("nombre").value = crypto['nombre'];
    document.getElementById("simbolo").value = crypto['simbolo'];
    document.getElementById("precio").value = crypto['precioActual'];
    document.getElementById("tipo").value = crypto['consenso'] || '';
    document.getElementById("cantidad").value = crypto['cantCirculacion'] || '';
    document.getElementById("algoritmo").value = crypto['algoritmo'] || '';
    document.getElementById("sitio").value = crypto['web'] || '';
    ocultarBtn(1);
}

function ocultarBtn(booleano){
    if(booleano == 1){
        btnGuardar.hidden = true;
        btnModificar.hidden = false;
        btnEliminar.hidden = false;
        btnCancelar.hidden = false;
    }if(booleano == 2){
        btnGuardar.hidden = false;
        btnEliminar.hidden = true;
        btnCancelar.hidden = true;
        btnModificar.hidden = true;
    }
}
