import React, { Component } from "react";
import { Redirect, RouteProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Col, Descriptions, Layout, message, Row, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

import { UserStore } from "@/store/user";
import { getFmtDate, request } from "@/utils";
import { ECode, ESex, IRecord, IRootStore, IUserInfo } from "@/typings";

import style from "./style.less";

interface IProps extends RouteProps, UserStore {}

interface IState extends IUserInfo {}

const column: ColumnsType<IRecord> = [
	{
		key: "key",
		title: "序号",
		dataIndex: "key",
		render: (val: number) => val.toString().padStart(11, "0"),
		width: 150,
	},
	{
		key: "indexes",
		title: "索引",
		dataIndex: "indexes",
		width: 200,
	},
	{
		key: "borrow_date",
		title: "借书日期",
		dataIndex: "borrow_date",
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
			phone: "",
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
		const res = await request("/admin/profile", { id });

		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg, key });
		} else {
			const { sex, telephone: phone, email, register_date: date } = res.data;
			this.setState({
				sex,
				reg: new Date(date),
				phone,
				email,
			});
		}
	}

	async fetchBookInfo(id: number) {
		const key = "获取当前借阅";
		const res = await request("/admin/status", { id });

		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg, key });
		} else {
			this.setState({
				status: res.data,
			});
		}
	}

	async fetchRecordInfo(id: number) {
		const key = "获取历史借阅";
		const res = await request("/admin/record", { id });

		if (res.code === ECode.SERVER_ERROR) {
			message.error({ content: res.msg, key });
		} else {
			this.setState({
				record: res.data,
			});
		}
	}

	render() {
		const { id, name, hasAuth } = this.props;
		const { sex, phone, email, reg, status, record } = this.state;

		if (!hasAuth) {
			message.info("请先登陆");
			return <Redirect to={{ pathname: "/auth" }} />;
		}

		return (
			<Layout className={style["home-layout"]}>
				<Row gutter={[8, 32]}>
					<Col md={24}>
						<Descriptions title="读者信息" bordered>
							<Descriptions.Item label="卡号">{id}</Descriptions.Item>
							<Descriptions.Item label="用户名">{name}</Descriptions.Item>
							<Descriptions.Item label="性别">
								{" "}
								{sex === 0 ? "男" : "女"}
							</Descriptions.Item>
							<Descriptions.Item label="联系方式">
								{" "}
								{phone}
							</Descriptions.Item>
							<Descriptions.Item label="邮箱">{email}</Descriptions.Item>
							<Descriptions.Item label="注册日期">
								{getFmtDate(reg)}
							</Descriptions.Item>
						</Descriptions>
					</Col>
				</Row>

				<Row gutter={[8, 32]}>
					<Col>
						<Descriptions title="当前借阅"></Descriptions>
						<Table<IRecord>
							columns={column}
							dataSource={status}
							locale={{ emptyText: "当前没有在借书籍" }}
							pagination={false}
						></Table>
					</Col>
				</Row>

				<Row gutter={[8, 32]}>
					<Col>
						<Descriptions title="历史借阅"></Descriptions>
						<Table<IRecord>
							columns={column}
							dataSource={record}
							locale={{ emptyText: "当前没有借书记录" }}
						></Table>
					</Col>
				</Row>
			</Layout>
		);
	}
}
