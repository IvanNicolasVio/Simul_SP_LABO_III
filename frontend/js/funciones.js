export function crearSpinner() {
  const contenedor = document.getElementById("spinner");
  if (!contenedor.querySelector("img")) {
      const spinner = document.createElement("img");
      spinner.setAttribute("src", "./assets/spinner.gif");
      spinner.setAttribute("alt", "imagen spinner");
      spinner.setAttribute("height", "64px");
      spinner.setAttribute("width", "64px");
      contenedor.appendChild(spinner);
  }
  document.getElementById('spinner-container').classList.remove('hidden');
}

export function borrarSpinner() {
  const contenedor = document.getElementById("spinner");
  if (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
  }
  document.getElementById('spinner-container').classList.add('hidden');
}

export function darDia(){
  const timeZone = 'America/Argentina/Buenos_Aires';
  const nowInBuenosAires = new Date().toLocaleString('en-US', { timeZone: timeZone });
  const dateInBuenosAires = new Date(nowInBuenosAires);
  const day = String(dateInBuenosAires.getDate()).padStart(2, '0');
  const month = String(dateInBuenosAires.getMonth() + 1).padStart(2, '0'); 
  const year = dateInBuenosAires.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

export function ValidadorNumero(numero) {
  const number = Number(numero);
  return Number.isInteger(number) && numero.trim() !== '';
}

