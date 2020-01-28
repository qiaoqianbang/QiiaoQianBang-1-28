import React, { Component } from 'react';
import { Table, Divider, Tag, notification, Input, Select, Modal } from 'antd';
const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;
export default class DocList extends Component {
    state = {
        columns: [
            {
                title: '文档名字',
                dataIndex: 'title',
                key: 'title',
                render: text => <Tag>{text}</Tag>,
            },
            {
                title: '内容简述',
                dataIndex: 'content',
                key: 'content',
            },
            {
                title: '所属库',
                dataIndex: 'kname',
                key: 'kname',
            },
            {
                title: '用户操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Tag color="red" onClick={() => this.mod(record)}>
                            修改
                        </Tag>
                        <Divider type="vertical" />
                        <Tag color="red" onClick={() => this.del(record.docid)}>
                            删除
                        </Tag>
                    </span>
                ),
            },
        ],
        data: [],
        knamelist: [],
        visible: false,
        confirmLoading: false,
        title: '',
        content: '',
        docid: '',
        kname: '选择知识库',
        belong: '',
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        const { title, content, belong, docid } = this.state;
        const param = { title, content, belong, docid };
        console.log(param);
        this.$axios('post', '/moddoc', param).then(res => {
            notification['success']({
                message: '友情提示',
                description: res.data.msg,
                duration: 1.5,
            });
            this._getlist();
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

    _getlist() {
        this.$axios('get', '/doclist').then(res => {
            console.log(res);
            this.setState({
                data: res.data.data,
            });
        });
    }
    _getKnowName() {
        this.$axios('get', '/getkname').then(res => {
            this.setState({
                knamelist: res.data.data,
            });
        });
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    };
    componentDidMount() {
        this._getlist();
        this._getKnowName();
    }
    del(docid) {
        const _this = this;
        confirm({
            title: '确定要删除吗?',
            content: '人生建议，保留下来哦！',
            okText: '滚',
            okType: 'danger',
            cancelText: '再想想',
            onOk() {
                _this.$axios('post', '/deldoc', { docid }).then(res => {
                    _this._getlist();
                    notification['success']({
                        message: '友情提示',
                        description: res.data.msg,
                        duration: 1.5,
                    });
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    //修改
    mod(data) {
        this.setState({
            docid: data.docid,
            title: data.title,
            content: data.content,
            kname: data.kname,
            belong: data.kid,
        });
        this.showModal();
    }
    selectChange(value, key) {
        this.setState({
            [key]: value,
        });
    }
    inputChange(e, key) {
        this.setState({
            [key]: e.target.value,
        });
    }
    setBelong(kid) {
        this.setState({
            belong: kid,
        });
    }
    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Table
                    rowKey={record => record.docid}
                    columns={this.state.columns}
                    dataSource={this.state.data}
                />
                <Modal
                    title="修改文档"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <label htmlFor="">
                        标题
                        <Input
                            value={this.state.title}
                            onChange={e => this.inputChange(e, 'title')}
                        />
                    </label>
                    <label htmlFor="">内容</label>{' '}
                    <TextArea
                        value={this.state.content}
                        onChange={e => this.inputChange(e, 'content')}
                    />
                    <Select
                        value={this.state.kname}
                        onChange={e => this.selectChange(e, 'kname')}
                        className="select"
                    >
                        {this.state.knamelist.map((i, k) => {
                            return (
                                <Option
                                    key={k}
                                    value={i.kname}
                                    onClick={() => this.setBelong(i.kid)}
                                >
                                    {i.kname}
                                </Option>
                            );
                        })}
                    </Select>
                </Modal>
            </div>
        );
    }
}
