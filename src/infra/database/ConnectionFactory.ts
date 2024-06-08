import postgres from "postgres";
import { Configuration } from "./Configuration";

export class ConnectionFactory{
    private configuration: Configuration;

    public constructor(configuration : Configuration){
        this.configuration = configuration;
    }

    public create(): any{
        return postgres({ 
            host: this.configuration.host, 
            database: this.configuration.database, 
            username: this.configuration.username, 
            password: this.configuration.password,
            port: this.configuration.port
         });
    }
}