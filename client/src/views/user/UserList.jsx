import React, { Component } from 'react';
import { Table, Divider } from 'antd';

export default class UserList extends Component {
    state = {
        columns: [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                render: text => <span>{text}</span>,
            },
            {
                title: '用户级别',
                dataIndex: 'utype',
                key: 'utype',
            },

            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <b>编辑</b>
                        <Divider type="vertical" />
                        <b>删除</b>
                    </span>
                ),
            },
        ],
        data: [],
    };
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    };
    componentDidMount() {
        this.$axios('get', '/userlist').then(res => {
            this.setState({ data: res.data.data });
        });
    }
    render() {
        return (
            <Table
                rowKey={record => record.key}
                columns={this.state.columns}
                dataSource={this.state.data}
            />
        );
    }
}
