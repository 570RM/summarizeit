const express = require('express');
const app = express();
const port = 3000;
const summarizeText = require('./summarize.js');

app.use(express.json());
app.use(express.static('public'));

app.post('/summarize', (req, res) => {
  const text = req.body.text_to_summarize;

  if (!text || text.length < 200) {
    return res.status(400).json({ error: 'Text is too short for summarization. Minimum length is 200 characters.' });
  }

  summarizeText(text)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      console.error('Error summarizing text:', error.message);
      res.status(500).json({ error: 'An error occurred while summarizing the text.' });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
