import React, { Component } from "react";
import { Redirect, RouteProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Col, Descriptions, Layout, message, Row, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

import { UserStore } from "@/store/user";
import { colLayout, request } from "@/utils";
import { EResCode, ESex, IRecord, IRootStore } from "@/typings";
import { getFmtDate } from "@/../../common.js";

interface IProps extends RouteProps, UserStore {}

interface IState {
	sex: ESex;
	reg: Date;
	tel: string;
	email: string;
	status: Array<IRecord>;
	record: Array<IRecord>;
}

const rowStyle = {
	gutter: [8, 32],
	justify: "center",
} as any;

const column: ColumnsType<IRecord> = [
	{
		key: "key",
		title: "条形码",
		dataIndex: "key",
		render: (val: number) => val.toString().padStart(11, "0"),
		width: 150,
	},
	{
		key: "index",
		title: "索引",
		dataIndex: "index",
		width: 150,
	},
	{
		key: "date",
		title: "借书日期",
		dataIndex: "date",
		ellipsis: true,
		width: 250,
		render: (val: string) => getFmtDate(new Date(val)),
	},
	{
		key: "name",
		title: "书名",
		dataIndex: "name",
		ellipsis: true,
	},
];

@inject((root: IRootStore) => ({
	id: root.userStore.id,
	name: root.userStore.name,
	role: root.userStore.role,
	hasAuth: root.userStore.hasAuth,
}))
@observer
export class Home extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			sex: ESex.MEN,
			reg: new Date(),
			tel: "",
			email: "",
			status: [],
			record: [],
		};
	}

	componentDidMount() {
		this.fetchUserInfo(this.props.id);
		this.fetchBookInfo(this.props.id);
		this.fetchRecordInfo(this.props.id);
	}

	async fetchUserInfo(id: number) {
		const key = "获取用户信息";
		const res = await request("/admin/fetch", { id });

		if (res.code === EResCode.DATABASE_FAIL) {
			message.error({ content: res.msg, key });
		} else {
			const { sex, tel, email, date } = res.data;
			this.setState({
				sex,
				reg: new Date(date),
				tel,
				email,
			});
		}
	}

	async fetchBookInfo(id: number) {
		const key = "获取当前借阅";
		const res = await request("/admin/status", { id });

		if (res.code === EResCode.DATABASE_FAIL) {
			message.error({ content: res.msg, key });
		} else {
			this.setState({ status: res.data });
		}
	}

	async fetchRecordInfo(id: number) {
		const key = "获取历史借阅";
		const res = await request("/admin/record", { id });

		if (res.code === EResCode.DATABASE_FAIL) {
			message.error({ content: res.msg, key });
		} else {
			this.setState({ record: res.data });
		}
	}

	render() {
		const { id, name, hasAuth } = this.props;
		const { sex, tel, email, reg, status, record } = this.state;

		if (!hasAuth) {
			message.info("请先登陆");
			return <Redirect to={{ pathname: "/auth" }} />;
		}

		return (
			<Layout>
				<Row {...rowStyle}>
					<Col {...colLayout}>
						<Descriptions title="读者信息" bordered>
							<Descriptions.Item label="证件号">{id}</Descriptions.Item>
							<Descriptions.Item label="用户名">{name}</Descriptions.Item>
							<Descriptions.Item label="性别">
								{sex === 0 ? "男" : "女"}
							</Descriptions.Item>
							<Descriptions.Item label="联系方式">{tel}</Descriptions.Item>
							<Descriptions.Item label="邮箱">{email}</Descriptions.Item>
							<Descriptions.Item label="注册日期">
								{getFmtDate(reg)}
							</Descriptions.Item>
						</Descriptions>
					</Col>
				</Row>

				<Row {...rowStyle}>
					<Col {...colLayout}>
						<Descriptions title="当前借阅" />
						<Table<IRecord>
							columns={column}
							dataSource={status}
							locale={{ emptyText: "当前没有在借书籍" }}
							pagination={false}
						/>
					</Col>
				</Row>

				<Row {...rowStyle}>
					<Col {...colLayout}>
						<Descriptions title="历史借阅" />
						<Table<IRecord>
							columns={column}
							dataSource={record}
							locale={{ emptyText: "当前没有借书记录" }}
							pagination={{ pageSize: 2 }}
						/>
					</Col>
				</Row>
			</Layout>
		);
	}
}
