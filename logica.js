var personajes;

var sustituido = true;

async function obtenerPersonajes() {
    await fetch('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/es_ES/champion.json')
        .then(response => response.json())
        .then(data => personajes = data.data);

console.log(personajes)
        
introducirEnElSelect();

}

function controlarSubmit(event) {

    event.preventDefault();

    var getInput = event.target.name.value;
    var nombre = event.target.name.value;

    nombre = getInput[0].toUpperCase() + getInput.slice(1);
    getInput = getInput[0].toUpperCase() + getInput.slice(1);//poner la primera letra en mayusculas

    Object.entries(personajes).map(psj => {

        console.log(psj[1].name);

        if (getInput == psj[1].name) {

            obtenerImagenAtras(nombre);
            obtenerImagen(getInput);
        
        }

    });

    
}

function obtenerImagen(nombrePersonaje,) {

    fetch(`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${nombrePersonaje}.png`)
        .then(response => response.blob())
        .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            crearDiv(imageObjectURL, nombrePersonaje);
        });

}

function obtenerImagenAtras(nombrePersonaje) {

    fetch(`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${nombrePersonaje}_0.jpg`)
        .then(response => response.blob())
        .then(imageBlob2 => {
            const imageObjectURL2 = URL.createObjectURL(imageBlob2);
            cartaAtras(imageObjectURL2);
        });
}

function borrar() {

    var divPsjs = document.querySelector("#personajes div");
    divPsjs.remove();

}

function resetPage() {

    var divPsjs = document.querySelector("#personajes div");

    if (divPsjs != null) {// si hay algo se sustituye

        divPsjs.remove();

    }

}


function crearDiv(imageObjectURL, nombrePersonaje) {//DOM

    resetPage();

    var divPersonajes = document.getElementById("personajes");//obteniendo el div del html donde pondremos el contenido.

    var divCaja = document.createElement("div");//creamos un div
    divCaja.classList.add("caja");             //Y le añadimos una clase


    var p = document.createElement("p");                 //creamos un <p></p> donde pondremos el titulo 
    var text = document.createTextNode(nombrePersonaje);//Obtenemos el texto del personaje
    p.classList.add("titulo");                         //Le añadimos una clase al titulo 

    p.appendChild(text);                              //le añadimos el texto al div
    divCaja.appendChild(p);                          //le añadimos un el parrafo al div

    divPersonajes.appendChild(divCaja);             //Y se lo añadimos 


    var img = document.createElement("img");     //creamos una etiqueta imagen <img></img>
    img.classList.add("imagen");                //le añadimos una clase.
    img.setAttribute("src", imageObjectURL);   //y la ruta de la imagen SRC

    divCaja.appendChild(img);                       //se lo añadimos a la caja

}
function resetPageAtras() {

    var divPsjs = document.querySelector(".imagen2");

    if (divPsjs != null) {// si hay algo se sustituye

        divPsjs.remove();

    }

}
function cartaAtras(imageObjectURL) {

    
    resetPageAtras();

    
    var divDetras = document.getElementById("atras");

    var div2 = document.createElement("div"); 
    div2.classList.add("divAtras");        
    divDetras.appendChild(div2);


    var img = document.createElement("img");     //creamos una etiqueta imagen <img></img>
    img.classList.add("imagen2");                //le añadimos una clase.
    img.setAttribute("src", imageObjectURL);   //y la ruta de la imagen SRC

    divDetras.appendChild(img);

}

function introducirEnElSelect() {

    //obtenemos el select vacio  

    var selectPsjs = document.querySelector("#selectPorNombre");

    console.log(personajes);
    Object.entries(personajes).map(psj => {//vamos rellenando el select creando options con todos los personajes 
        var option = document.createElement("option");
        option.setAttribute("id", psj[1].name);
        option.setAttribute("name", psj[1].name);
        option.setAttribute("value", psj[1].name);
        option.innerText = psj[1].name;
        selectPsjs.appendChild(option);// se rellena aquí 
    });
}


window.onload = obtenerPersonajes();