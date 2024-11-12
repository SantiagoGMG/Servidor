const body = document.querySelector('body')
let data
let modalCrear
let modalEditar
let modalBorrar

function init ()
{

  let storedData = localStorage.getItem('persona')
  if (storedData)
    data = JSON.parse(storedData)
  else
    data = []

    modalCrear = new bootstrap.Modal(document.getElementById('modal-crear'))
    modalEditar = new bootstrap.Modal(document.getElementById('modal-editar'))
    modalBorrar = new bootstrap.Modal(document.getElementById('modal-eliminar'))
    mostrarDatos()
    Eventos()
}
// Manejador de Eventos para los botones
function Eventos()
{
    // agregar persona mediante un modal
    let abrir_modal = document.getElementById('boton_agregar')
    abrir_modal.addEventListener('click', ModalCrearPersona)
    //confirmar al crear una persona
    let guardar = document.getElementById('crear_persona')
    guardar.addEventListener('click',agregarPersona)
    // modal para editar una persona
    let editar = document.getElementsByClassName('btn btn-warning')
    //modal para eliminar una persona
    let borrar = document.getElementsByClassName('btn btn-danger')
    for (let i = 0; i < editar.length; i++) {
        editar[i].addEventListener('click', function() {
            ModalEditarPersona(editar[i].id)
        });

        borrar[i].addEventListener('click', function (){
            modalBorrarPersona(borrar[i].id)
        });
    }


}

function ModalCrearPersona()
{
    modalCrear.show()
}
//Modal que permite editar una persona
function ModalEditarPersona(id)
{
    modalEditar.show()
    let nombre , apellido

    for(i = 0; i < data.length; i++)
    {
        if (data[i].id == id)
        {
            nombre = data[i].nombre
            apellido = data[i].apellido
        }
    }
    document.getElementById('nombre-editable').value = nombre
    document.getElementById('apellido-editable').value = apellido

    // Se crea El manejadro de eventos de para confirmar la edicion de datos

    let guardarEditable = document.getElementById('editar_persona')
    //clona el boton tal y como esta programado (atributos y contenido) pero sin eventos
    //esto es util para que no tenga eventos duplicados o erroneos
    guardarEditable.replaceWith(guardarEditable.cloneNode(true)); 
    // actualizamos la referencia para que apunte a este boton clonado
    // confirmar al editar una persona
    guardarEditable = document.getElementById('editar_persona')
    guardarEditable.addEventListener('click', function(){
            actualizarPersona(id)
    } )

}
//metodo para visualizar el modal para borrar
function modalBorrarPersona(id)
{
    modalBorrar.show()
    let indice  = -1
    for(i = 0; i < data.length; i++)
    {
        if (data[i].id == id)
        {
            indice = i
            break
        }
    }

    if (indice === -1) {
        console.log('No se encontró una persona con ese ID');
        return;
    }
        
    // Manejador de eventos confirmar al borrar una persona
    let borrarDefinitivamente = document.getElementById('borrar-definitivamente')

    //clona el boton tal y como esta programado (atributos y contenido) pero sin eventos
    //esto es util para que no tenga eventos duplicados o erroneos
    borrarDefinitivamente.replaceWith(borrarDefinitivamente.cloneNode(true)); 
    // actualizamos la referencia para que apunte a este boton clonado
    borrarDefinitivamente = document.getElementById('borrar-definitivamente');
    borrarDefinitivamente.addEventListener('click', function(){
           borrarPersona(indice)
    } )
}
// borra la persona
function borrarPersona(indice) {
    console.log('Se borró la persona: ' + JSON.stringify(data[indice]));
    data.splice(indice, 1); // Eliminar la persona específica
    localStorage.setItem('persona', JSON.stringify(data)); // Actualizar el localStorage
    mostrarDatos();
    modalBorrar.hide();
}
// Actualiza la persona por medio del id
function actualizarPersona(id)
{
    for(i = 0; i < data.length; i++)
        {
            if (data[i].id == id)
            {
                console.log(data[i])
                data[i].nombre = document.getElementById('nombre-editable').value
                data[i].apellido = document.getElementById('apellido-editable').value
                localStorage.setItem('persona',JSON.stringify(data))
                console.log('se actualizo los datos' + localStorage.getItem('persona'))
                mostrarDatos()
                modalEditar.hide()
                break
            }
        }
    
    

}
//Metodo que retorna el maximo id
function getID() {
    let storedData = localStorage.getItem('persona');
    if (storedData) {
        let data = JSON.parse(storedData);
        
        // Verificar si data tiene al menos un elemento
        if (data.length > 0) {
            let idMAX = data[data.length - 1].id;
            return idMAX + 1;
        } else {
            return 1;
        }
    } else {
        return 1;
    }
}
// metodo para agreagar persona
function agregarPersona()
{
    let nombre = document.getElementById('nombre').value
    let apellido = document.getElementById('apellido').value

    let persona = {
        nombre: nombre,
        apellido: apellido,
        id: getID(),
    };
    data.push(persona)
    localStorage.setItem('persona',JSON.stringify(data))
    console.log('persona agreagada: '+ persona)
    console.log('tu local storage esta compuesto por: '+ localStorage.getItem('persona'))
    
    mostrarDatos()
    modalCrear.hide()

    document.getElementById('nombre').value = ''
    document.getElementById('apellido').value = ''

}
// muestra los datos del LocalStorage en tablas
function mostrarDatos()
{
    let tbody = document.getElementById('cuerpo')

    while(tbody.firstChild)
    {
        tbody.removeChild(tbody.firstChild)
    }

    if(data.length != 0)
    {
        for(i = 0; i < data.length; i ++)
        {
            let row = document.createElement('tr')
            

            let fila_nom = document.createElement('td')
            fila_nom.innerText = data[i].nombre
            let fila_ape = document.createElement('td')
            fila_ape.innerText = data[i].apellido
            
            let fila_acciones = document.createElement('td')
            //botones
            let boton_editar = document.createElement('button')
            boton_editar.classList.add('btn', 'btn-warning')
            boton_editar.innerText = 'Editar'
            boton_editar.id = data[i].id

            let boton_eliminar = document.createElement('button')
            boton_eliminar.innerText = 'Borrar'
            boton_eliminar.classList.add('btn','btn-danger')
            boton_eliminar.id = data[i].id

            fila_acciones.appendChild(boton_editar)
            fila_acciones.appendChild(boton_eliminar)

            row.appendChild(fila_nom)
            row.appendChild(fila_ape)
            row.appendChild(fila_acciones)

            tbody.appendChild(row)

        }
    }
    Eventos()
}

//Inicializa los todo
window.addEventListener('load',init)
