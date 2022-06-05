const initialState = {
    allCountries: [],
    countries: [],
    byContinentCountries: [],
    countryDetail: {},
    activities: [],
}

function reducer(state= initialState, action){
    switch(action.type){
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case 'GET_COUNTRY_BY_NAME':
            return{
                ...state,
                countries: action.payload
            }
        case 'GET_COUNTRY_DETAIL':
            return{
                ...state,
                countryDetail: action.payload
            }
        case 'FILTER_BY_CONTINENT':
            let allCountries = state.allCountries
            let continentFilter = action.payload === 'All' ? allCountries : allCountries.filter(el => el.continents === action.payload)
            return{
                ...state,
                countries: continentFilter,
                byContinentCountries: continentFilter
            }
        case 'GET_ACTIVITIES':
            return{
                ...state,
                activities: action.payload,
            }
        case 'FILTER_BY_ACTIVITIES':
            let countriesActivities = document.getElementById("secondSelect").getElementsByTagName('option')[0].selected === 'selected' 
            ? state.allCountries
            : state.byContinentCountries
            let activityFilter = action.payload === 'All'
            ? countriesActivities
            : countriesActivities.filter(e=> e.activities && e.activities.map(a => a.name).includes(action.payload))
            return{
                ...state,
                countries: activityFilter,
            }
        case 'POST_ACTIVITY':
            return{
                ...state
            }
        case 'ORDER_BY':
            let sorted = state.countries
            if (action.payload === 'asc'){
                sorted.sort(function(a,b){
                    if(a.name > b.name) {
                        return 1
                    }
                    if (b.name > a.name) {
                        return -1
                    }
                return 0
                })
            }
            else if (action.payload === 'desc'){
                sorted.sort(function(a,b){
                    if(a.name < b.name) {
                        return 1
                    }
                    if (b.name < a.name) {
                        return -1
                    }
                return 0
                })
            }
            else if (action.payload === 'maxPop'){
                sorted.sort(function(a,b){
                    if(a.population > b.population) {
                        return 1
                    }
                    if (b.population > a.population) {
                        return -1
                    }
                return 0
                })
            }
            else if (action.payload === 'minPop'){
                sorted.sort(function(a,b){
                    if(a.population < b.population) {
                        return 1
                    }
                    if (b.population < a.population) {
                        return -1
                    }
                return 0
                })
            }
            else if (action.payload === 'minArea'){
                sorted.sort(function(a,b){
                    if(a.area > b.area) {
                        return 1
                    }
                    if (b.area > a.area) {
                        return -1
                    }
                return 0
                })
            }
            else if (action.payload === 'maxArea'){
                sorted.sort(function(a,b){
                    if(a.area < b.area) {
                        return 1
                    }
                    if (b.area < a.area) {
                        return -1
                    }
                return 0
                })
            }
            return {
                ...state,
                countries: sorted

            }

    default: return state
    }
}

export default reducer