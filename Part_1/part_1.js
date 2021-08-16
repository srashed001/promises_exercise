
// 1)
const url = "http://numbersapi.com" ;
let favNum = 8;
let numData; 

axios.get(url + `/${favNum}?json`)
            .then(resp => {
                numData = resp.data
                })
            .catch(err => err);

// 2)
let favNums = [5,17, 27]
let numsData; 

axios.get(url + `/${favNums}?json`)
            .then(resp => {
                numsData = resp.data
                })
            .catch(err => err);


// 3)

let numOfFacts = 4
let factPromises = []
let factData = []
const container = $('.container')

for (let i = 1; i <= numOfFacts; i++){
    factPromises.push(
        axios.get(url + `/${favNum}?json`)
    );
}

Promise.all(factPromises)
    .then(facts => {
        for (res of facts){
            const dataMarkUp = $(`<p>${res.data.text}</p>`)
            container.append(dataMarkUp)
            factData.push(res)
        }
    })
    .catch(err => err)


