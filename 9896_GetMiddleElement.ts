/*
  9896 - GetMiddleElement
  -------
  by 凤之兮原 (@kongmingLatern) #medium

  ### Question

  Get the middle element of the array by implementing a `GetMiddleElement` method, represented by an array

  > If the length of the array is odd, return the middle element
  > If the length of the array is even, return the middle two elements

  For example

  ```ts
    type simple1 = GetMiddleElement<[1, 2, 3, 4, 5]>, // expected to be [3]
    type simple2 = GetMiddleElement<[1, 2, 3, 4, 5, 6]> // expected to be [3, 4]
  ```

  > View on GitHub: https://tsch.js.org/9896
*/

/* _____________ Your Code Here _____________ */
type IsEven<T extends any [], Ret extends boolean = true> = T extends [infer First, ...infer Rest]
  ? IsEven<Rest, Ret extends true ? false : true>
  : Ret

type GetMiddleElement<T extends any [], Save extends any[] = T, Ary extends any[] = [], Dup extends boolean = false, > = Ary['length'] extends Save['length']
  ? IsEven<Save> extends false
    ? Ary extends [...infer Rest, infer Last]
      ? [Last]
      : []
    : Ary extends [...infer Rest, infer Last]
      ? T extends [infer First, ...infer Rest]
        ? [Last, First]
        : []
      : []
  : T extends [infer First, ...infer Rest]
    ? Dup extends true
      ? GetMiddleElement<Rest, Save, [...Ary, First], false>
      : GetMiddleElement<T, Save, [...Ary, First], true>
    : []

type Test1 = GetMiddleElement<[1, 2, 3]>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetMiddleElement<[]>, []>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5]>, [3]>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5, 6]>, [3, 4]>>,
  Expect<Equal<GetMiddleElement<[() => string]>, [() => string]>>,
  Expect<Equal<GetMiddleElement<[() => number, '3', [3, 4], 5]>, ['3', [3, 4]]>>,
  Expect<Equal<GetMiddleElement<[() => string, () => number]>, [() => string, () => number]>>,
  Expect<Equal<GetMiddleElement<[never]>, [never]>>,
]
// @ts-expect-error
type error = GetMiddleElement<1, 2, 3>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9896/answer
  > View solutions: https://tsch.js.org/9896/solutions
  > More Challenges: https://tsch.js.org
*/
