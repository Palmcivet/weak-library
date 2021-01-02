import React, { Component } from "react";
import {
	Row,
	Col,
	Form,
	Input,
	Select,
	Button,
	Layout,
	InputNumber,
	PageHeader,
	message,
	Radio,
	Switch,
} from "antd";
import {
	FormOutlined,
	DeleteOutlined,
	PlusSquareOutlined,
	CheckCircleOutlined,
	ExclamationCircleOutlined,
	UserAddOutlined,
	UserDeleteOutlined,
	EditOutlined,
} from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";

import { request } from "@/utils";
import { ECode, IBook, IReader } from "@/typings";

import style from "./style.less";

interface ICategory {
	type_id: number;
	type_name: string;
}

enum EOperation {
	BOOK_REG,
	BOOK_ALT,
	BOOK_DEL,
	READER_REG,
	READER_ALT,
	READER_DEL,
}

const Operation = [
	{ title: "图书信息登记", icon: PlusSquareOutlined },
	{ title: "图书信息更改", icon: FormOutlined },
	{ title: "图书遗失注销", icon: DeleteOutlined },
	{ title: "读者信息登记", icon: UserAddOutlined },
	{ title: "读者信息更改", icon: EditOutlined },
	{ title: "读者证件注销", icon: UserDeleteOutlined },
];

interface IProps {}

interface IState {
	isBook: boolean;
	isSelected: boolean;
	title: EOperation;
	category: Array<ICategory>;
}

const itemStyle = {
	labelCol: {
		span: 4,
		offset: 1,
	},
	wrapperCol: {
		span: 14,
		offset: 1,
	},
};

const colStyle = {
	span: 16,
	offset: 4,
};

const headerComponent = (that: Manage) => {
	const { title, isBook } = that.state;

	return (
		<PageHeader
			title={Operation[title].title}
			onBack={() => that.handleBack()}
			extra={
				title === EOperation.BOOK_REG || title === EOperation.READER_REG ? (
					<></>
				) : (
					<Input.Search
						allowClear
						placeholder="输入条形码"
						size="middle"
						onSearch={(v: string | number) =>
							isBook
								? that.handleBookSearch(v as string)
								: that.handleReaderSearch(v as number)
						}
					/>
				)
			}
		/>
	);
};

const operationComponent = (that: Manage) => {
	return Operation.map((v, i) => (
		<Button
			key={i}
			type="primary"
			icon={<v.icon />}
			onClick={() => that.handleChoose(i)}
		>
			{v.title}
		</Button>
	));
};

const bookFormComponent = (that: Manage) => {
	const { title, category } = that.state;
	const disableInput = title === EOperation.BOOK_DEL ? true : false;

	return (
		<Form
			ref={that.bookFormRef}
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 12 }}
			onFinish={(e) => that.handleFinish(e)}
		>
			<Form.Item name="key" label="条形码" {...itemStyle}>
				<InputNumber
					style={{ width: "100%" }}
					placeholder="输入图书条形码"
					disabled={title === EOperation.BOOK_REG ? false : true}
					onClick={(e) => (e.target as any).value}
				/>
			</Form.Item>
			<Form.Item name="index" label="索引" {...itemStyle}>
				<Input placeholder="输入图书索引号" disabled={disableInput} />
			</Form.Item>
			<Form.Item name="name" label="图书名称" {...itemStyle}>
				<Input placeholder="输入图书名称" disabled={disableInput} />
			</Form.Item>
			<Form.Item name="type" label="图书类别" {...itemStyle}>
				<Select
					showSearch
					placeholder="选择图书类别"
					filterOption={(input, option) => option?.children.indexOf(input) >= 0}
					filterSort={(optionA, optionB) =>
						optionA.children.localeCompare(optionB.toLowerCase())
					}
					disabled={disableInput}
				>
					{category.map((v, i) => (
						<Select.Option value={v.type_id} key={i}>
							{v.type_name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item name="author" label="作者" {...itemStyle}>
				<Input placeholder="输入图书作者" disabled={disableInput} />
			</Form.Item>
			<Form.Item name="press" label="出版社" {...itemStyle}>
				<Input placeholder="输入图书出版社" disabled={disableInput} />
			</Form.Item>
			<Form.Item name="price" label="单价" {...itemStyle}>
				<InputNumber
					style={{ width: "100%" }}
					placeholder="输入图书单价"
					disabled={disableInput}
					formatter={(value) =>
						value ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
					}
				/>
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 10, span: 4 }}>
				<Button
					block
					size="large"
					type="primary"
					shape="round"
					htmlType="submit"
					icon={
						title === EOperation.BOOK_DEL ? (
							<ExclamationCircleOutlined />
						) : (
							<CheckCircleOutlined />
						)
					}
				>
					{title === EOperation.BOOK_REG
						? "登记"
						: title === EOperation.BOOK_ALT
						? "更改"
						: "注销"}
				</Button>
			</Form.Item>
		</Form>
	);
};

