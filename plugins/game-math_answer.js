let handler = m => m
handler.before = async function (m) {
    if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/^į³āāŖ CUANTO ES/i.test(m.quoted.text)) return !0
    this.math = this.math ? this.math : {}
    if (!(id in this.math)) return conn.sendButton(m.chat, 'El Juego termino š', igtb, null, [['Mates', '/mates']], m)
    if (m.quoted.id == this.math[id][0].id) {
        let math = JSON.parse(JSON.stringify(this.math[id][1]))
        if (m.text == math.result) {
            global.db.data.users[m.sender].exp += math.bonus
            clearTimeout(this.math[id][3])
            delete this.math[id]
            m.reply(`š Correcto š\n\nš Ganaste : +${math.bonus} šŖ`)
        } else {
            if (--this.math[id][2] == 0) {
                clearTimeout(this.math[id][3])
                delete this.math[id]
                m.reply(`š¤ Se terminaron las oportunidades š­\n\n Respuesta šš» ${math.result}`)
      } else m.reply(`šµ Respuesta Incorrecto š¤ \n\nTodavia hay  ${this.math[id][2]} oportunidades`)
        }
    }
    return !0
}

export default handler
