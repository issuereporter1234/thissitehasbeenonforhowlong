const http = require('http');
const fs = require('fs');

const server = http.createServer();
const htmlFile = fs.readFileSync('index.html')
server.listen(8000, '0.0.0.0', () => {
    console.log('Server listening on port 8000');
    
})
let time
if (fs.existsSync('./time.json')){
     time = JSON.parse(fs.readFileSync('time.json'))
}
else{
     time = {
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    
    
   
}
}
 function calculate(){

       if(time.seconds > 60){
        time.minutes++;
        time.seconds = 0;
       }
       if(time.minutes >60){
        time.hours++;
        time.minutes = 0;
       }
       if(time.hours > 24){
        time.days++;
        time.hours = 0;
       }
       if(time.days > 365){
        time.years++;
        time.days = 0;
       }
    }
const intervalGl = setInterval(() => {
            time.seconds++;
            calculate();
            
        }, 1000);

const intervalWrite = setInterval(() =>{
    fs.writeFileSync('time.json', JSON.stringify(time))
}, 60000)

server.on('request', (req, res) =>{
    let path = req.url;
    if (path === '/counting'){
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        const intervalLoc = setInterval(() => {
            
            res.write(`data: ${time.years} years ${time.days} days${time.hours} hours ${time.minutes} minutes ${time.seconds} seconds \n\n`)
        }, 1000);
        req.on('close', () => {
            clearInterval(intervalLoc)
        })

    }
    else if(path === '/'){
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(htmlFile)

    }
    else {
        res.writeHead(200,{
            'Content-Type': 'text/Html'
        })
        res.end('<h1>404</h1>')
    }
})