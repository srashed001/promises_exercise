
const url = `http://deckofcardsapi.com/api/deck/`

// 1)

axios.get(`${url}/new/draw`)
    .then(resp => {
        let { suit, value } = resp.data.cards[0]
        console.log(`${value} of ${suit}`)
    })

// 2)

let cards = []

axios.get(`${url}/new/draw`)
    .then(resp => {
        cards.push(resp.data.cards[0])
        let deckId = resp.data.deck_id
        return axios.get(`${url}/${deckId}/draw`)
    })
    .then(resp => {
        cards.push(resp.data.cards[0])
        cards.forEach(card => {
            console.log(`${card.value} of ${card.suit}`)
        })
    })
    .catch(err => err)

//3 


let cardsDrawn;
let button = $('button')
let cardArea = $('.card-area')

axios.get(`${url}/new/draw/?count=52`)
.then(resp => cardsDrawn = resp.data.cards)

function generateCardMarkup(card){
    return `
    <img src="${card.image}" alt="" height="200px">
    `
}

function drawCard(){
    let cardIdx = parseInt(button.attr('id'))
    let card = cardsDrawn[cardIdx]
    let cardMarkUp = $(generateCardMarkup(card))
    cardArea.append(cardMarkUp)
    button.attr('id', `${cardIdx+1}`)
    if (button.attr('id') === 52){
        button.remove()
    }
}

button.click(drawCard)

