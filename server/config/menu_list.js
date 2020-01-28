/*
 * @Author: Bang
 * @Date: 2020-01-09 19:27:33
 * @LastEditTime : 2020-01-11 14:06:12
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
module.exports = {
    1: {
        iconType: 'file',
        classType: '文档管理',
        key: 1,
        name: '文档列表',
        path: '/home/doclist',
    },
    2: {
        iconType: 'file',
        classType: '文档管理',
        key: 2,
        name: '创建文档',
        path: '/home/adddoc',
    },
    3: {
        iconType: 'folder',
        classType: '知识库',
        key: 3,
        name: '知识库列表',
        path: '/home/knowlist',
    },

    4: {
        iconType: 'team',
        classType: '用户管理',
        key: 5,
        name: '用户列表',
        path: '/home/userlist',
    },
};
//
// {
//     key: 'sub1',
//     iconType: 'file',
//     name: '文档管理',
//     sub: [{
//             key: 1,
//             name: '文档列表',
//             path: '/home/doclist',
//         },
//         {
//             key: 2,
//             name: '创建文档',
//             path: '/home/adddoc',
//         },
//     ],
// }, {
//     key: 'sub2',
//     iconType: 'folder',
//     name: '知识库',
//     sub: [{
//             key: 3,
//             name: '知识库列表',
//             path: '/home/knowlist',
//         },
//         {
//             key: 4,
//             name: '添加知识库',
//             path: '/home/konwadd',
//         },
//     ],
// }, {
//     key: 'sub3',
//     iconType: 'team',
//     name: '用户管理',
//     sub: [{
//         key: 5,
//         name: '用户管理',
//         path: '/home/userlist',
//     }, ],
// },