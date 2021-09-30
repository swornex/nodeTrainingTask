const request = require("postman-request");

let promise1 = () => new Promise((resolve, reject) => {
    request({ url: "https://reqres.in/api/users", json: true }, (error, response, body) => {
        if (error) {
            reject("Error!!");
        }
        resolve(body);
    })
});


let promise2 = () => new Promise((resolve, reject) => {
    request({ url: "https://reqres.in/api/users", json: true }, (error, response, body) => {
        if (error) {
            reject("Error!!");
        }
        resolve(body);
    })
});

Promise.all([promise1(), promise2()]).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log("Error!!!")
});