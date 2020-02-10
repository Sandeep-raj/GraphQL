const {
    GraphQLUnionType
} = require('graphql')
const ContestType = require('./ContestType')
const NameType = require('./Name')

module.exports = new GraphQLUnionType({
    name : 'Activity',
    types : [ContestType,NameType],
    resolveType(value) {
        return value.activityType === 'contests' ? ContestType : NameType;
    }
})