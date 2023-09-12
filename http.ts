import fs from "fs";
import http,{ IncomingMessage, ServerResponse } from "http";
import path from "path";

const port : number = 3001

const server = http.createServer ((request: IncomingMessage, response:ServerResponse<IncomingMessage>) => {
    response.writeHead(200)

    let join: string = "Browser/";

    switch (request.url) {
        case "/":
            join += "home.html";
            response.statusCode = 200;
            break;

        case "/service":
            join += "service.html";
            response.statusCode = 200;
            break;

        case "/features":
            join += "/features.html";
            response.statusCode = 200;
            break;

        default:
            join += "/404.html";
            response.statusCode = 404;
            break;
    }
    fs.readFile(path.join (__dirname, join),(error,data) => {
        if(error) {
            console.log ("An error occured", error)
            response.end ();
        }else{
            response.write(data);
            response.end();
        }
    })
})
server.listen (port, () => {
    console.log ("")
    console.log("Server is listening to port on port", port)
});