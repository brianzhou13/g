# g

## About
A simple glucose monitoring and display application that aims to mimic a steady input of data with live-time reloading. 

## How it works?
This project didn't provide me with a concrete dataset; therefore, I had to find a way to build my own. I begun by creating out a worker that would be able to give me random data that fell within this criteria:

### Random Data Generator Criteria:
* `timestamp` that had a unique `day`/`month` as well as a random `hour`/`minute` 
	* ex: `timestamp: "2015­04­16T11:15:34"},`
	* (0 <= `hour` <= 24)
	* (0 <= `minute` <= 60)
	* The `seconds` property was simply copied over from Minute.
* a `bg_value`
	* ex: `bg_value: 150`
	* (60 <= `bg_value` <= 210)
* a `meal` property that was randomly applied
	* ex: `meal: "after_meal"`

I had this worker generate multiple datapoints at a time, and each round publishing the tasks into a messaging queue (rabbitMQ) after an assigned amount of seconds. This worker was separate from my web server, so it was started independently (see startup section below for separation). 

My web server was the consumer, and is connected to this queue (`data2`), and took in the received messages (from worker) and parse its buffer. Afterwards, the web server would then clean it up into a format that'd be useable in the front-end (parsing the timestamp) and store the parse-able version it into the Mongo database. 

Having this backend setup simulated a 'real' scenario where data about a user could be continuously tracked, then sent to the front-end to be displayed.

As for the front-end, I had a setInterval setup to consistently ping the backend every hour for new data. This time interval can be adjusted... but now that I'm writing this... I think the application of Socket.io probably would have been much more appropriate. Nonetheless, the front-end consistently pings the backend for updates and sets it into the App state. 

The App component has two major components -- the Graph and the Long Scroll View. 

The graph was built using Victory Components. This library is built on-top of D3, but abstracts a lot of its details. This was a new library (still in Alpha), and I kinda wanted to try out, so there was some time spent digging through documentation; however, towards the end, it didn't offer the customization and flexibility I needed when fulfilling some of the project requirements (scrolling for data). There also wasn't a whole lot of support around the web behind how to utilize this library, so it was an interesting experience digging through the project's 'issues' section to find examples of other people's code. 

The Long Scroll View was built with multiple React components.

Testing was differed from back-end and front-end. Not much was done on the front-end as I'm not too familiar with Enzyme as the tests I'd have written would be unit tests to check if the component was present and if the React Lifecycle Methods were called. Overall, testing wasn't prioritized as much given the time constraint for this project. 
 


## Primary Front-End Technologies Used:
* React
* Webpack
* Victory ( https://www.npmjs.com/package/victory )

## Primary Back-End Technologies Used:
* Express

## Other Notable Tech Used:
* RabbitMQ
* Mongo / Mongoose
* Mocha / Chai / Enzyme
* jQuery

## Short Startup (with dummy data already-inputted)
* `npm install` to install the package dependencies
* `npm run wp` to start webpack
* `mongod` still need mongodb for app to be running, but we aren't pulling data from it
* `npm start` to start the server

## Full Startup
* `npm install` to install package dependencies
* `brew install rabbitmq` to install RabbitMQ
* `cd /usr/local/sbin` to start the RabbitMQ queue
* `mongod` to start MongoDB
* `npm run wp` to start webpack
* `npm start` to start the server
* `npm run add` to start the worker
* `npm test` to start the tests

## Expected Feature List:

### Graphical Display:
1. build graphical view to display readings - [done]
2. scroll/left right on graph to view more data [ not-done ] - My D3 was very rusty, so I was hesitant to build the graph with D3. This was a mistake on my part as Victory ended up being not as flexible as I had hoped (or I missed something in the docs).
3. mouse over example to show data [ done ]
4. mouse over should also show an apple indicating meal [ not-done ] - No apple, but I do display the text. 
5. color-code datapoint to show hyper and hypo events [ half-done ] - For some reason this only sometimes works, and when it does, it's usually on first render. Once an element is clicked or hovered upon, then the colors all disappear.

### Longscroll View:
1. scrollable view with timestamps and meal-tag - [done]
2. mouseover on any reading will highlight - [ not-done ] - Wasn't able to research how to force a tooltip to be shown for an element within the Victory Graph.
3. color-code datapoint to show hyper and hypo events - [ done ]
4. scrollable — but limited by 300px by 600px box - [ done ]


## Screenshots:
I do apologize for the complexity in project startup. 


