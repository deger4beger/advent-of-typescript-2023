// Solution
type GetCurrentSymbol<T extends string> = 
	T extends '🛹' ? '🚲'
	: T extends '🚲' ? '🛴'
	: T extends '🛴' ? '🏄'
	: '🛹'

type FillArray<T extends string, Count extends number, Result extends string[] = []> = 
	Result['length'] extends Count 
		? Result 
		: FillArray<T, Count, [...Result, T]>

type Rebuild<T extends number[], Result extends any[] = []> = 
	T extends [infer Head extends number, ...infer Rest extends number[]]
	? Result extends [...infer HeadRes extends string[], infer LastRes extends string]
		? Rebuild<Rest, [...Result, ...FillArray<GetCurrentSymbol<LastRes>, Head>]>
		: Rebuild<Rest, [...Result, ...FillArray<'🛹', Head>]>
	: Result;

// Tests
import { Expect, Equal } from 'type-testing';

type test_0_actual = Rebuild<[2, 1, 3, 3, 1, 1, 2]>;
//   ^?
type test_0_expected =  [
  '🛹', '🛹',
	'🚲',
	'🛴', '🛴', '🛴',
	'🏄', '🏄', '🏄',
	'🛹',
	'🚲',
	'🛴', '🛴',
];
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type test_1_actual = Rebuild<[3, 3, 2, 1, 2, 1, 2]>;
//   ^?
type test_1_expected = [
	'🛹', '🛹', '🛹',
	'🚲', '🚲', '🚲',
	'🛴', '🛴',
	'🏄',
	'🛹', '🛹',
	'🚲',
	'🛴', '🛴'
];
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type test_2_actual = Rebuild<[2, 3, 3, 5, 1, 1, 2]>;
//   ^?
type test_2_expected = [
	'🛹', '🛹',
	'🚲', '🚲', '🚲',
	'🛴', '🛴', '🛴',
	'🏄', '🏄', '🏄', '🏄', '🏄',
	'🛹',
	'🚲',
	'🛴', '🛴',
];
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;
