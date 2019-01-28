// https://juejin.im/post/5bab4d59f265da0aec22629b
// https://juejin.im/post/5b07caf16fb9a07aa83f2977
import { SFC, MouseEvent } from 'react'
import * as React from 'react'

export type Dictionary<T> = { [key: string]: T };
export type ReadonlyDictionary<T> = { readonly [key: string]: T };

export type ReadonlyFoo = Readonly<{
	bar: string,
	baz: string
}>;

interface IProps {
	onClick(event: MouseEvent<HTMLDivElement>): void,
}

export const Button: SFC<IProps> = ({ onClick, children }) => {
	return (
		<div onClick={onClick}>
			{children}
		</div>
	)
}
interface IResponse<T> {
	message: string,
	result: T,
	success: boolean,
}

async function getResponse(): Promise<IResponse<number[]>> {
	return {
		message: '获取成功',
		result: [1, 2, 3],
		success: true,
	}
}

getResponse().then(response => { console.log(response.result) })

// typeof
const options = {
	a: 1
}
export type Options = typeof options

// 使用 Partial 将所有的 props 属性都变为可选值
interface IProps {
	color: 'red' | 'blue' | 'yellow',
	onClick(event: MouseEvent<HTMLDivElement>): void,
}
export const Button1: SFC<Partial<IProps>> = ({ onClick, children, color }) => {
	return (
		<div onClick={onClick}>
			{children}
			{color}
		</div>
	)
}

// 使用 Required 将所有 props 属性都设为必填项
export type requireProps = Required<IProps>

// 条件类型
interface Id { id: number, /* other fields */ }
interface Name { name: string, /* other fields */ }
export type IdOrName<T extends number | string> = T extends number ? Id : Name;
export declare function createLabel<T extends number | string>(idOrName: T): T extends number ? Id : Name;

// Exclude<T,U> 从 T 中排除那些可以赋值给 U 的类型。
// export type Exclude<T, U> = T extends U ? never : T;
export type T = Exclude<1 | 2 | 3 | 4 | 5, 3 | 4>  // T = 1|2|5

// Extract<T,U> 从 T 中提取那些可以赋值给 U 的类型。
// export type Extract<T, U> = T extends U ? T : never;
type T = Extract<1 | 2 | 3 | 4 | 5, 3 | 4>  // T = 3|4

// Pick<T,K>  从 T 中取出一系列 K 的属性。
/* export type Pick<T, K extends keyof T> = {
	[P in K]: T[P];
}; */
interface Person {
	name: string,
	age: number,
	sex: string,
}

export let PickPerson: Pick<Person, 'name' | 'age'> = {
	name: '小王',
	age: 21,
}

// Record<K,T> 将 K 中所有的属性的值转化为 T 类型。
export let RecordPerson: Record<'name' | 'age', string> = {
	name: '小王',
	age: '12',
}
// Omit<T,K>（没有内置） 从对象 T 中排除 key 是 K 的属性。
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
export let Omitperson: Omit<Person, 'name'> = {
	age: 1,
	sex: '男'
}

// ReturnType<T> 获取函数 T 返回值的类型。。
export type T1 = ReturnType<() => string>; // string
export type T2 = ReturnType<(s: string) => void>; // void

export const withDefaultProps = <
	P extends object,
	DP extends Partial<P> = Partial<P>
>(
	defaultProps: DP,
	Cmp: React.ComponentType<P>,
) => {
	// 重新创建我们的属性定义，通过一个相交类型，将所有的原始属性标记成可选的，必选的属性标记成可选的
	type Props = Partial<DP> & Required<Omit<P, keyof DP>>;

	Cmp.defaultProps = defaultProps;

	// 返回重新的定义的属性类型组件，通过将原始组件的类型检查关闭，然后再设置正确的属性类型
	return (Cmp as React.ComponentType<any>) as React.ComponentType<Props>;
};
