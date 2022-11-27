const body = document.querySelector('body');
const input = document.querySelector('#input');
const btnFilter = document.querySelector('#filterByRegion');
const btnTheme = document.querySelector('.theme--mode');
const btnBack = document.querySelector('.back')
const btnBC = document.querySelector('.bordercoutries--larger');
const bannerFilter = document.querySelector('#region');
const moon = document.querySelector('.theme #moon');
const sun = document.querySelector('.theme #sun');
const modelCB = document.querySelector('.modelCountryBox');
const areaCountry = document.querySelector('.areaCountry');
const countryDetails = document.querySelector('.countryDetails');
const containerMain = document.querySelector('.container--main');
const regionOptions = bannerFilter.querySelectorAll('span');

let light = true;
let filter = true;
let nameCountry = '';
let model = '';


// Events ---------------------------------

btnTheme.addEventListener('click', (e) => {
    if(light){
        e.target.innerHTML = 'Light Mode'
        moon.style.display = 'none'
        sun.style.display = 'block'
        body.classList.toggle('dark');
        light = false;
    } else {
        e.target.innerHTML = 'Dark Mode'
        moon.style.display = 'block'
        sun.style.display = 'none'
        body.classList.toggle('dark');
        light = true;
    }
})


btnFilter.addEventListener('click', (e) => {
    e.preventDefault();
    if(filter){
       bannerFilter.style.display = 'flex'
       document.querySelector('#arrowIcon').style.rotate = '0deg'
       filter = false;
    } else {
        bannerFilter.style.display = 'none'
        document.querySelector('#arrowIcon').style.rotate = '-90deg'
        filter = true;
    }
});

input.addEventListener('input', (e) => {
    const {value} = e.target;
    const countryName = document.querySelectorAll('.name');

    countryName.forEach((item) => {
        if (item.innerText.toLowerCase().includes(value.toLowerCase())) {
			item.parentElement.parentElement.style.display = 'flex';
		} else {
			item.parentElement.parentElement.style.display = 'none';
		}
    })
})

regionOptions.forEach((filter) => {
	filter.addEventListener('click', () => {
		const value = filter.innerText;
		const countryRegion = document.querySelectorAll('.regionInfo');

		countryRegion.forEach((region) => {
			if (region.innerText.includes(value) || value === 'All') {
		
				region.parentElement.parentElement.style.display = 'flex';
			} else {
				region.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});






// Functions ---------------------------------

let showAll = async() =>{
    let results = await fetch(`https://restcountries.com/v3.1/all`);
    let json = await results.json();

    json.map((country) => {
        model = modelCB.cloneNode(true);      

        showInfo({
            flag: country.flags.svg,
            name: country.name.common,
            population: country.population,
            region: country.region,
            capital: country.capital                 
            })           
      

        model.addEventListener('click', (e) => {
            e.preventDefault();
            let borderCountries = country.borders;
            let codCurrencies = country.currencies;
            let codLanguage = country.languages;
            
            containerMain.style.display = 'none';
            countryDetails.style.display = 'block';

            document.querySelector('.flag--larger img').setAttribute('src', country.flags.svg);
            document.querySelector('.name--larger').innerHTML = country.name.common;
            document.querySelector('.nativeName--larger').innerHTML = `<strong>Native Name:</strong> ${country.name.common}`;
            document.querySelector('.population--larger').innerHTML = `<strong>Population:</strong> ${country.population.toLocaleString()}`;
            document.querySelector('.regionInfo--larger').innerHTML = `<strong>Region:</strong> ${country.region}`;
            document.querySelector('.subregion--larger').innerHTML = `<strong>Sub Region:</strong> ${country.subregion}`;
            document.querySelector('.capital--larger').innerHTML = `<strong>Capital:</strong> ${country.capital}`;
            document.querySelector('.tld--larger').innerHTML = `<strong>Top Level Domain:</strong> ${country.tld}`;        
            document.querySelector('.currency--larger').innerHTML = `<strong>Currencies:</strong> ${Object.values(codCurrencies)[0].name}`;
            document.querySelector('.language--larger').innerHTML = `<strong>Languages:</strong> ${Object.values(codLanguage).join(', ')}`;
            
            if(borderCountries != undefined){
                btnBC.innerHTML = `<strong>Border Countries:</strong>`
                borderCountries.forEach((cB) => {
                    btnBC.innerHTML += `<div class="boxbc">${cB}</div>`
            })
            } else {
                btnBC.innerHTML = `<strong>Border Countries:</strong><div>&nbsp No borders Country!</div>` 
            }
            
           
            btnBack.addEventListener('click', (e) => {
                e.preventDefault();

                containerMain.style.display = 'block';
                countryDetails.style.display = 'none';
                
            })
        })
    })
}

function showInfo(country){
    model.setAttribute('data-key', country.name);
    model.querySelector('.flag img').setAttribute('src', country.flag);
    model.querySelector('.info .name').innerHTML = country.name;
    model.querySelector('.info .population').innerHTML = `<strong>Population:</strong> ${country.population.toLocaleString()}`;
    model.querySelector('.info .regionInfo').innerHTML = `<strong>Region:</strong> ${country.region}`;
    model.querySelector('.info .capital').innerHTML = `<strong>Capital:</strong> ${country.capital}`;
    
    areaCountry.append(model);
}

showAll();


