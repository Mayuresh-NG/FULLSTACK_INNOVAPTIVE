const http= require('http')
const PORT =process.env.PORT || 5000
const todos = require('./todos')

const server = http.createServer((request,response)=>{
    if(request.url === 'api/v1/todos' &&  request.method === "GET"){
        response.writeHead(200,{
            "content-type":"text/plain"
        })
        response.end(JSON.stringify(todos))
    }
})

server.listen(PORT,()=>{
    console.log("server is ready and is in used",PORT)
})



server.on("error",()=>{
    console.log(`the server has encountered an error`)
})

