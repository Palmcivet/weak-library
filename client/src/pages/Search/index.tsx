import React, { Component } from "react";
import { Col, Input, Row, Table, Layout, message } from "antd";
import { ColumnsType } from "antd/lib/table";

import { colLayout, request } from "@/utils";
import { IBook } from "@/typings";
import { EResCode } from "@/typings";

import style from "./style.less";

interface IProps {}

interface IState {
	init: boolean;
	books: Array<IBook>;
}

const gutterStyle = {
	align: "middle",
	justify: "space-around",
} as any;

const column: ColumnsType<IBook> = [
	{
		key: "key",
		title: "图书编号",
		dataIndex: "key",
		render: (val: number) => val.toString().padStart(11, "0"),
	},
	{
		key: "index",
		title: "索引",
		dataIndex: "index",
	},
	{
		key: "name",
		title: "书名",
		dataIndex: "name",
		ellipsis: true,
	},
	{
		key: "type",
		title: "类型",
		dataIndex: "type",
	},
	{
		key: "author",
		title: "作者",
		dataIndex: "author",
	},
	{
		key: "press",
		title: "出版社",
		dataIndex: "press",
	},
	{
		key: "price",
		title: "单价",
		dataIndex: "price",
	},
];

export class Search extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			init: true,
			books: [],
		};
	}

	async onSearch(keyword: string) {
		if (keyword === "") {
			message.info("请输入关键词");
			return;
		}

		if (this.state.init) {
			this.setState({ init: false });
		}

		const key = "检索图书";
		const res = await request("/book/query", { keyword });

		if (res.code === EResCode.DATABASE_FAIL) {
			message.error({ content: res.msg, key });
		} else {
			this.setState({ books: res.data });
		}
	}

	render() {
		const { init, books } = this.state;

		return (
			<Layout className={style["search-layout"]}>
				<Row {...gutterStyle}>
					<Col {...colLayout}>
						<div className={style["search-title"]}>图书检索</div>
						<Input.Search
							allowClear
							placeholder="输入关键词"
							enterButton="检索"
							size="large"
							className={style["search-box"]}
							onSearch={(val: string) => this.onSearch(val)}
						/>
					</Col>
				</Row>
				{init ? (
					<></>
				) : (
					<Row {...gutterStyle}>
						<Col {...colLayout}>
							<Table<IBook>
								columns={column}
								dataSource={books}
								pagination={{
									position: ["bottomCenter"],
									responsive: true,
									defaultCurrent: 1,
									defaultPageSize: 6,
								}}
								locale={{
									emptyText: "找不到相关书籍，请尝试更改关键词再次搜索",
								}}
							/>
						</Col>
					</Row>
				)}
			</Layout>
		);
	}
}
