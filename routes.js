
const url = require('url');
const axios = require('axios');
const helper = require('./helper');
const museumDataEndPoint = "https://data.lacity.org/resource/trxm-jn3c.json";
const appRouter = (app) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to meseum-visitor !!');
    });
    // api route to get visitor details
    // accepts two input params
    app.get('/api/visitors', (req, res) => {
        const queryObject = url.parse(req.url, true).query;
        let ignoreFlag = false, ignoreKey, ignored;
        if (queryObject && queryObject.date) {
            var dateObject = new Date(parseInt(queryObject.date));
            // set ignore flag to true if ignore query param is present
            if (queryObject.ignore) {
                ignoreFlag = true;
                ignoreKey = queryObject.ignore;
            }
        } else {
            res.send(`<br/> Please pass date query param with time in millisecond <br/> Example - http://localhost:3001/api/visitors?date=1543602600000`);
        }
        axios.get(museumDataEndPoint).then(response => {
            response.data.map(element => {
                 // convert current date to milliseconds and check if it is equal to input date from the given response data
                if (new Date(dateObject).getTime() === new Date(element.month).getTime()) {
                    var clonedInput = Object.assign({},element);
                    delete clonedInput.month;
                    // populate ignored object & delete from clonedInput when "ignoreFlag" is set
                    if (ignoreFlag) {
                        ignored = {
                            "museum": ignoreKey,
                            "visitors": clonedInput[ignoreKey] 
                        }
                        delete clonedInput[ignoreKey];
                    }
                    let totalVisitors = helper.getTotal(clonedInput);
                    let maxVisitors = helper.getMaxValueKey(clonedInput);
                    let minVistors = helper.getMinValueKey(clonedInput);
                    res.json({
                        "attendance": {
                            "month": new Date(element.month).toLocaleDateString('default', { month: 'short' }),
                            "year": new Date().getFullYear(),
                            "highest": {
                                "museum": maxVisitors,
                                "visitors": element[maxVisitors]
                            },
                            "lowest": {
                                "museum": minVistors,
                                "visitors": element[minVistors]
                            },
                           ignored,
                            "total": totalVisitors
                        }
                    })
                }
            }); 
        }).catch(error => { 
            console.log(error);
            res.json("something went wrong, Plese try again with right inputs");
        });
    });
};

module.exports = appRouter;