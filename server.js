const express = require('express');
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
//Initialize the app and setups a port for the same 
const app = express();
const PORT = process.env.PORT || 3001;

//JSON parsing 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

//Setting up routes 
app.use("/", htmlRoutes); 
app.use("/api", apiRoutes); 

//LISTEN to Server 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);