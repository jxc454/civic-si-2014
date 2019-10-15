function computeMileage(
    initialMileage: number,
    gallonsAndMiles: { date: Date, gallons: number, miles: number }[]
) {
    const mileageData = _.chain([initialMileage])
        .concat(gallonsAndMiles.map(d => d.miles))
        .zip([0].concat(gallonsAndMiles.map(d => d.gallons)))
        .value()

    const mpg = _.chain(mileageData)
        .tail()
        .map((d, i) => (d[0] - mileageData[i][0]) / d[1])
        .zip(gallonsAndMiles.map(d => d.date))
        .value()

    return mpg.map(d => {
        return { date: d[1], mileage: d[0] }
    })
}

import _ from 'lodash'

export default computeMileage
