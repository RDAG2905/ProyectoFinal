

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
  let nombre = document.querySelector('#nombre').value
  let direccion = document.querySelector('#direccion').value
  let edad = document.querySelector('#edad').value
  let telefono = document.querySelector('#telefono').value
  let selection = document.getElementById("comboTipoUsuario");
  let tipoUsuario = selection.selectedOptions[0].value
  //console.log(`tipoUsuario: ${tipoUsuario}`)
  let foto = document.querySelector('#foto')
  let user = {
    username,
    password,
    nombre,
    direccion,
    edad,
    telefono,
    tipoUsuario
  }
  
 /* let formData = new FormData()
  formData.append('user',user)
  formData.append('foto',foto.files[0])
  let data = JSON.stringify(formData)
  console.log(data)*/

  fetch('/signup', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
      nombre : nombre,
      direccion : direccion,
      edad:edad,
      telefono:telefono  ,
      tipoUsuario:tipoUsuario   
    })
 // body: data
 //body: JSON.stringify(user)
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


///////////////////////////////////////////


function openTab(evt, name) {
 
  let i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

 
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  
  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";
}







  










 
