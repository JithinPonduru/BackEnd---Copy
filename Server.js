const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    // console.log(temp);
    const temp = data.data;
    if (!Array.isArray(temp)) {
      return res.status(400).send('Invalid data format: data should be an array');
    }

    const Data = {
      is_success: false,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers: [],
      alphabets: [],
      highest_alphabet: null,
    };

    let maxAlpha = '';

    for (let item of temp) {
      if (/^\d+$/.test(item)) {
        Data.numbers.push(item);
      } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
        Data.alphabets.push(item);
        if (item > maxAlpha) {
          maxAlpha = item;
        }
      }
    }

    if (maxAlpha !== '') {
      Data.highest_alphabet = maxAlpha;
    }

    Data.is_success = true;
    res.json(Data);

  } catch (error) {
    console.error('Error parsing data:', error);
    res.status(400).send('Invalid data format');
  }
});

app.get('/bfhl', (req, res) => {
  res.json({ "operation_code": 1 });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
