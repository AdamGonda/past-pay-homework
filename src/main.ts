import express, { Request, Response } from 'express';
import { StringifiedNumber } from './codec';
import { isLeft } from 'fp-ts/lib/Either';
import { PathReporter } from 'io-ts/PathReporter';

const host = process.env['HOST'] ?? 'localhost';
const port = process.env['PORT'] ? Number(process.env['PORT']) : 3000;

const app = express();

interface SimpleResponse {
  a?: string;
  b?: string;
  result?: string;
}

const withNumberValidation =
  (callback: (a: number, b: number) => number) =>
  (req: Request, res: Response) => {
    const response: SimpleResponse = {};
    const a = StringifiedNumber.decode(req.query['a']);
    const b = StringifiedNumber.decode(req.query['b']);

    if (isLeft(a) || isLeft(b)) {
      PathReporter.report(a).forEach((message) => (response.a = message));
      PathReporter.report(b).forEach((message) => (response.b = message));

      return res.send(response);
    }

    response.result = String(callback(a.right, b.right));

    return res.send(response);
  };

app.get(
  '/add',
  withNumberValidation((a, b) => a + b)
);

app.get(
  '/subtract',
  withNumberValidation((a, b) => a - b)
);

app.get(
  '/multiply',
  withNumberValidation((a, b) => a * b)
);

app.get(
  '/divide',
  withNumberValidation((a, b) => a / b)
);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
