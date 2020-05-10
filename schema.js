const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
})

//HardCoded data
const customers = [
    {id: '1', name: 'Joe Mama', email: 'jmama@gmail.com', age: 29},
    {id: '2', name: 'Mark Shnak', email: 'mshnak@gmail.com', age: 34},
    {id: '3', name: 'Laurem Ipsum', email: 'ls@gmail.com', age: 55},
]

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                for (let i=0; i < customers.length; i++) {
                    if (customers[i].id === args.id) {
                        return customers[i];
                    }
                }
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return customers;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});