const fetch = require("node-fetch");

const TOKEN =  process.env.CRYTO_TOKEN
const API_ENDPOINT = `https://cryptonews-api.com/api/v1?tickers=BTC,ETH,XRP&items=6&token=${TOKEN}`

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
};

exports.handler = async (event, context) => {
    let response
    try {
      let result = await fetch(API_ENDPOINT).then(res => res.json())
      if (!result.data) {
        throw new Error(result.message)
      }
      response = result.data.map(item => {
        return {
          title: item.title,
          published: item.date,
          currencies: item.tickers,
          url: item.news_url
        }
      })
    } catch (err) {
      console.log(err)
      return {
        statusCode: err.statusCode || 500,
        headers,
        body: JSON.stringify({
          error: err.message
        })
      }
    }
  
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        data: response
      })
    }
  }