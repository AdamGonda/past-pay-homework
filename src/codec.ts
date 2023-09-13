import * as t from 'io-ts';
import { pipe } from 'fp-ts/function';
import { chain } from 'fp-ts/Either';


export const StringifiedNumber = new t.Type<number, string, unknown>(
  'StringifiedNumber',
  (u): u is number => typeof u === 'number',
  (u, c) => 
    pipe(
      t.string.validate(u, c),
      chain((s) => {
        const n = parseFloat(s);
        return isNaN(n) ? t.failure(u, c, `Cannot parse "${u}" into a number.`) : t.success(n);
      })
    ),
  a => a.toString()
);