const readerFormComponent = (that: Manage) => {
	const { title } = that.state;
	const disableInput = title === EOperation.READER_DEL ? true : false;

	return (
		<Form
			ref={that.readerFormRef}
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 12 }}
			onFinish={(e) => that.handleFinish(e)}
		>
			<Form.Item name="id" label="证件号" {...itemStyle}>
				<InputNumber
					style={{ width: "100%" }}
					placeholder="输入读者证件号"
					disabled={title === EOperation.READER_REG ? false : true}
					onClick={(e) => (e.target as any).value}
				/>
			</Form.Item>
			{title === EOperation.READER_ALT ? (
				<Form.Item name="pass" label="重置密码" {...itemStyle}>
					<Switch disabled={disableInput} />
				</Form.Item>
			) : (
				<></>
			)}
			<Form.Item name="name" label="姓名" {...itemStyle}>
				<Input placeholder="输入读者姓名" disabled={disableInput} />
			</Form.Item>
			<Form.Item name="sex" label="性别" {...itemStyle}>
				<Radio.Group disabled={disableInput}>
					<Radio value={0}>男</Radio>
					<Radio value={1}>女</Radio>
				</Radio.Group>
			</Form.Item>
			<Form.Item name="role" label="角色" {...itemStyle}>
				<Radio.Group disabled={disableInput}>
					<Radio value={0}>管理员</Radio>
					<Radio value={1}>用户</Radio>
				</Radio.Group>
			</Form.Item>
			<Form.Item name="tel" label="联系方式" {...itemStyle}>
				<Input placeholder="输入联系方式" disabled={disableInput} />
			</Form.Item>
			<Form.Item name="email" label="邮箱" {...itemStyle}>
				<Input placeholder="输入电子邮箱" disabled={disableInput} />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 10, span: 4 }}>
				<Button
					block
					size="large"
					type="primary"
					shape="round"
					htmlType="submit"
					icon={
						title === EOperation.BOOK_DEL ? (
							<ExclamationCircleOutlined />
						) : (
							<CheckCircleOutlined />
						)
					}
				>
					{title === EOperation.READER_REG
						? "注册"
						: title === EOperation.READER_ALT
						? "更改"
						: "注销"}
				</Button>
			</Form.Item>
		</Form>
	);
};

export class Manage extends Component<IProps, IState> {
	bookFormRef = React.createRef<FormInstance<IBook>>();

	readerFormRef = React.createRef<FormInstance<IReader>>();

	constructor(props: IProps) {
		super(props);

		this.state = {
			isBook: true,
			isSelected: false,
			title: EOperation.BOOK_REG,
			category: [],
		};

		this.handleBookCategory();
	}

	handleChoose(title: EOperation) {
		this.setState({
			title,
			isBook: title < 3,
			isSelected: true,
		});
	}

	handleBack() {
		this.setState({
			isSelected: false,
		});
	}

	async handleBookCategory() {
		const res = await request("/book/category", {});

		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg });
		} else {
			this.setState({ category: res.data });
		}
	}

	async handleBookSearch(bar_code: string) {
		this.bookFormRef.current?.resetFields();

		const res = await request("/book/fetch", { bar_code });

		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg });
		} else if (res.data === null) {
			message.info({ content: "找不到图书，请校对条形码" });
		} else {
			const { key, index, name, type, author, press, price } = res.data;

			this.bookFormRef.current?.setFieldsValue({
				key,
				index,
				name,
				type,
				author,
				press,
				price,
			});
		}
	}

	async handleReaderSearch(id: number) {
		this.readerFormRef.current?.resetFields();

		const res = await request("/admin/fetch", { id });

		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg });
		} else if (res.data === null) {
			message.info({ content: "找不到该用户" });
		} else {
			const { id, name, sex, role, register_date, telephone, email } = res.data;

			this.readerFormRef.current?.setFieldsValue({
				id,
				name,
				sex,
				role,
				email,
				pass: false,
				reg: register_date,
				tel: telephone,
			});
		}
	}

	async handleFinish(e: IBook | IReader) {
		let path = "";

		switch (this.state.title) {
			case EOperation.BOOK_REG:
				path = "/book/register";
				break;
			case EOperation.BOOK_ALT:
				path = "/book/modify";
				break;
			case EOperation.BOOK_DEL:
				path = "/book/delete";
				break;
			case EOperation.READER_REG:
				path = "/admin/register";
				break;
			case EOperation.READER_ALT:
				path = "/admin/modify";
				break;
			case EOperation.READER_DEL:
				path = "/admin/delete";
				break;
		}

		const res = await request(path, { ...e });

		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg });
		} else {
			message.success({ content: res.msg });
			this.handleBack();
		}
	}

	render() {
		const { isSelected, isBook } = this.state;

		return (
			<Layout>
				{isSelected ? (
					<>
						<Row>
							<Col {...colStyle}>{headerComponent(this)}</Col>
						</Row>

						<Row className={style["manage-form"]}>
							<Col {...colStyle}>
								{isBook
									? bookFormComponent(this)
									: readerFormComponent(this)}
							</Col>
						</Row>
					</>
				) : (
					<Row style={{ height: "100%" }}>
						<Col
							sm={{ span: 24, offset: 0 }}
							md={{ span: 24, offset: 0 }}
							lg={{ span: 22, offset: 2 }}
							xl={{ span: 18, offset: 3 }}
							xxl={{ span: 18, offset: 3 }}
							className={style["operation-group"]}
						>
							{operationComponent(this)}
						</Col>
					</Row>
				)}
			</Layout>
		);
	}
}
