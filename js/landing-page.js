const input = document.querySelector('.submit-btn')
const email = document.querySelector('.email-input')
const searchSection = document.querySelector('.search')
const reverseEmailLookup = document.querySelector('.reverse-email-lookup')
const loading = document.querySelector('.loading')
let result;

const submitForm = (e) => {
    e.preventDefault()

    searchSection.style.display = 'none';
    reverseEmailLookup.style.display = 'none';
    loading.style.display = 'block' 

    // Fetch Data
    // const data = fetch('https://ltv-data-api.herokuapp.com/api/v1/records.json?email=doesmith@example.com', {mode: 'cors'}).then((data) => {
    //     console.log('FETCHING')
    //     return data.json()}).then((data) => {
    //     console.log('DATA FROM FETCH', data)
    // }).catch((err) => {
    //     console.log('Error', err)
    // })

    setTimeout(() => {
       loading.style.display = 'none' 
       result = {
        "email": "doesmith@example.com",
        "first_name": "Dow",
        "last_name": "Smith",
        "description": "Lorem Ipsum Dolor",
        "address": "123 Chocolate Ave",
        "phone_numbers": [
            "2125551234",
            "2125551235",
            "2125551236"
        ],
        "relatives": [
            "Jane Smith",
            "Jon Smith"
        ]
    }

    populateInfo(result)
    }, 2000)
}

const populateInfo = (result) => {
    if(Array.isArray(result)) {
        // Nothing in Array
        return 
    }

    const { email, first_name, last_name, description, address, phone_numbers, relatives} = result;

    // Append result info the html
    const resultName = document.querySelector('.result-name')
    const resultDescription = document.querySelector('.result-description')
    const resultAddress = document.querySelector('.result-address')
    const resultPhoneNumbers= document.querySelector('.result-phone-numbers')
    const resultEmail = document.querySelector('.result-email')
    const resultRelatives = document.querySelector('.result-relatives')

    resultName.innerHTML = `${first_name} ${last_name}`
    resultDescription.innerHTML = description

    const addressNode = document.createElement('p')
    const addressTxt = document.createTextNode(address)
    addressNode.appendChild(addressTxt)
    resultAddress.appendChild(addressNode)

    const emailNode = document.createElement('p')
    const emailTxt = document.createTextNode(email)
    emailNode.appendChild(emailTxt)
    resultEmail.appendChild(emailNode)


    if(phone_numbers.length > 0 && Array.isArray(phone_numbers)) {
        phone_numbers.forEach((number) => {
            const numberNode = document.createElement('p')
            const numberTxt = document.createTextNode(number)
            numberNode.appendChild(numberTxt)
            resultPhoneNumbers.appendChild(numberNode)
        })
    }

    if(relatives.length > 0 && Array.isArray(relatives)) {
        relatives.forEach((relative) => {
            const relativeNode = document.createElement('p')
            const relativeTxt = document.createTextNode(relative)
            relativeNode.appendChild(relativeTxt)
            resultRelatives.appendChild(relativeNode)
        })
    }


}

input.addEventListener('click', submitForm)