var themeFlag = true
var coutriesArray;
var selectedID;
const worldFlagsContainer = document.querySelector('.worldFlags-container')
const mainBarWrapper = document.querySelector('.mainBar-wrapper')
const filterBarSelectItems = document.querySelectorAll('.filterBar-select-item')
const searchInput = document.querySelector('#searchInput')

const flagPosterWrapper = document.querySelector('.flagBar-flagPoster-wrapper')
const detailWrapper = document.querySelector('.detailWrapper')
const borderWrapper = document.querySelector('.borderWrapper')


filterBarSelectItems.forEach(item => {
    item.addEventListener('click', formSelectRegion)

})
async function loadHome() {
    fetchCountries()
}

async function fetchCountries() {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            coutriesArray = data
            showInDom(coutriesArray)
        })
        .catch(error => console.log(error))
}

function showInDom(coutriesArray) {
    worldFlagsContainer.innerHTML = ''
    coutriesArray.forEach(item => {
        worldFlagsContainer.insertAdjacentHTML('beforeend', `
        <div class="col">
            <div class="card h-100" >
            <img src=${item.flag} id=${item.numericCode} class="card-img-top" alt="flag" onclick="cardClickHandler(event)">
            <div class="card-body">
                <h5 class="card-title"> ${item.name}</h5>
                <p class="card-text">Population: ${item.population}</p>
                <p class="card-text">Region: ${item.region}</p>
                <p class="card-text">Capital: ${item.capital}</p>
            </div>
            </div>
        </div>
        `)
    })
}

function cardClickHandler(event) {
    selectedID = event.target.id
    console.log(selectedID);
    window.location.href = `http://127.0.0.1:5500/detail.html?${selectedID}`
}

function loadDetails() {
    let searchLocation = window.location.search
    let splitselectedID = searchLocation.split('?')
    selectedID = (splitselectedID[1]);
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            coutriesArray = data
            showDetailInDom(coutriesArray, selectedID)
        })
        .catch(error => console.log(error))
}

function showDetailInDom(coutriesArray, selectedID) {
    console.log(coutriesArray, selectedID);
    let selecteedCountry = coutriesArray.find(item => {
        return item.numericCode == selectedID
    })
    console.log(selecteedCountry.alpha3Code);
    console.log(selecteedCountry);
    let final
    let borderCountryArr = []
    if (selecteedCountry.borders) {
        selecteedCountry.borders.map(border => {
            final = coutriesArray.find(item => {
                return item.alpha3Code == border
            })
            borderCountryArr.push(final.name)
        })
        console.log(borderCountryArr);
        borderCountryArr.map(bordeCo => {
            borderWrapper.insertAdjacentHTML('beforeend', `
           <div class="col-2 countryBtn g-2" onclick="borderCountryBtnClick(event)">${bordeCo}</div>
            `)
        })
    }
    flagPosterWrapper.insertAdjacentHTML('beforeend', `
    <img src=${selecteedCountry.flag} class="flagBar-flagPoster" />
    `)

    detailWrapper.insertAdjacentHTML('beforeend', `
    <div class="maindetail col-md-6 col-12">
                <h3 class="maindetail-title">${selecteedCountry.name}</h3>
                <p class="maindetail-text">NativeName: ${selecteedCountry.nativeName}</p>
                <p class="maindetail-text">Population: ${selecteedCountry.population}</p>
                <p class="maindetail-text">Region: ${selecteedCountry.region}</p>
                <p class="maindetail-text">Subregion: ${selecteedCountry.subregion}</p>
                <p class="maindetail-text">capital: ${selecteedCountry.capital}</p>
            </div>
            <div class="moredetail col-md-6 col-12">
                <p class="maindetail-text">Top Level Domain: ${selecteedCountry.topLevelDomain[0]}</p>
                <p class="maindetail-text">Currency: ${selecteedCountry.currencies[0].name}</p>
                <p class="maindetail-text">Language: ${selecteedCountry.languages[0].name}</p>
            </div>
    `)
}

function gotoHome() {
    console.log('is running');
    window.location.href = "http://127.0.0.1:5500/home.html"
}

function searchCountry(event) {
    if (event.key === 'Enter') {
        let filteredCountryArr = coutriesArray.filter(item => {
            // return item.name.toLowerCase() == event.target.value.toLowerCase()
            return item.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        console.log(filteredCountryArr);
        showInDom(filteredCountryArr)
    }
}

function formSelectRegion(event) {
    let selectedCountries
    switch (event.target.value) {
        case '1':
            text = "1";
            selectedCountries = coutriesArray.filter(item => {
                return item.region == 'Africa'
            })
            break;
        case '2':
            text = "2";
            selectedCountries = coutriesArray.filter(item => {
                return item.region == 'Americas'
            })
            break;
        case '3':
            text = "3";
            selectedCountries = coutriesArray.filter(item => {
                return item.region == 'Asia'
            })
            break;
        case '4':
            text = "4";
            selectedCountries = coutriesArray.filter(item => {
                return item.region == 'Europe'
            })
            break;
        case '5':
            text = "5";
            selectedCountries = coutriesArray.filter(item => {
                return item.region == 'Oceania'
            })
            break;
        case 'Filter by Region':
            text = "Filter by Region";
            selectedCountries = coutriesArray
            break;
        default:
            text = "error in reading";
    }
    showInDom(selectedCountries)
    // console.log(selectedCountries);
    // console.log(event.target.value, text);
}
function filterCountryInDom(selectedCountries) {
    console.log(selectedCountries);
}

function borderCountryBtnClick(event) {
    console.log(event.target.innerHTML);
    let findedBorder = coutriesArray.find(item => {
        return item.name == event.target.innerHTML
    })
    console.log(findedBorder);
    window.location.href = `http://127.0.0.1:5500/detail.html?${findedBorder.numericCode}`
}

function changeTheme() {
    themeFlag = !themeFlag
    console.log('theme is changed to :', themeFlag);
    setColors(themeFlag)


}

function setColors(themeFlag) {
    console.log('will countinue...');
}