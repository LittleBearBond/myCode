// https://segmentfault.com/a/1190000017766370
var express = require('express');
var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');
const schema = require('./schema')
/* var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
var root = { hello: () => 'Hello world!' }; */
// 使用 GraphQL schema language 构建一个 schema
/* var schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

// root 将会提供每个 API 入口端点的解析函数
var root = {
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
        return Math.random();
    },
    rollThreeDice: () => {
        return [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6));
    },
};
 */

var app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    // rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
/*
{
    launches {
      flight_number,
      mission_name,
      launch_date_local,,
      launch_success,
    }
  }

  {
    launches {
      flight_number,
    }
  }

  {
    launches {
      flight_number,
      mission_name,
      launch_date_local,,
      launch_success,
      rocket:{
        rocket_id,
        rocket_name,
        rocket_type,
      }
    }
  }
    {
    launches (flight_number:2){
      flight_number,
      mission_name,
      launch_date_local,,
      launch_success,
      rocket:{
        rocket_id,
        rocket_name,
        rocket_type,
      }
    }
  }
 */
