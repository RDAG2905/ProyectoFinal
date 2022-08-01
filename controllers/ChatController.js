


const getChatRoom = (req,res)=>{
    res.sendFile(global.root + '/public/salaDeChat.html')
 }



 module.exports = { getChatRoom }