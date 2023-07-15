let quiz = {
    1: ['Qual é a cor das flores da cerejeira?', ['Branca', 'Rosa', 'Vermelha']],
    2: ['Qual é o nome científico da cerejeira?', ['Prunus cerasifera', 'Prunus persica', 'Prunus serrulata']],
    3: ['De onde a cerejeira é originária?', ['Japão', 'China','Coreia']],
    4: ['Quais são os principais produtos derivados da cerejeira?', ['Frutas e madeira', 'Flores e folhas', 'Raízes e sementes']],
    5: ['Qual é o período do ano em que as cerejeiras florescem?', ['Primavera', 'Verão', 'Outono']],
    6: ['Qual é o nome dado ao fenômeno em que as flores da cerejeira caem no chão?', ['Hanami', 'Sakura', 'Yamazakura']],
    7: ['Qual é o significado cultural da cerejeira no Japão?', ['Pureza e beleza', 'Força e coragem', 'Sabedoria e conhecimento']],
    8: ['Qual é o nome do famoso festival de cerejeiras em Washington, D.C.?', ['Festival das Cerejeiras em Flor', 'Festival da Primavera', 'Festival das Flores']],
    9: ['Qual é o nome da técnica de cultivo de cerejeiras em que as árvores são podadas para formar uma cúpula?', ['Niwaki', 'Bonsai', 'Ikebana']],
    10: ['Qual é o nome dado às cerejas japonesas usadas em sobremesas e bebidas?', ['Maraschino', 'Amarena', 'Sakuranbo']],
    11: ['Quantos dias, em média, as flores de sakura permanecem desabrochadas?', ['1-2 semanas', '1-2 dias', '1-2 meses']],
    12: ['A sakura é uma árvore:', ['Caducifólia', 'Perene', 'Sempre-verde']],
    13: ['A sakura é uma árvore resistente ao frio?', ['Sim', 'Não', 'Depende da variedade']],
    14: ['As flores de sakura são conhecidas por desabrocharem de forma:', ['Depende da variedade', 'Rápida', 'Lenta']],
    15: ['As flores de sakura têm um aroma:', ['Forte', 'Suave', 'Sem cheiro']],
    16: ['A sakura é uma árvore:', ['Ornamental', 'Frutífera', 'Medicinal']],
    17: ['A sakura é comumente usada para fazer qual tipo de arte no Japão?', ['Haiku', 'Origami', 'Ikebana']],
    18: ['A sakura é associada a qual festival tradicional japonês?', ['Hanami', 'Matsuri', 'Obon']],
    19: ['Quantas pétalas normalmente têm as flores de sakura?', ['5', '4', 'Varia']],
    20: ['As flores de sakura são comestíveis?', ['Sim', 'Não', 'Depende da variedade']]
}
let begin = 0, indexQ = []
let content = document.querySelector("#wrapper")
let players = {
    nome: ['', ''],
    points: [0, 0]
}

function endgame(){
    begin = 0, indexQ = []

    content.innerHTML = `<span id="name">${players['nome'][0]}</span>
    <p id="points">${5 * players['points'][0]}% de acerto</p>`

    if (players['nome'][1] != '')
        if (players['nome'][1] == players['nome'][0])
            if (players['points'][1] == players['points'][0])
                content.innerHTML += `<span id="befplay">Você tirou a mesma porcentagem no seu último jogo</span><p>${5 * players['points'][1]}% de acerto</p>`
            else
                players['points'][1] > players['points'][0] ? content.innerHTML += `<span id="befplay">Você diminuiu seus acertos</span><p>${5 * players['points'][1]}% de acerto na última jogada</p>` : content.innerHTML += `<span id="befplay">Você aumentou seus acertos</span><p>${5 * players['points'][1]}% de acerto na última jogada</p>`
        else
            content.innerHTML += `<span id="befplay">Último jogador: ${players['nome'][1]}</span><p>${5 * players['points'][1]}% de acerto</p>`

    content.innerHTML += `<input id="username" type="text" placeholder="Nome" maxlength="15" autocomplete="off">
    <span id="error-name"></span>
    <button class="btn play" type="button" onclick="play()"><img src="assets/icons/play-solid.svg" alt="icone de play"></button>`

    players['nome'][1] = players['nome'][0]
    players['points'][1] = players['points'][0]

}

function point(){
    document.querySelectorAll('.right').forEach(answer => {
        if (answer.checked) players['points'][0]++
    })
}

function show(){
    content.innerHTML = ''

    for (j=begin; j<(begin+5); j++){
        let i = 0, answers = []
        do{
            i = Math.floor(Math.random() * 20) + 1
        } while(indexQ.includes(i))
        indexQ.push(i)
    
        let div = `<span class="questions" id="question${quiz[i][0]}">${quiz[i][0]}</span>`
        quiz[i][1].forEach((answer, i) => {
            if (i==0)
                answers.push(`<div class="answer"><input class="answer-input right" type="radio" id="a${i}${j}" name="${j}"><label for="a${i}${j}">${answer}</label></div>`)
            else 
                Math.floor(Math.random() * 5)%2 == 0 ? answers.push(`<div class="answer"><input class="answer-input" type="radio" id="a${i}${j}" name="${j}"><label for="a${i}${j}">${answer}</label></div>`) : answers.unshift(`<div class="answer"><input class="answer-input" type="radio" id="a${i}${j}" name="${j}"><label for="a${i}${j}">${answer}</label></div>`)
        })
    
        answers.forEach(answer => div += answer)
        content.innerHTML += div
    }
    begin == 15 ? content.innerHTML += `<button class="next" type="button" onclick="endgame()"><img src="assets/icons/play-solid.svg" alt="proximo"></button>` :  content.innerHTML += `<button class="next" type="button" onclick="next()"><img src="assets/icons/play-solid.svg" alt="proximo"></button>`
    begin += 5
}

function next(){
    point()
    show()
}

function play(){
    let name = document.querySelector('#username').value
    if (name.length >= 3){
        players['nome'][0] = name
        players['points'][0] = 0
        show()
    }
    else
        document.querySelector("#error-name").innerText = "Min. de caracteres: 3"
}
