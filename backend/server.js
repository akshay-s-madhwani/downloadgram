const instagramGetUrl = require("instagram-url-direct")
// const instagramGetUrl = require("instagram-get-url");
// const { createProxyMiddleware } = require('http-proxy-middleware');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// middleware
const corsOptions = {
    origin: "https://downloadgram.onrender.com" // frontend URI (ReactJS)
}
app.use(express.json());
app.use(cors(corsOptions));

// Allow cross-origin requests from any domain
// app.use(cors());

// Parse incoming request bodies as JSON
app.use(bodyParser.json());


// app.use(
//     '/api',
//     createProxyMiddleware({
//         target: 'http://api.example.com',
//         changeOrigin: true,
//     })
// );

// const getMediaUrl = async (inputURL) => {
//     let links = await instagramGetUrl(inputURL)
//     // let links = await instagramGetUrl(inputURL);
//     // console.log(links)
//     return new Promise((resolve, reject) => {
//         // some asynchronous operation here
//         // ...
//         // const result = 42; // the value you want to return
//         resolve(links); // wrap the value in a resolved Promise
//     });
// }

const getMediaUrl = async (inputURL) => {
    try {
        console.log('Test 5 passed')
        let links = await instagramGetUrl(inputURL);
        console.log('Test 6 passed')
        // console.log(links)
        return new Promise((resolve, reject) => {
            console.log('Test 7 passed')
            // some asynchronous operation here
            // ...
            // const result = 42; // the value you want to return
            resolve(links); // wrap the value in a resolved Promise
            console.log('Test 8 passed')
        });
    } catch (error) {
        console.log('Test 9 passed, inputURL-> ' + inputURL)
        // Handle the error
        console.error(error);
        console.log('Test 10 passed')
        // Return a rejected Promise
        return Promise.reject(error);
    }
};


// Define a route to handle incoming POST requests
// app.post('/api/getmedia', async (req, res) => {
//     inputURL = req.body.inputValue;
//     // Log the data sent in the request body
//     // console.log(req.body.inputValue);
//     links = await getMediaUrl(inputURL)
//     // console.log(links.url_list, 'from')
//     // Send a JSON response to the client
//     res.json({ links: links.url_list });
// });

app.post('/', async (req, res) => {
    try {
        const inputURL = req.body.inputValue;
        const links = await getMediaUrl(inputURL);
        res.json({ links: links.url_list });
        console.log('Test 2 passed')
    } catch (error) {
        console.log('Test 3 passed')
        console.error(error);
        res.status(500).json({ error: 'Internal server error-> ' + error });
        console.log('Test 4 passed')
    }
});


// Start the server
app.listen(5001, () => {
    console.log('Server listening on port 5001');
    console.log('Test 1 passed')
});
