import React, { Component, Ref } from "react";
import {
	Button,
	Input,
	Layout,
	message,
	PageHeader,
	Form,
	Select,
	Row,
	Col,
	InputNumber,
} from "antd";
import {
	CheckCircleOutlined,
	DeleteOutlined,
	ExclamationCircleOutlined,
	FormOutlined,
	PlusSquareOutlined,
} from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";

import { hasElements, request } from "@/utils";
import { ECode, IBook } from "@/typings";

import style from "./style.less";

interface ICategory {
	type_id: number;
	type_name: string;
}

interface IProps {}

interface IState {
	title: EOp;
	isSelected: boolean;
	category: Array<ICategory>;
}

enum EOp {
	REG = "图书信息登记",
	ALT = "图书信息更改",
	DEL = "图书遗失注销",
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

export class Book extends Component<IProps, IState> {
	formRef = React.createRef<FormInstance>();

	constructor(props: IProps) {
		super(props);

		this.state = {
			isSelected: false,
			title: EOp.REG,
			category: [],
		};

		this.handleCategory();
	}

	handleChoose(op: EOp) {
		this.setState({
			isSelected: true,
			title: op,
		});
	}

	handleBack() {
		this.setState({
			isSelected: false,
		});
	}

	async handleCategory() {
		const res = await request("/book/category", {});

		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg });
		} else {
			this.setState({ category: res.data });
		}
	}

	async handleSearch(bar_code: string) {
		const res = await request("/book/fetch", { bar_code });

		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg });
		} else if (!hasElements(res.data)) {
			message.info({ content: "找不到图书，请校对条形码" });
		} else {
			const { key, index, name, type, author, press, price } = res.data;

			this.formRef.current?.setFieldsValue({
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

	async handleFinish(e: IBook) {
		const res = await request("/book/modify", { ...e });

		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg });
		} else {
			message.success({ content: res.msg });
			this.handleBack();
		}
	}

	render() {
		const { isSelected, title, category } = this.state;

		return (
			<Layout>
				{isSelected ? (
					<>
						<Row>
							<Col {...colStyle}>
								<PageHeader
									title={title}
									onBack={() => this.handleBack()}
									extra={
										title === EOp.REG ? (
											<></>
										) : (
											<Input.Search
												allowClear
												placeholder="输入条形码"
												size="middle"
												onSearch={(v: string) =>
													this.handleSearch(v)
												}
											/>
										)
									}
								/>
							</Col>
						</Row>

						<Row className={style["book-form"]}>
							<Col {...colStyle}>
								<Form
									ref={this.formRef}
									labelCol={{ span: 4 }}
									wrapperCol={{ span: 12 }}
									onFinish={(e) => this.handleFinish(e)}
								>
									<Form.Item name="key" label="条形码" {...itemStyle}>
										<InputNumber
											style={{ width: "100%" }}
											placeholder="输入图书条形码"
											disabled={title === EOp.REG ? false : true}
											onClick={(e) => (e.target as any).value}
										/>
									</Form.Item>
									<Form.Item name="index" label="索引" {...itemStyle}>
										<Input
											placeholder="输入图书索引号"
											disabled={title === EOp.DEL ? true : false}
										/>
									</Form.Item>
									<Form.Item
										name="name"
										label="图书名称"
										{...itemStyle}
									>
										<Input
											placeholder="输入图书名称"
											disabled={title === EOp.DEL ? true : false}
										/>
									</Form.Item>
									<Form.Item
										name="type"
										label="图书类别"
										{...itemStyle}
									>
										<Select
											showSearch
											placeholder="选择图书类别"
											filterOption={(input, option) =>
												option?.children.indexOf(input) >= 0
											}
											filterSort={(optionA, optionB) =>
												optionA.children.localeCompare(
													optionB.toLowerCase()
												)
											}
											disabled={title === EOp.DEL ? true : false}
										>
											{category.map((v, i) => (
												<Select.Option value={v.type_id} key={i}>
													{v.type_name}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									<Form.Item name="author" label="作者" {...itemStyle}>
										<Input
											placeholder="输入图书作者"
											disabled={title === EOp.DEL ? true : false}
										/>
									</Form.Item>
									<Form.Item name="press" label="出版社" {...itemStyle}>
										<Input
											placeholder="输入图书出版社"
											disabled={title === EOp.DEL ? true : false}
										/>
									</Form.Item>
									<Form.Item name="price" label="单价" {...itemStyle}>
										<InputNumber
											style={{ width: "100%" }}
											placeholder="输入图书单价"
											disabled={title === EOp.DEL ? true : false}
											formatter={(value) =>
												value
													? `$ ${value}`.replace(
															/\B(?=(\d{3})+(?!\d))/g,
															","
													  )
													: ""
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
												title === EOp.DEL ? (
													<ExclamationCircleOutlined />
												) : (
													<CheckCircleOutlined />
												)
											}
										>
											{title === EOp.REG
												? "登记"
												: title === EOp.ALT
												? "更改"
												: "注销"}
										</Button>
									</Form.Item>
								</Form>
							</Col>
						</Row>
					</>
				) : (
					<div className={style["book-buttom-group"]}>
						<Button
							type="primary"
							className={style["book-button"]}
							onClick={() => this.handleChoose(EOp.REG)}
						>
							<PlusSquareOutlined />
							{EOp.REG}
						</Button>
						<Button
							type="primary"
							className={style["book-button"]}
							onClick={() => this.handleChoose(EOp.ALT)}
						>
							<FormOutlined />
							{EOp.ALT}
						</Button>
						<Button
							type="primary"
							className={style["book-button"]}
							onClick={() => this.handleChoose(EOp.DEL)}
						>
							<DeleteOutlined />
							{EOp.DEL}
						</Button>
					</div>
				)}
			</Layout>
		);
	}
}
