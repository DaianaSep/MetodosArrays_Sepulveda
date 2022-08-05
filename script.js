//Variables
let nombre, genero, peso, altura, edad, calculoImc, mensaje, rtaMenu, respuesta, calculoTmbH, calculoTmbM, seguirCarga, res, totalCalorias, caloriasDia = 0
const alimentos = []

//clases
class Alimentos {
    constructor(nombre, tipo, calorias, porcion) {
        this._nombre = nombre
        this._tipo = tipo
        this._calorias = calorias
        this._porcion = porcion
    }
}

//Funciones 

//función de ingreso de datos personales
function ingresoDatosPersonales() {
    do {
        nombre = prompt("Ingrese su nombre: ")
        genero = prompt("Ingrese su género (H o M): ").toLowerCase()
        edad = parseInt(prompt("Ingrese su edad en años: "))
        peso = parseFloat(prompt("Ingrese su peso en kilogramos: "))
        altura = parseInt(prompt("Ingrese su altura en centímetros: "))

       validacionDatos(genero, edad, peso, altura)

    } while (isNaN(peso) || peso <= 0 || isNaN(altura) || altura <= 0 || (genero != "h" && genero != "m" || isNaN(edad) || edad <= 0));
}

function validacionDatos(genero, edad, peso, altura){
    if (isNaN(peso) || peso <= 0) {
        mensaje = "Por favor ingrese un número válido en el peso \n"
    }
    else { mensaje = "" }

    if (isNaN(altura) || altura <= 0) {
        mensaje += "Por favor ingrese un número válido en la altura \n"
    }
    else { mensaje += "" }

    if (genero != "h" && genero != "m") {
        mensaje += "Por favor ingrese H o M en el género \n"
    }
    else { mensaje += "" }

    if (isNaN(edad) || edad <= 0) {
        mensaje += "Por favor ingrese un número válido en la edad \n"
    }
    else { mensaje += "" }

    if (mensaje != "") {
        alert(mensaje)
    }
}

//Función para capturar los datos y devolver resultado de IMC
function imc() {
    ingresoDatosPersonales()
    resultadoImc(genero, peso, altura)
}

// función que calcula el valor del IMC
const calcularIMC = (peso = 0, altura = 0) => (peso / Math.pow(altura / 100, 2))

//Función que devuelve la interpretación de IMC
function resultadoImc(genero, peso, altura) {
    switch (genero) {
        case "h":

            calculoImc = calcularIMC(peso, altura)
            interpretacionImcH(calculoImc, nombre)
            break
           
        case "m":

            calculoImc = calcularIMC(peso, altura)
            interpretacionImcM(nombre, calculoImc)
            break
    }
}

//Función de interpretación de IMC para hombres
function interpretacionImcH(calculoImc, nombre){
    if (calculoImc <= 20) {
        document.write(`Hola ${nombre}! Tu IMC es: ${calculoImc.toFixed(2)} - Interpretación: Bajo peso`)
    }
    else if (20 < calculoImc && calculoImc <= 25) {
        document.write(`Hola ${nombre}! Tu IMC es: ${calculoImc.toFixed(2)} - Interpretación: Peso normal`)
    }
    else if (25 < calculoImc && calculoImc <= 30) {
        document.write(`Hola ${nombre}! Tu IMC es: ${calculoImc.toFixed(2)} - Interpretación: Obesidad leve`)
    }
    else if (30 < calculoImc && calculoImc <= 40) {
        document.write(`Hola ${nombre}! Tu IMC es: ${calculoImc.toFixed(2)} - Interpretación: Obesidad severa`)
    }
    else if (40 < calculoImc) {
        document.write(`Hola ${nombre}! Tu IMC es: ${calculoImc.toFixed(2)} - Interpretación: Obesidad muy severa`)
    }
}

