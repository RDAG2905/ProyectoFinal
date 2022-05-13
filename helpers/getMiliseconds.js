
const getMiliseconds = ()=>{
    let horario = new Date()
    let horarioActual = horario.getTime() 
    return new Date(horarioActual)
}

module.exports = getMiliseconds