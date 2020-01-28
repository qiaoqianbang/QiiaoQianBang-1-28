import React, { Component } from 'react';
import { Table, Divider, Tag, Button, Modal, Input, notification } from 'antd';
const { TextArea } = Input;
const { confirm } = Modal;
export default class KnowList extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        kname: '',
        des: '',
        type: '',
        kid: 0,
        columns: [
            {
                title: '知识库名',
                dataIndex: 'kname',
                key: 'kname',
            },

            {
                title: '描述',
                dataIndex: 'des',
                key: 'des',
            },

            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Tag color="red" onClick={() => this.mod(record)}>
                            修改
                        </Tag>
                        <Divider type="vertical" />
                        <Tag color="red" onClick={() => this.del(record.kid)}>
                            删除
                        </Tag>
                    </span>
                ),
            },
        ],
        data: [],
    };
    showModal = param => {
        this.setState({
            visible: true,
            type: param,
        });
        if (param === 'add') {
            this.setState({
                kname: '',
                des: '',
            });
        }
    };

    handleOk = () => {
        const { kname, des, type, kid } = this.state;
        if (kname === '' || des === '') {
            notification['error']({
                message: '友情提示',
                description: '要填写完每一项哦！',
                duration: 1.5,
            });
            return;
        }
        const param = { kname, des, kid };
        const url = type === 'add' ? '/addknow' : '/modknow';
        this.$axios('post', url, param).then(res => {
            this.getlist();

            if (res.data.code === 1) {
                notification['success']({
                    message: '友情提示',
                    description: res.data.msg,
                    duration: 1.5,
                });
            }
        });
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 1000);
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    _onChange(e, key) {
        this.setState({
            [key]: e.target.value.trim(),
        });
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    };
    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <h3 className="center">知识库列表</h3>
                <div>
                    <Button type="primary" onClick={() => this.showModal('add')}>
                        创建知识库
                    </Button>
                    <Modal
                        title="知识库"
                        visible={visible}
                        onOk={this.handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                    >
                        <div>
                            <Tag>名称</Tag>
                            <Input
                                placeholder="输入知识库名字"
                                allowClear
                                value={this.state.kname}
                                onChange={e => this._onChange(e, 'kname')}
                            />
                            <br />
                            <br />
                            <Tag>描述</Tag>
                            <TextArea
                                placeholder="输入大概描述"
                                allowClear
                                value={this.state.des}
                                onChange={e => this._onChange(e, 'des')}
                            />
                        </div>
                        ,
                    </Modal>
                </div>
                <Table
                    rowKey={record => record.kid}
                    columns={this.state.columns}
                    dataSource={this.state.data}
                />
            </div>
        );
    }
    getlist() {
        this.$axios('get', '/knowlist').then(res => {
            this.setState({
                data: res.data.data,
            });
        });
    }
    del(kid) {
        const _this = this;
        confirm({
            title: '确定要删除吗?',
            content: '人生建议，保留下来哦！',
            okText: '滚',
            okType: 'danger',
            cancelText: '再想想',
            onOk() {
                _this.$axios('post', '/deleteknow', { kid }).then(res => {
                    _this.getlist();
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    mod(data) {
        this.showModal('mod');
        this.setState({
            kid: data.kid,
            kname: data.kname,
            des: data.des,
        });
    }
    componentDidMount() {
        this.getlist();
    }
}