//Función de interpretación de IMC para mujeres
function interpretacionImcM(nombre, calculoImc){
    if (calculoImc <= 20) {
        document.write(`Hola ${nombre}! Tu IMC es: ${calculoImc.toFixed(2)} - Interpretación: Bajo peso`)
    }
    else if (20 < calculoImc && calculoImc <= 24) {
        document.write(`Hola ${nombre}! Tu IMC es: ${calculoImc.toFixed(2)} - Interpretación: Peso normal`)
    }
    else if (24 < calculoImc && calculoImc <= 29) {
        document.write(`Hola ${nombre}! Tu IMC es: ${calculoImc.toFixed(2)} - Interpretación: Obesidad leve`)
    }
    else if (29 < calculoImc && calculoImc <= 37) {
        document.write(`Hola ${nombre}! Tu IMC es: ${calculoImc.toFixed(2)} - Interpretación: Obesidad severa`)
    }
    else if (37 < calculoImc) {
        document.write(`Hola ${nombre}! Tu IMC es: ${calculoImc.toFixed(2)} - Interpretación: Obesidad muy severa`)
    }
}

//Función para capturar los datos y devolver resultado de TMB
function tmb() {
    ingresoDatosPersonales()
    resultadoTmb(genero, peso, edad, altura)
}

//Función que calcula y devuelve el resultado de la TMB
function resultadoTmb(genero = "", peso = 0, altura = 0, edad = 0) {

    if (genero == "h") {
        calculoTmbH = ((10 * peso) + (6.25 * altura) + (5 * edad) + 5)
        document.write(`Hola ${nombre}! El número de calorías que necesitas por día para estar saludable es: ${calculoTmbH.toFixed(0)} `)
    }
    else if (genero == "m") {
        calculoTmbM = ((10 * peso) + (6.25 * altura) + (5 * edad) - 161)
        document.write(`Hola ${nombre}! El número de calorías que necesitas por día para estar saludable es: ${calculoTmbM.toFixed(0)} `)
    }
}

//Función para cargar alimentos consumidos en el día 
function cargaAlimentos() {
    datosAlimentos()
    document.write("<h3> Ha ingresado los siguientes alimentos: </h3>")

alimentos.forEach(alim => {
    totalCalorias = sumaCalorias(alim._porcion, alim._calorias)
    document.write(`<b>Nombre:</b> ${alim._nombre} - <b> Grupo:</b> ${alim._tipo} -<b> Calorías cada 100g:</b> ${alim._calorias} - <b> Porción ingerida:</b> ${alim._porcion}g - <b> Total calorías: </b>${totalCalorias}
             <br>`)
    caloriasDia += totalCalorias
});
    document.write(`<h4> Total de calorías ingeridas en el día: <b> ${caloriasDia} </b> </h4>`)
    filtrarGrupo()
}

// función para ingresar los datos de los alimentos ingeridos en el día
function datosAlimentos() {
    do {
        const alimento = new Alimentos(prompt("Ingrese el nombre del alimento: "), prompt(`Ingrese a qué grupo de alimento pertenece: \n 1-Frutas y verduras \n 2-Proteínas y legumbres \n 3-Lácteos \n 4-Hidratos y cereales \n 5-Grasas y aceites\n 6-Dulces `), parseInt(prompt(`Ingrese las calorías cada 100 gramos: `)), parseInt(prompt(`Ingrese la porción ingerida en gramos: `)))
        alimentos.push(alimento)
        alimento._tipo = gruposAlimentos(alimento._tipo)
        alimento._calorias = validarNum(alimento._calorias)
        alimento._porcion  = validarNum(alimento._porcion)

        do {
            seguirCarga = prompt("Desea seguir cargando alimentos? Si/ No").toLocaleLowerCase()

            if (seguirCarga != "si" && seguirCarga != "no") {
                alert("Debe ingresar Si o No")
            }
        } while (seguirCarga != "si" && seguirCarga != "no")

    } while (seguirCarga == "si")
}

//Función para validar que se ingresen números o le asigne 0
function validarNum(ingreso){
    let valor
    if(isNaN(ingreso)){
        valor = 0
    }
    else{
        valor = ingreso
    }
    return valor
}

