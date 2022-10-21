class Cliente{
	constructor(usuario , monto , cuotas){
		this.usuario = usuario;
		this.monto = monto;
		this.cuotas = cuotas;
	}

	carrito(montoCarrito){
		this.montoCarrito=montoCarrito;
	}
}


let carrito =[];

/******************/



let boton_comprar=document.querySelectorAll(".aCompra");

for (let botones of boton_comprar){
	botones.addEventListener("click", agregar_compra);
	
}

console.log(boton_comprar)


function agregar_compra(e) {
	let boton = e.target;

	Toastify({

		text: "AGREGADO AL CARRITO",	
		duration: 1500,
		style:{
			fontFamily: 'Nunito',
			fontSize: "20px",
			background: "#eb6f8e",  
		}
		
	}).showToast();
}


function carro( producto ){
	let fila = document.createElement("tr");
	fila.innerHTML=`<td><img class="miniImgs" src="${producto.img}"></td>	
					<td>${producto.nombre}</td>
					<td>${producto.precio}</td>
					<td><button class="borrar">Borrar</buttton></td>`;

	let tabla = document.getElementById("tbody");
	tabla.append(fila);

	let boton_borrar=document.querySelectorAll(".borrar");

	for (let borra of boton_borrar) {
		borra.addEventListener("click", quitar_producto);
	}
}





function Envio(){
	const nom= document.getElementById("s").value;
	const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	const mail= document.getElementById("ss").value;
	const numRegex= /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
	const num= document.getElementById("sss").value;
	const loc= document.getElementById("ssss").value;
	const msj= document.getElementById("mensaje").value;
	
	
	const error= document.getElementById("error");
	let parrafo= "";
	let ban=0;
	if(nom=="" || mail=="" || num=="" || loc=="" || msj=="")
		{
			parrafo+='<br>Complete los campos vacios';
			error.innerHTML= parrafo;
		}
	else
		{
			if (!emailRegex.test(mail))
			{
				parrafo+='<br>El correo electronico no es valido';
				ban=1;
			}
			if(!numRegex.test(num))
			{
				parrafo+='<br>El numero de telefono no es valido';
				ban=1;
			}
			if(ban==0)
				parrafo+='<br>Envio del formulario exitoso';
			error.innerHTML= parrafo;
		}	

}



/*********CLIMA*********/
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

const apiKey = "83029bb2c22a40def612765e2b324b5c";

form.addEventListener("submit", e => {
  e.preventDefault();
  const listItems = list.querySelectorAll(".ajax-section .city");
  const inputVal = input.value;

  //ajax 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Por favor, volver a escribir tu ciudad";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});

