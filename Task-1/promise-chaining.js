const request = require("postman-request");

let callApi = () => new Promise((resolve, reject) => {
    request({ url: "https://reqres.in/api/users", json: true }, (error, response, body) => {
        if (error) {
            reject("Error!!");
        }
        resolve(body);
    })
});

let printIndividual = (body) => new Promise((resolve, reject) => {
    if (!body) {
        reject("No body provided!");
    }
    resolve(body.data);
});

callApi().then((body) => {
    console.log(body);
    return printIndividual(body)
}).then((data) => {
    data.forEach((value) => {
        console.log(value);
    });

}).catch((e) => {
    console.log(e);
});


