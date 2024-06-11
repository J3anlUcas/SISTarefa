exports.hom = (req, res) => {
    var date = new Date()
    var dia = date.getDate().toString().padStart(2, '0')
    var mes = (date.getMonth()+1).toString().padStart(2, '0')
    var ano = date.getFullYear()
    var hora = date.getHours().toString().padStart(2, '0')
    var minuto = date.getMinutes().toString().padStart(2, '0')
      
    res.render('index',({
        dia,
        mes,
        ano,
        hora,
        minuto
    }))
}