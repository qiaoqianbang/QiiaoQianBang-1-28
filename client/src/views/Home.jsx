import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import RouterMap from '../router/map';
import { getSession } from '../utils/mySession';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Home extends Component {
    state = {
        collapsed: false,
        menuList: [],
    };
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    };
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };
    ChangeRouter(path) {
        this.props.history.push(path);
    }
    Quit() {
        this.props.history.push('/login');
        sessionStorage.clear();
    }
    componentDidMount() {
        this.$axios('post', '/menulist').then(res => {
            this.setState({
                menuList: res.data.List || [],
            });
        });
    }
    render() {
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
                            {this.state.menuList.map((i, k) => {
                                return (
                                    <SubMenu
                                        key={i.key}
                                        title={
                                            <span>
                                                <Icon type={i.iconType} />
                                                <span>{i.classType}</span>{' '}
                                            </span>
                                        }
                                    >
                                        {i.sub.map((j, index) => {
                                            return (
                                                <Menu.Item
                                                    key={j.key}
                                                    onClick={() => this.ChangeRouter(j.path)}
                                                >
                                                    {j.name}
                                                </Menu.Item>
                                            );
                                        })}
                                    </SubMenu>
                                );
                            })}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <span className="header">
                                {getSession('utype')} 用户 {getSession('user')}
                            </span>
                            丨
                            <span className="span" onClick={() => this.Quit()}>
                                退出
                            </span>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <RouterMap routes={this.props.routes} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>By bang</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
