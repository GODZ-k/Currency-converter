const api = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"


let dropdown = document.querySelectorAll(".select-container select")
let btn = document.querySelector("form button")
let fromcurr = document.querySelector(".from select")
let tocurr = document.querySelector(".to select")
let msg = document.querySelector(".msg")

for (let select of dropdown) {
    for (let curcode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerHTML = curcode
        newOption.value = curcode
        if (select.name === "from" && curcode === "USD") {
            newOption.selected = "selected"
        } else if (select.name === "to" && curcode === "INR") {
            newOption.selected = "selected"

        }
        select.appendChild(newOption)
    }

    select.addEventListener("change", (e) => {
        upadteFlag(e.target)
    })

}

window.addEventListener("load", () => {
    ExchangeRate()
})


const upadteFlag = (evt) => {
    let curCode = countryList[evt.value]
        // console.log(curName)
    let Newsrc = `https://flagsapi.com/${curCode}/flat/64.png`
    let img = evt.parentElement.querySelector("img")
    img.src = Newsrc
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault()
    ExchangeRate()

})


const ExchangeRate = async() => {
        let amount = document.querySelector(".amount input")
        let amountValue = amount.value
        if (amountValue === "" || amountValue < 1) {
            amount.value = "1"
            amountValue = 1
        }
        // console.log(fromcurr.value.toLowerCase(), tocurr.value.toLowerCase())
        let Baseurl = `${api}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`
            // console.log(Baseurl)

        const promise = await fetch(Baseurl)
        const response = await promise.json()
        let rate = response[tocurr.value.toLowerCase()]
            // console.log(rate)
        let finalAmount = rate * amountValue
        console.log(finalAmount)

        msg.innerText = `${amountValue} ${fromcurr.value} =  ${finalAmount} ${tocurr.value}`
    }
    // const response = async(Baseurl) => {
    //     let promise = await fetch(Baseurl)
    //     console.log(promise)

//     let data = await promise.json()
//     console.log(data)
// }