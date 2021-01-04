import React, { Component } from "react";
import { Layout, message, Col, Row, Button, Form, PageHeader, InputNumber } from "antd";
import { CheckCircleOutlined, DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";
import Table, { ColumnsType } from "antd/lib/table";

import { request } from "@/utils";
import { EResCode, IRecord } from "@/typings";

import style from "./style.less";
import { getFmtDate, hasElements } from "../../../../common";

enum EOperation {
	BORROW,
	RETURN,
}

interface IProc {
	book: number;
	user: number;
}

interface IProps {}

interface IState {
	op: EOperation;
	feedback: Array<IRecord>;
	isSelected: boolean;
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

const headerComponent = (that: Procedure) => {
	const { op } = that.state;

	return (
		<PageHeader
			title={op === EOperation.BORROW ? "借书手续" : "还书手续"}
			onBack={() => that.handleBack()}
		/>
	);
};

const formComponent = (that: Procedure) => {
	const { op } = that.state;

	return (
		<Form
			ref={that.formRef}
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 12 }}
			onFinish={(e) => that.handleFinish(e)}
		>
			<Form.Item name="user" label="证件号" {...itemStyle}>
				<InputNumber placeholder="输入读者证号" style={{ width: "100%" }} />
			</Form.Item>
			<Form.Item name="book" label="条形码" {...itemStyle}>
				<InputNumber placeholder="输入图书条形码" style={{ width: "100%" }} />
			</Form.Item>
			<Form.Item wrapperCol={{ offset: 10, span: 4 }}>
				<Button
					block
					size="large"
					type="primary"
					shape="round"
					htmlType="submit"
					icon={<CheckCircleOutlined />}
				>
					{op === EOperation.BORROW ? "借书" : "还书"}
				</Button>
			</Form.Item>
		</Form>
	);
};

const operationComponent = (that: Procedure) => (
	<>
		<Button
			type="primary"
			icon={<UploadOutlined />}
			onClick={() => that.handleChoose(EOperation.BORROW)}
		>
			借书
		</Button>
		<Button
			type="primary"
			icon={<DownloadOutlined />}
			onClick={() => that.handleChoose(EOperation.RETURN)}
		>
			还书
		</Button>
	</>
);

export class Procedure extends Component<IProps, IState> {
	formRef = React.createRef<FormInstance<IProc>>();

	constructor(props: IProps) {
		super(props);

		this.state = {
			op: EOperation.BORROW,
			feedback: [],
			isSelected: false,
		};
	}

	handleChoose(op: EOperation) {
		this.setState({
			op,
			isSelected: true,
		});
	}

	handleBack() {
		this.setState({
			isSelected: false,
		});
	}

	async handleFinish(e: IProc) {
		let path;

		switch (this.state.op) {
			case EOperation.BORROW:
				path = "/procedure/borrow";
				break;
			case EOperation.RETURN:
				path = "/procedure/return";
				break;
		}

		const res = await request(path, { ...e });

		if (res.code !== EResCode.SUCCESS) {
			message.error({ content: res.msg });
			this.setState({ feedback: res.data });
		} else {
			message.success({ content: res.msg });
		}
	}

	render() {
		const { isSelected, feedback } = this.state;

		return (
			<Layout>
				{isSelected ? (
					<>
						<Row>
							<Col {...colStyle}>{headerComponent(this)}</Col>
						</Row>
						<Row gutter={[8, 36]}>
							<Col {...colStyle}>{formComponent(this)}</Col>
						</Row>
						<Row gutter={[8, 36]}>
							<Col {...colStyle}>
								{hasElements(feedback) ? (
									<Table<IRecord>
										columns={column}
										dataSource={feedback}
									></Table>
								) : (
									<></>
								)}
							</Col>
						</Row>
					</>
				) : (
					<Row style={{ height: "100%" }}>
						<Col
							sm={{ span: 22, offset: 0 }}
							md={{ span: 22, offset: 0 }}
							lg={{ span: 20, offset: 2 }}
							xl={{ span: 16, offset: 3 }}
							xxl={{ span: 16, offset: 3 }}
							className={style["proc-layout"]}
						>
							{operationComponent(this)}
						</Col>
					</Row>
				)}
			</Layout>
		);
	}
}
