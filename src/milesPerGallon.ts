const mileage = require('../data/mileage.json')
import _ from 'lodash';

const mileageData = _.chain([mileage.initialMileage])
    .concat(mileage.data.map(d => d.mileage))
    .zip([0].concat(mileage.data.map(d => d.gallons)))
    .value()

const mpg = _.chain(mileageData)
    .tail()
    .map((d, i) => (d[0] - mileageData[i][0]) / (d[1]))
    .value()

export default mpg