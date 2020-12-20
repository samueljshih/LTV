const input = document.querySelector('.submit-btn')
const email = document.querySelector('.email-input')
const searchSection = document.querySelector('.search')
const reverseEmailLookup = document.querySelector('.reverse-email-lookup')
const loading = document.querySelector('.loading')
const validationError = document.querySelector('.validation-error')
const resultsNode = document.querySelector('.results')
const noResultsNode = document.querySelector('.no-results')

let result;
let errorCount = 0;
let validationNode;

const submitForm = (e) => {
    e.preventDefault()

    if(!email.value) {
        if(errorCount === 0) {
            email.style.border = '3px solid red'
            
            validationNode = document.createElement('p')
            const validationTxt = document.createTextNode('Please add a valid email address')
            validationNode.style.color = 'white';
            validationNode.style.backgroundColor = 'red';
            validationNode.style.padding = '0 0 10px 0';
            validationNode.style.width= '25%'
            validationNode.appendChild(validationTxt)
            validationError.prepend(validationNode)
        }

        errorCount++;
        return
    } 

    if(errorCount > 0) {
        email.style.border = '1px solid #b0b0b0'
        validationNode.remove()
        errorCount = 0;
    }

    // Hide main search

    searchSection.style.display = 'none';
    reverseEmailLookup.style.display = 'none';
    noResultsNode.style.display = 'none';
    loading.style.display = 'block' 

    // Fetch Data
    const data = fetch('https://ltv-data-api.herokuapp.com/api/v1/records.json?email=doesmith@example.com', {mode: 'cors'}).then((data) => {
        return data.json()}).then((data) => {

        if(!Array.isArray(result)) {
            populateInfo(result)
        } else {
            const searchTitle = document.querySelector('.search-content-title')
            const searchLookupText = document.querySelector(".search-content-lookup-text")
            const startHere = document.querySelector('.start-here')
            
            searchTitle.innerHTML = `Can't find the right person?`
            searchLookupText.innerHTML = "Make a new search"
            startHere.innerHTML = 'Try Again'

            noResultsNode.style.display = 'block'
            searchSection.style.display = 'block'
        }
    })
    .catch((err) => {
    })

    // setTimeout(() => {
    //    loading.style.display = 'none' 
    //    result = {
    //     "email": "doesmith@example.com",
    //     "first_name": "Dow",
    //     "last_name": "Smith",
    //     "description": "Lorem Ipsum Dolor",
    //     "address": "123 Chocolate Ave",
    //     "phone_numbers": [
    //         "2125551234",
    //         "2125551235",
    //         "2125551236"
    //     ],
    //     "relatives": [
    //         "Jane Smith",
    //         "Jon Smith"
    //     ]
    // }
    // // result = []
    // console.log('result', result)
    // if(!Array.isArray(result)) {
    //     populateInfo(result)
    // } else {
    //     const searchTitle = document.querySelector('.search-content-title')
    //     const searchLookupText = document.querySelector(".search-content-lookup-text")
    //     const startHere = document.querySelector('.start-here')
        
    //     searchTitle.innerHTML = `Can't find the right person?`
    //     searchLookupText.innerHTML = "Make a new search"
    //     startHere.innerHTML = 'Try Again'

    //     noResultsNode.style.display = 'block'
    //     searchSection.style.display = 'block'
    // }

    // }, 2000)
}

const populateInfo = (result) => {
    
    // Short Circuit if no results
    if(Array.isArray(result)) {
        return 
    } 

    resultsNode.style.display = 'block';

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