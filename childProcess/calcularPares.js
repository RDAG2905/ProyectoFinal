let lista = []

const procesar = (cantidad) => {
for (let index = 0; index < cantidad; index++) {
    let n = between(1,1000)
    lista.push(n)
}   
let set = new Set(lista) 
const arraySinRepetidos = Array.from(set)
const listaProcesada = []

arraySinRepetidos.forEach(element => {
   let total = acumularTotal(element)
   let par = {
       numero:element,
       cantidad:total
   }
   listaProcesada.push(par)
})
lista = []
return listaProcesada
}



const acumularTotal= (element)=>{
    let nuevaLista = []
    nuevaLista = lista.filter(x => x == element)  
    return nuevaLista.length   
}


const between = (min, max) =>{  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}


process.on('exit', () => {
    console.log(`worker #${process.pid} cerrado`)
})

process.on('message', msg => {
    let cantidad = parseInt(msg)
    if(!isNaN(cantidad)){
        console.log(`worker #${process.pid} iniciando su tarea`)
             
            const result = procesar(cantidad)
            console.log(result)
            process.send(result)       
    }   
    console.log(`worker #${process.pid} finalizó su trabajo`)
    process.exit()
})