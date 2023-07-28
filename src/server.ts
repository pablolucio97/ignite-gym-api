import { app } from "./app";
import { env } from "./env";

app.listen({
    port: env.PORT,
    host: '0.0.0.0' // listen on all interfaces
}).then(() => {
    console.log(`Server running on ${env.PORT}`);
})