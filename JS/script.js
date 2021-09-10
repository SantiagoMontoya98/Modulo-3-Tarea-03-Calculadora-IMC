import {personas} from "../JSON/estadistica.js";

const d = document;

const $btnRegistro = d.getElementById("boton"),
  $btnCalculo = d.getElementById("boton-imc"),
  $formularioRegistro = d.getElementById("registro"),
  $validacionR = d.querySelector("#registro p"),
  $validacionC = d.querySelector("#calculadora #validacion"),
  $registroOK = d.getElementById("registro-ok"),
  $formularioIMC = d.getElementById("calculadora"),
  $resultado = d.getElementById("resultado"),
  $numeroIMC = d.getElementById("numero"),
  $categoria = d.getElementById("categoria"),
  $mujer = d.getElementById("mujer"),
  $hombre = d.getElementById("hombre"),
  $estadisticas = d.getElementById("estadisticas"),
  $imcMujeres = d.getElementById("IMC-mujeres"),
  $imcHombres = d.getElementById("IMC-hombres"),
  $categoriaMujeres = d.getElementById("categoria-mujeres"),
  $categoriaHombres = d.getElementById("categoria-hombres"),
  $categoriaIMC = d.getElementById("categoria-imc"),
  $btnRegresar = d.getElementById("regresar"),
  $divBr = d.getElementById("br"),
  ls = localStorage;

const usuario = {
  nombre : "",
  apellido : "",
  ciudad : "",
  direccion : "",
  telefono : "",
  correo : ""
}

let genero = "",
  edad = 0,
  peso = 0,
  estatura = 0,
  imc = 0,
  acumIMCMujeres = 0,
  acumIMCHombres = 0,
  contadorMujeres = 0,
  contadorHombres = 0,
  promIMCMujeres = 0,
  promIMCHombres = 0;

function errorRegistro(){
  $formularioRegistro.style.height = "700px";
  $validacionR.style.top = "650px";
  $validacionR.style.zIndex = "1";
  $validacionR.style.backgroundColor = "#e74c3ce6";
  $validacionR.style.color = "white";
}

function capturarDatosRegistro(){
  usuario.nombre = $formularioRegistro.nombre.value;
  usuario.apellido = $formularioRegistro.apellido.value;
  usuario.ciudad = $formularioRegistro.ciudad.value;
  usuario.direccion = $formularioRegistro.direccion.value;
  usuario.telefono = $formularioRegistro.telefono.value;
  usuario.correo = $formularioRegistro.correo.value; 
}

function validarDatosRegistro() {
  if(usuario.nombre === ""){
    $validacionR.textContent = "No ingresaste el nombre";
    errorRegistro();
  }else if(usuario.apellido === ""){
    $validacionR.textContent = "No ingresaste el apellido";
    errorRegistro();
  }else if(usuario.ciudad === ""){
    $validacionR.textContent = "No ingresaste la ciudad";
    errorRegistro();
  }else if(usuario.direccion === ""){
    $validacionR.textContent = "No ingresaste la direccion";
    errorRegistro();
  }else if(isNaN(usuario.telefono)){
    $validacionR.textContent = "El teléfono solo acepta números";
    errorRegistro();
  }else if(usuario.telefono === ""){
    $validacionR.textContent = "No ingresaste el teléfono";
    errorRegistro();
  }else if(usuario.correo === ""){
    $validacionR.textContent = "No ingresaste el correo electronico";
    errorRegistro();
  }else{    
    return true;
  }
}

function registrarUsuario(){
  capturarDatosRegistro();
  if(validarDatosRegistro() === true){
    ls.setItem("usuario",JSON.stringify(usuario));
    $formularioRegistro.style.display = "none";
    $registroOK.style.display = "block";
    $formularioIMC.style.display = "block";
  }  
}

function  verificarUsuario() {
  if(ls.getItem("usuario") != null){
    $formularioRegistro.style.display = "none";
    $registroOK.style.display = "none";
    $formularioIMC.style.display = "block";
    $formularioIMC.style.top = "100px";
  }
}

function errorCalcularIMC(){
  $validacionC.style.top = "510px";
  $validacionC.style.zIndex = "1";
  $validacionC.style.backgroundColor = "#e74c3ce6";
}

function capturarDatosIMC() {
  edad = $formularioIMC.edad.value ,
  peso = $formularioIMC.peso.value ,
  estatura = $formularioIMC.estatura.value;
}

function  validarDatosIMC() {
  if(genero === ""){
    $validacionC.textContent = "No seleccionaste el sexo";
    errorCalcularIMC();
  }else if(edad === ""){
    $validacionC.textContent = "No ingresaste la edad";
    errorCalcularIMC();
  }else if(isNaN(edad)){
    $validacionC.textContent = "La edad solo acepta números";
    errorCalcularIMC();
  }else if(peso === ""){
    $validacionC.textContent = "No ingresaste el peso";
    errorCalcularIMC();
  }else if(isNaN(peso)){
    $validacionC.textContent = "El peso solo acepta números";
    errorCalcularIMC();
  }else if(estatura === ""){
    $validacionC.textContent = "No ingresaste la estatura";
    errorCalcularIMC();
  }else if(isNaN(estatura)){
    $validacionC.textContent = "La estatura solo acepta números";
    errorCalcularIMC();
  }else{
    return true;
  }
}

