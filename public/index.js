

const login =()=>{
  let username = document.querySelector('#username').value
  let password = document.querySelector('#password').value
  fetch('/login', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password  
    })
  })
  .then(response => response.text()
    )
  .then(plantilla => document.querySelector('body').innerHTML = plantilla)
  .catch(error=>
    error)
}


const registrarse =()=>{
  let username = document.querySelector('#username').value
  let password = document.querySelector('#password').value
  fetch('/signup', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password  
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
    setTimeout(()=>{
      init()
    },2000) 
    document.querySelector('body').innerHTML = plantilla     
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
    { 
      document.querySelector('body').innerHTML = plantilla})
  .catch(error => alert(error))
}



const getRegisterView = ()=>{
  redireccionar('/registerView');
}


const getLoginView = ()=>{
  redireccionar('/');
}



function redireccionar(pagina) {
  location.href = pagina;
} 







  










 
