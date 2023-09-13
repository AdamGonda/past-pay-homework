import express from 'express';
import { StringifiedNumber } from './codec';
import { isLeft } from 'fp-ts/lib/Either';
import { PathReporter } from 'io-ts/PathReporter';

const host = process.env['HOST'] ?? 'localhost';
const port = process.env['PORT'] ? Number(process.env['PORT']) : 3000;

const app = express();

app.get('/add', (req, res) => {
  const a = StringifiedNumber.decode(req.query['a']);
  const b = StringifiedNumber.decode(req.query['b']);

  if (isLeft(a) || isLeft(b)) {
    const error: string[] = [] 

    PathReporter.report(a).forEach((message) =>
      error.push(message)
    );

    return res.send({ error });
  }

  return res.send({ result: a.right + b.right });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