function asignarCategoriaIMC() {
  if(imc < 18.5){
    $categoria.textContent = "Por debajo del peso";
  }    
  if(imc >= 18.5 && imc <= 24.99){
    $categoria.textContent = "Saludable";
  }
  if(imc >= 25 && imc <= 29.99){
    $categoria.textContent = "Con sobrepeso";
  }
  if(imc >= 30 && imc <= 39.99){
    if(genero === "femenino"){
      $categoria.textContent = "Obesa";
    }else{
      $categoria.textContent = "Obeso";
    }
  }
  if(imc >= 40){
    $categoria.textContent = "Obesidad de alto riesgo";
  }
}

function calcularIMC() {
  capturarDatosIMC();
  if(validarDatosIMC() === true){
    imc = (peso/Math.pow(estatura,2)).toFixed(2);
    asignarCategoriaIMC();
    return true;
  }
}

function mostrarResultadoIMC() {
  if(calcularIMC() === true){
    $formularioIMC.style.display = "none";
    $registroOK.style.display = "none";
    $numeroIMC.textContent = imc;
    $resultado.style.display = "block";
  }  
}

function calcularTotalPersonas() {
  personas.forEach(persona => {
  const {genero,imc} = persona;
  if(genero === "femenino") {
    acumIMCMujeres = acumIMCMujeres + imc;    
    contadorMujeres++;
  }
  if(genero === "masculino") {
    acumIMCHombres = acumIMCHombres + imc;    
    contadorHombres++;    
  }
})
}

function asignarCategoriaIMCHM(){
  if(promIMCMujeres < 18.5){
    $categoriaMujeres.textContent = "Por debajo del peso";    
  }    
  if(promIMCMujeres >= 18.5 && promIMCMujeres <= 24.99){
    $categoriaMujeres.textContent = "Saludables";
  }
  if(promIMCMujeres >= 25 && promIMCMujeres <= 29.99){
    $categoriaMujeres.textContent = "Con sobrepeso";
  }
  if(promIMCMujeres >= 30 && promIMCMujeres <= 39.99){
    $categoriaMujeres.textContent = "Obesas";
  }
  if(promIMCMujeres >= 40){
    $categoriaMujeres.textContent = "Obesidad de alto riesgo";         
  }
  if(promIMCHombres < 18.5){
    $categoriaHombres.textContent = "Por debajo del peso";    
  } 
  if(promIMCHombres >= 18.5 && promIMCHombres <= 24.99){
    $categoriaHombres.textContent = "Saludables";
  }
  if(promIMCHombres >= 25 && promIMCHombres <= 29.99){
    $categoriaHombres.textContent = "Con sobrepeso";
  }
  if(promIMCHombres >= 30 && promIMCHombres <= 39.99){
    $categoriaHombres.textContent = "Obesos";
  }
  if(promIMCHombres >= 40){
    $categoriaHombres.textContent = "Obesidad de alto riesgo";         
  }
}

function calcularPromedioIMC(){
  if(validarDatosIMC() === true){
    calcularTotalPersonas();  
    promIMCMujeres = (acumIMCMujeres/contadorMujeres).toFixed(2);
    promIMCHombres = (acumIMCHombres/contadorHombres).toFixed(2);
    $imcMujeres.textContent = promIMCMujeres;
    $imcHombres.textContent = promIMCHombres;
    asignarCategoriaIMCHM();
    return true;
  }  
}

function mostrarPromedioIMC() {
  if(calcularPromedioIMC() === true){
    $estadisticas.style.display = "block";
    $btnRegresar.style.display = "block";
    $divBr.style.display = "block";
  }
}

function mostrarCategoriaIMC(){
  if(validarDatosIMC() === true){
    $categoriaIMC.style.display = "block";
  }
}

function limpiarFormularioIMC() {
  genero = "";
  $mujer.style.color = "#bebebe"
  $hombre.style.color = "#bebebe"
  $formularioIMC.edad.value = "" ,
  $formularioIMC.peso.value = "",
  $formularioIMC.estatura.value = "";
  $validacionC.style.top = "460px";
  $validacionC.style.zIndex = "-1";
  $validacionC.style.backgroundColor = "white";
}

function regresar(){
  limpiarFormularioIMC();
  $resultado.style.display = "none";
  $estadisticas.style.display = "none";
  $categoriaIMC.style.display = "none";
  $btnRegresar.style.display = "none";
  $divBr.style.display = "none";  
  $formularioIMC.style.display = "block";
  $formularioIMC.style.top = "100px";
  $mujer.removeAttribute("style");
  $hombre.removeAttribute("style");
}

$mujer.onclick = () => {
  genero = "femenino";  
  $mujer.style.color = "var(--verde)";
  $hombre.style.color = "#bebebe";
  $hombre.removeAttribute("style");
}

$hombre.onclick = () => {
  genero = "masculino";  
  $hombre.style.color = "var(--verde)";
  $mujer.style.color = "#bebebe";
  $mujer.removeAttribute("style");
}

$btnRegistro.addEventListener("click",registrarUsuario);

$btnCalculo.onclick = () => {
  mostrarResultadoIMC();
  mostrarPromedioIMC();
  mostrarCategoriaIMC();
}

d.addEventListener("DOMContentLoaded",verificarUsuario);

$btnRegresar.addEventListener("click",regresar);