const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;
const utilsRouter = require('./routes/utils');

//app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/api/utils', utilsRouter);

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