//funcion para determinar porcentaje del total de alimentos de cada grupo
function filtrarGrupo(){
    const cantElementos = alimentos.length

    const grupo1 = alimentos.filter(alim => alim._tipo == "Frutas y verduras")
    const grupo2 = alimentos.filter(alim => alim._tipo == "Proteínas y legumbres")
    const grupo3 = alimentos.filter(alim => alim._tipo == "Lácteos")
    const grupo4 = alimentos.filter(alim => alim._tipo == "Hidratos y cereales")
    const grupo5 = alimentos.filter(alim => alim._tipo == "Grasas y aceites")
    const grupo6 = alimentos.filter(alim => alim._tipo == "Dulces")
    const grupo7 = alimentos.filter(alim => alim._tipo == "Sin definir")

    const cantGrupo1 = acumularTipos(grupo1)
    const cantGrupo2 = acumularTipos(grupo2)
    const cantGrupo3 = acumularTipos(grupo3)
    const cantGrupo4 = acumularTipos(grupo4)
    const cantGrupo5 = acumularTipos(grupo5)
    const cantGrupo6 = acumularTipos(grupo6)
    const cantGrupo7 = acumularTipos(grupo7)

    let porcGrupo1 = calcularPorcentaje(cantGrupo1, cantElementos)
    let porcGrupo2 = calcularPorcentaje(cantGrupo2, cantElementos)
    let porcGrupo3 = calcularPorcentaje(cantGrupo3, cantElementos)
    let porcGrupo4 = calcularPorcentaje(cantGrupo4, cantElementos)
    let porcGrupo5 = calcularPorcentaje(cantGrupo5, cantElementos)
    let porcGrupo6 = calcularPorcentaje(cantGrupo6, cantElementos)
    let porcGrupo7 = calcularPorcentaje(cantGrupo7, cantElementos)

    document.write(`<h3>Porcentaje ingerido según cada grupo de alimentos:</h3>`)
    document.write(`Frutas y verduras: ${porcGrupo1.toFixed(2)}% <br> Proteínas y legumbres: ${porcGrupo2.toFixed(2)}% <br> Lácteos: ${porcGrupo3.toFixed(2)}% <br>
    Hidratos y cereales: ${porcGrupo4.toFixed(2)}% <br> Grasas y aceites: ${porcGrupo5.toFixed(2)}% <br> Dulces: ${porcGrupo6.toFixed(2)}% <br> Sin definir: ${porcGrupo7.toFixed(2)}% <br>`)
}

//función para acumular cuantos alimentos de cada grupo hay
function acumularTipos(grupo){
    let acumulador = 0
        for(i=0; i < grupo.length; i++){
            acumulador += 1
        }
    return acumulador
}

// función para calcular porcentaje según grupo de alimentos del día
function calcularPorcentaje(cantGrupo, totalAlimentos){
    let porcentaje = (cantGrupo/totalAlimentos)*100
    return porcentaje
}

// función para sumar las calorías totales por alimento según calorías cada 100g y porción en gramos
function sumaCalorias(porcion, calorias){
    let cantCaloriasPorcion = 100/porcion
    let cals = calorias/cantCaloriasPorcion
    return cals
}

// función para setearle el grupo al alimento
function gruposAlimentos(numTipo){
    let tipo
        if (numTipo == 1) {
            tipo = "Frutas y verduras"
        }
        else if (numTipo == 2) {
            tipo = "Proteínas y legumbres"
        }
        else if (numTipo == 3) {
            tipo = "Lácteos"
        }
        else if (numTipo == 4) {
            tipo = "Hidratos y cereales"
        }
        else if (numTipo == 5) {
            tipo = "Grasas y aceites"
        }
        else if (numTipo == 6) {
            tipo = "Dulces"
        }
        else {
            tipo = "Sin definir"
        }
   
    return tipo
}

//Menú 
do {
    rtaMenu = parseInt(prompt("Seleccione una opción del menú: \n 1- Calcular Índice de Masa Corporal \n 2- Calcular Tasa Metabólica Basal (Calorías necesarias por día)\n 3- Ingresar alimentos del día \n 0- Salir"))
    if (rtaMenu === 1) {
        imc()
        break
    }
    else if (rtaMenu === 2) {
        tmb()
        break
    }
    else if (rtaMenu === 3) {
        cargaAlimentos()
        break
    }
    else if (rtaMenu === 0) {
        alert("Gracias por tu visita!")
        break
    }
    else {
        alert("Por favor ingrese una opción válida")
    }
} while (rtaMenu !== 1 || rtaMenu !== 2 || rtaMenu !== 0)




