import app from "./src/app";
import { envConfig } from "./src/config/config";

function startServer (){
  const port = envConfig.portNumber
  app.listen(port,()=>{
    console.log(`project has started at ${port}`);
  })
}

startServer()