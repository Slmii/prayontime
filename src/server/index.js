import '@babel/polyfill';
import bodyParser         from 'body-parser';
import express            from 'express';
import path               from 'path';

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('assets/public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('assets/public/index.html'));
});
app.listen(PORT, () => console.log('Server is up! Listening to port', PORT));