//const {GraphQLString , GraphQLType} = require('graphql')
const humps = require('humps')
const _ = require('lodash')

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  forSnakeCase: function (GraphQLType) {
    return {
      type: GraphQLType,
      resolve(obj, args, ctx, { fieldName }) {
        return obj[humps.decamelize(fieldName)];
      }
    }
  },
  orderedFor: function (rows, keys, field, isArray) {
    var data = humps.camelizeKeys(rows);
    var inGroupOfField = _.groupBy(data, field);
    return keys.map((element) => {
      const resultArray = inGroupOfField[element];
      if (resultArray) {
        return isArray ? resultArray : resultArray[0];
      } else {
        return isArray ? [] : {}
      }
    })
  }
};
