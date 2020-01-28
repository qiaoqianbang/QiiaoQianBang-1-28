/*
 * @Author: Bang
 * @Date: 2020-01-08 11:34:03
 * @LastEditTime : 2020-01-11 14:05:28
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
import Home from '../views/Home';
import Register from '../views/Register';
import Login from '../views/Login';
import DocList from '../views/doc/DocList';
import AddDoc from '../views/doc/AddDoc';
import KnowList from '../views/know/KnowList';

import UserList from '../views/user/UserList';
import React, { Component } from 'react';
import { getSession } from '../utils/mySession';

function RouterHold(COm) {
    class HeightModule extends Component {
        componentDidMount() {
            if (!getSession('user')) {
                this.props.history.push('/login');
                return;
            }
        }

        render() {
            return <COm {...this.props }
            />;
        }
    }
    return HeightModule;
}

export default [{
        path: '/home',
        name: 'home',
        component: RouterHold(Home),
        children: [{
                path: '/home/doclist',
                component: DocList,
            },
            {
                path: '/home/adddoc',
                component: AddDoc,
            },
            {
                path: '/home/knowlist',
                component: KnowList,
            },

            {
                path: '/home/userlist',
                component: UserList,
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
];