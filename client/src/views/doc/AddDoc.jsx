import React, { Component } from 'react';
import { Input, Button, Select } from 'antd';
import wangEditor from 'wangeditor';

const { Option } = Select;

class DocAdd extends Component {
    state = {
        knownList: [],
        kname: '选择知识库',
        kid: '',
        belong: '',
    };

    render() {
        return (
            <div>
                {/* 编译器dom */}
                <div>
                    文档标题
                    <Input type="text" ref="title" />
                </div>

                <div>文档内容</div>
                <div ref="editor"></div>

                <div>所属知识库</div>
                <Select
                    value={this.state.kname}
                    onChange={e => this.selectChange(e, 'kname')}
                    className="select2"
                >
                    {this.state.knownList.map((i, k) => {
                        return (
                            <Option key={k} value={i.kname} onClick={() => this.setBelong(i.kid)}>
                                {i.kname}
                            </Option>
                        );
                    })}
                </Select>
                <Button onClick={() => this.submitData()}>提交</Button>
            </div>
        );
    }
    selectChange(value, key) {
        this.setState({
            [key]: value,
        });
    }
    setBelong(kid) {
        console.log(kid);
        this.setState({
            belong: kid,
        });
    }
    componentDidMount() {
        this.initED();
        this.getInitData();
    }

    //初始化编译器
    initED = () => {
        const ED = new wangEditor(this.refs.editor);
        ED.create();
        //图片转码
        ED.customConfig.uploadImgShowBase64 = true;
        //挂载
        this.ED = ED;
    };

    //请求知识库列表
    getInitData = async () => {
        this.$axios('get', '/getkname').then(res => {
            this.setState({
                knownList: res.data.data,
            });
        });
    };

    //提交数据
    submitData = async () => {
        let subData = {
            title: this.refs.title.input.value,
            content: this.ED.txt.html(),
            belong: this.state.belong,
        };
        console.log(subData);
        //校验非空
        // let res = await this.$http('post', '/adddoc', { subData });
        // alert(res.data.msg);
    };
}

export default DocAdd;
