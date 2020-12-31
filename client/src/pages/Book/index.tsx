import React, { Component } from "react";
import { Button, Input, Layout, message, PageHeader, Form, Select, Row, Col } from "antd";

import { hasElements, request } from "@/utils";
import { ECode, IBook } from "@/typings";

import style from "./style.less";
import {
	CheckCircleOutlined,
	DeleteOutlined,
	FormOutlined,
	PlusSquareOutlined,
} from "@ant-design/icons";

interface IProps {}

interface IState {
	isSelected: boolean;
	title: EOp;
	book: IBook;
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

const extraHeader = (callback: (v: string) => void) => (
	<Input.Search
		allowClear
		placeholder="输入条形码"
		size="middle"
		onSearch={(v: string) => callback(v)}
	/>
);

export class Book extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			isSelected: false,
			title: EOp.REG,
			book: {
				key: -1,
				index: "",
				name: "",
				type: "",
				author: "",
				press: "",
				price: 0.0,
			},
		};
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

	async handleSearch(bar_code: string) {
		const key = "获取图书信息";
		const res = await request("/book/fetch", { bar_code });

		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg, key });
		} else if (!hasElements(res.data)) {
			message.info({ content: "找不到图书，请校对条形码", key });
		} else {
			this.setState({ book: res.data[0] });
		}
	}

	render() {
		const { isSelected, title } = this.state;

		return (
			<Layout>
				{isSelected ? (
					<>
						<Row>
							<Col {...colStyle}>
								<PageHeader
									title={title}
									onBack={() => this.handleBack()}
									extra={extraHeader((v: string) =>
										this.handleSearch(v)
									)}
								/>
							</Col>
						</Row>
						<Row className={style["book-form"]}>
							<Col {...colStyle}>
								<Form labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
									<Form.Item label="条形码" {...itemStyle}>
										<Input type="number" disabled />
									</Form.Item>
									<Form.Item label="索引" {...itemStyle}>
										<Input />
									</Form.Item>
									<Form.Item label="书目名称" {...itemStyle}>
										<Input />
									</Form.Item>
									<Form.Item label="书籍类别" {...itemStyle}>
										<Select
											showSearch
											placeholder="选择图书类别"
											// onChange={}
											// onFocus={onFocus}
											// onBlur={onBlur}
											// onSearch={onSearch}
										>
											<Select.Option value="jack">
												Jack
											</Select.Option>
											<Select.Option value="lucy">
												Lucy
											</Select.Option>
											<Select.Option value="tom">Tom</Select.Option>
										</Select>
									</Form.Item>
									<Form.Item label="作者" {...itemStyle}>
										<Input />
									</Form.Item>
									<Form.Item label="出版社" {...itemStyle}>
										<Input />
									</Form.Item>
									<Form.Item label="单价" {...itemStyle}>
										<Input type="number" />
									</Form.Item>
									<Form.Item wrapperCol={{ offset: 10, span: 4 }}>
										<Button
											block
											size="large"
											type="primary"
											shape="round"
											icon={<CheckCircleOutlined />}
										>
											提交
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
							onClick={() => this.handleChoose(EOp.REG)}
						>
							<FormOutlined />
							{EOp.ALT}
						</Button>
						<Button
							type="primary"
							className={style["book-button"]}
							onClick={() => this.handleChoose(EOp.REG)}
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
