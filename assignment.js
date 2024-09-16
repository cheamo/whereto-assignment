const axios = require('axios'); // node

// const controller = () => {
//     const get = (str path) => {
//         if (path === 'getFlights') {

//         }
//     }
// }

const dateFrom = new Date('2017-06-01T21:21:17.291Z')
const dateTo = new Date('2017-06-02T00:21:17.291Z')
const maxLengthHrs = 100
const prefferedCarrierStr = 'FR'

const getFlights = async() => {
    return await axios.get('https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt');
}


const filterFlights = (flights, dateFrom, dateTo, maxLengthHrs) => {
    const filtered = []
    for(const flight of flights) {
        const departTime = new Date(flight.departureTime)
        const arrivalTime = new Date(flight.arrivalTime)
        if (flight
            && dateFrom <= departTime
            && dateTo >= arrivalTime
            && maxLengthHrs >= (arrivalTime - dateFrom) / 1000 / 3600) {
            filtered.push(flight)
        }
    }

    return filtered
}

const getDistanceBetweenAirports = async (code1, code2) => {
    return 0
}

const getScore = (flight) => {
    const departTime = new Date(flight.departureTime)
    const arrivalTime = new Date(flight.arrivalTime)
    const duration =  (arrivalTime - departTime) / 1000 / 3600
    carrierscore = prefferedCarrierStr === flight.carrier ? 0.9 : 1.0
    return duration * carrierscore - getDistanceBetweenAirports
}

const rankOrderFlights = (flights, dateFrom, dateTo, maxLengthHrs, prefferedCarrierStr) => {
    return flights.sort((flight1, flight2) => {
        const score1 = getScore(flight1)
        const score2 = getScore(flight2)

        if (score1 < score2) {
            return -1
        }
        else if (score2 < score1) {
            return 1
        }
        else {
            return 0
        }
    })
}

const main = async () => {
    const flights = (await getFlights()).data;
    const filtered = filterFlights(flights, dateFrom, dateTo, maxLengthHrs)
    const ordered = rankOrderFlights(filtered, dateFrom, dateTo, maxLengthHrs, prefferedCarrierStr)
    // console.log(filtered)
    console.log(ordered)
}

// 


// console.log(dateTo < dateFrom)
// console.log(dateTo > dateFrom)
// console.log((dateTo - dateFrom) / 1000 / 3600)

main();