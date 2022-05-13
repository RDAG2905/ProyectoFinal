

const login =()=>{
  let nombre = document.querySelector('#nombre').value
  fetch('/login', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: nombre    
    })
  })
  .then(response => response.text()
    )
  .then(plantilla => document.querySelector('body').innerHTML = plantilla)
  .catch(error=>
    error)
}



const logout =()=>{
  
  fetch('/logout', {
    method: "get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => 
    response.text())
  .then(plantilla => {
    document.querySelector('body').innerHTML = plantilla  
    init()
  })
  .catch(error=>
    error)
}



const init = ()=>{
  fetch('/', {
    method: "get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.text())
  .then(plantilla => 
    { setTimeout(()=>{},40000) 
      document.querySelector('body').innerHTML = plantilla})
  .catch(error => alert(error))
}




  










 
