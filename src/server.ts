import { app } from "./app";

app.listen({
    port: 3333,
    host: '0.0.0.0' // listen on all interfaces
}).then(() => {
    console.log('Server running on 3333')
})