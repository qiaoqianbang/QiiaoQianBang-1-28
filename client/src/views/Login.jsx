import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col, Radio } from 'antd';
import { setSession } from '../utils/mySession';

class Login extends Component {
    state = {
        flag: true,
        vaule: '',
    };
    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const param = {
                    username: values.username,
                    password: this.$md5(values.password),
                    utype: this.state.value,
                };
                let url = this.state.flag ? '/login' : '/register';
                this.$axios('post', url, param).then(res => {
                    if (res.data.code === 1) {
                        if (res.data.type === 'login') {
                            setSession('token', res.data.token);
                            setSession('user', res.data.username);
                            setSession('utype', res.data.utype);
                            this.props.history.push('/home/doclist');
                            return;
                        }
                        if (res.data.type === 'register') {
                            if (window.confirm('是否跳转登陆')) {
                                this.setState({
                                    flag: true,
                                });
                            }
                        }
                    } else {
                        alert(res.data.msg);
                    }
                });
            }
        });
    };
    ToRegister() {
        this.setState({ flag: false });
    }
    ToLogin() {
        this.setState({ flag: true });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row>
                <Col xs={{ span: 10, offset: 6 }} sm={{ span: 10, offset: 6 }}>
                    {this.state.flag ? (
                        <h3 className="center">
                            登陆 <small>LOGIN IN</small>
                        </h3>
                    ) : (
                        <h3 className="center">
                            注册 <small>REGISTER</small>
                        </h3>
                    )}
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户账号!' }],
                            })(
                                <Input
                                    prefix={
                                        <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                    placeholder="Username"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入用户密码!' }],
                            })(
                                <Input
                                    prefix={
                                        <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>

                        {this.state.flag ? (
                            ''
                        ) : (
                            <Radio.Group onChange={this.onChange} value={this.state.value}>
                                <Radio value={'v1'}>v1</Radio>
                                <Radio value={'v2'}>v2</Radio>
                            </Radio.Group>
                        )}

                        <Form.Item className="center">
                            {this.state.flag ? (
                                <div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                    >
                                        登陆
                                    </Button>
                                    <span
                                        className="fontstyle ml15"
                                        onClick={() => this.ToRegister()}
                                    >
                                        没有账号？去注册
                                    </span>
                                </div>
                            ) : (
                                <div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                    >
                                        注册
                                    </Button>
                                    <span className="fontstyle ml15" onClick={() => this.ToLogin()}>
                                        有账号?去登陆
                                    </span>
                                </div>
                            )}
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}
export default Form.create({ name: 'normal_login' })(Login);
