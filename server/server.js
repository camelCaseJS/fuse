import express from 'express';

const PORT = 8000;

const app = express();

app.listen(PORT);

console.log(`Server up and listening to port ${PORT}`);
