import express from 'express';
import http from 'http';
import giphyapi from 'giphy-api';
import base64 from 'base64-stream';

// Initialize http server
const app = express();

// Register /gif endpoint that returns base64 encoded gif
app.get('/gif', async (req, res) => {
  res.json({
    gif: await fetchGif(),
  });
});

// Launch the server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});

// Fetch random GIF url with Giphy API, download and Base64 encode it
export const fetchGif = async () => {
  const item = await giphyapi().random('cat');
  return await encode(await download(item.data.image_url));
};

// File download helper
const download = async (url) => {
  return new Promise((resolve, reject) => {
    let req = http.get(url.replace('https', 'http'));
    req.on('response', res => {
      resolve(res);
    });
    req.on('error', err => {
      reject(err);
    });
  });
};

// Base64 encode helper
const encode = async (content) => {
  let output = 'data:image/gif;base64,';
  const stream = content.pipe(base64.encode());
  return new Promise((resolve, reject) => {
    stream.on('readable', () => {
      let read = stream.read();
      if (read) {
        output += read.toString();
      }
      else {
        resolve(output);
      }
    });
    stream.on('error', (err) => {
      reject(err);
    });
  });
};
