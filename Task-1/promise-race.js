const request = require("postman-request");

let promise1 = () => new Promise((resolve, reject) => {
    request({ url: "https://reqres.in/api/users", json: true }, (error, response, body) => {
        if (error) {
            reject("Error!!");
        }
        resolve({ body, version: "v1" });
    })
});


let promise2 = () => new Promise((resolve, reject) => {
    request({ url: "https://reqres.in/api/users", json: true }, (error, response, body) => {
        if (error) {
            reject("Error!!");
        }
        resolve({ body: body, version: "v2" });
    })
});

Promise.race([promise1(), promise2()]).then((result) => {
    console.log(result.body);
    console.log(result.version);
}).catch((e) => {
    console.log("Error!!!")
});