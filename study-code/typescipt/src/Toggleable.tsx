
/**
 * @author xiongjian
 * @email xiongjian
 * @create date 2019-01-22 11:27:22
 * @modify date 2019-01-22 11:46:11
 * @desc [description]
*/
import React, { MouseEvent, SFC, Component, ComponentType } from 'react'

type Props = {
	onClick(e: MouseEvent<HTMLElement>): void
}

export const Button01: SFC<Props> = ({ onClick: handleClick, children }) => (
	<button onClick={handleClick}>{children}</button>
)

const InitState = {
	count: 0
}
type State = Readonly<typeof InitState>

//  纯函数，方便测试
const incrementClicksCount = (prevState: State) => ({
	count: prevState.count + 1,
});

const decrementClicksCount = (prevState: State) => ({
	count: prevState.count - 1,
});

export class ButtonConuter extends Component<object, State>{
	readonly state: State = InitState
	private handleIncrement = () => this.setState(incrementClicksCount);
	private handleDecrement = () => this.setState(decrementClicksCount);

	render() {
		const { count } = this.state;
		return (
			<React.Fragment>
				<button onClick={this.handleIncrement}>Increment</button>
				<button onClick={this.handleDecrement}>Decrement</button>
				You've clicked me {count} times!
		  </React.Fragment>
		);
	}
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type ButtonProps = {
	onClick(e: MouseEvent<HTMLElement>): void,
	color?: string
}
export const Button02: SFC<ButtonProps> = ({ onClick: handleClick, children, color }) => (
	<button onClick={handleClick} style={{ color }}>{children}</button>
)

export const withDefaultProps = <
	P extends object,
	DP extends Partial<P> = Partial<P>
>(
	defaultProps: DP,
	Cmp: ComponentType<P>,
) => {
	// 提取出必须的属性
	type RequiredProps = Omit<P, keyof DP>;
	// 重新创建我们的属性定义，通过一个相交类型，将所有的原始属性标记成可选的，必选的属性标记成可选的
	type Props = Partial<DP> & Required<RequiredProps>;

	Cmp.defaultProps = defaultProps;

	// 返回重新的定义的属性类型组件，通过将原始组件的类型检查关闭，然后再设置正确的属性类型
	return (Cmp as ComponentType<any>) as ComponentType<Props>;
};


const defaultProps = {
	color: 'red',
};
type DefaultProps = typeof defaultProps;
type Props1 = { onClick(e: MouseEvent<HTMLElement>): void } & DefaultProps;
const Button03: SFC<Props1> = ({ onClick: handleClick, color, children }) => (
	<button style={{ color }} onClick={handleClick}>
		{children}
	</button>
);
export const ButtonWithDefaultProps = withDefaultProps(defaultProps, Button03);

export const ButtonViaClass = withDefaultProps(
	defaultProps,
	class Button extends Component<Props1> {
		render() {
			const { onClick: handleClick, color, children } = this.props;
			return (
				<button style={{ color }} onClick={handleClick}>
					{children}
				</button>
			);
		}
	},
);

const initState = { show: false }
type typeState = Readonly<typeof initState>

type ToggleableComponentProps = {
	show: typeState['show'];
	toggle: Toggleable['toggle'];
};
type RenderCallback = (args: ToggleableComponentProps) => JSX.Element;

type typeProps = Partial<{
	children: RenderCallback;
	render: RenderCallback;
	component: ComponentType<any>
}>
const updateShowState = (prevState: typeState) => ({ show: !prevState.show })

export class Toggleable extends Component<typeProps, typeState> {
	readonly state: typeState = initState
	private toggle = (e: MouseEvent<HTMLElement>) => this.setState(updateShowState);
	render() {
		const { children, render, component: Com } = this.props;
		const childProps = {
			show: this.state.show,
			toggle: this.toggle
		}

		if (render) {
			return render(childProps)
		}
		if (Com) {
			return <Com {...this.props} {...childProps} >
				{children}
			</Com>
		}
		return typeof children === 'function' ? children(childProps) : null
	}
}
const ToggleableMenu: SFC<{ title: string }> = ({ title, children }) => (
	<Toggleable
		render={({ show, toggle }) => (
			<>
				<div onClick={toggle}>
					<h1>{title}</h1>
				</div>
				{show ? children : null}
			</>
		)}
	/>
)
const MenuItem: SFC<{ title: string } & ToggleableComponentProps> = ({ title, toggle, show, children, }) => (
	<>
		<div onClick={toggle}>
			<h1>{title}</h1>
		</div>
		{show ? children : null}
	</>
);

const ToggleableMenu1: SFC<{ title: string }> = ({ title, children }) => (
	<Toggleable
		render={
			({ show, toggle }) => (
				<MenuItem
					show={show}
					toggle={toggle}
					title={title}>
					{children}
				</MenuItem>
			)}
	/>
);

export class Menu extends Component {
	render() {
		return (
			<>
				<ToggleableMenu title="First Menu">Some content</ToggleableMenu>
				<ToggleableMenu1 title="Second Menu">Some content</ToggleableMenu1>
				<ToggleableMenu1 title="Third Menu">Some content</ToggleableMenu1>
			</>
		);
	}
}

