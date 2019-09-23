import React, {Component} from 'react'
import {Button, Card, List, Modal, Tabs, Typography,Row,Col,message} from "antd";
import SmallTable from "../../components/Table/SmallTable";
import UpdateUserModal from '../../pageContent/Admin/UpdateUserModal'
import UpdateRoleModal from '../../pageContent/Admin/UpdateRoleModal'
import UpdateMenuModal from '../../pageContent/Admin/UpdateMenuModal'
import ModalContent from "../Page2";
import {deleteAjax, getAjax} from "../../util/ajax";
import {getUser} from "../../util/userUtil";

const {TabPane} = Tabs;
const {confirm} = Modal



class Admin extends Component {

    constructor(props){
        super(props)

        this.initValue = this.initValue.bind(this)

        this.state = {
            visibleMenu: false,
            visibleRole: false,
            visibleUser: false,
            userEntity:null,
            roleEntity:null,
            titleUser:'修改用户',
            titleRole:'修改角色',
            titleMenu:'修改菜单',

            userData:[],
            roleData:[],
            menuData:[],

            roleList:[],
            menuList:[],

            userListByRoleId:[],
            roleListByMenuId:[],

            type:1   // 1-修改  2-添加  3-查看
        }
    }





    // 取消
    handleCancel = (type) => {
        if(type === 'user'){
            this.setState({ visibleUser: false, });
        }else if(type === 'role'){
            this.setState({ visibleRole: false, });
        }else if(type === 'menu'){
            this.setState({ visibleMenu: false, });
        }

    };
    // 修改
    handleUpdate = (record,type) =>{
        if(type === 'user'){
            this.setState({ visibleUser: true,userEntity:record,titleUser:'修改用户',type:1});
        }else if(type === 'role'){
            this.setState({ visibleRole: true,roleEntity:record,titleRole:'修改角色',type:1});
        }else if(type === 'menu'){
            this.setState({ visibleMenu: true,menuEntity:record,titleMenu:'修改权限',type:1});
        }
    }

    // 添加
    handleAdd =(type) =>{
        if(type === 'user'){
            this.setState({ visibleUser: true,userEntity:null,titleUser:'新增用户',type:2});
        }else if(type === 'role'){
            this.setState({ visibleRole: true,roleEntity:null,titleRole:'新增角色',type:2});
        }else if(type === 'menu'){
            this.setState({ visibleMenu: true,menuEntity:null,titleMenu:'新增菜单',type:2});
        }
    }

    // 删除
    handleDelete =(id,type) =>{
        const user =getUser();
        let url =''
        let name=''
        if(type === 'user'){
            url=`/admin/user/${id}`
            name='用户'
        }else if(type === 'role'){
            url=`/admin/role/${id}`
            name='角色'
        }else if(type === 'menu'){
            url=`/admin/menu/${id}`
            name='菜单'
        }
        confirm({
            title: `确定删除该${name}?`,
            content: '手下留情！',
            okText:'确定',
            cancelText:'取消',
            onOk: () => {
                if(user.id === 1){
                    deleteAjax(url).then(response =>{
                        const  result = response.data;
                        if(!result.flag){
                            message.error(result.message);
                        }else {
                            //
                            this.initValue()
                        }
                    });
                }else {
                    message.error('抱歉，不是所有的管理员都删除的')
                }

            },
            onCancel() {
                console.log('取消');
            },
        });
    }

    // 角色查看
    handleSee =(record,type) =>{
       if(type === 'role'){
            this.setState({ visibleRole: true,roleEntity:record,titleRole:'查看角色下的用户',type:3});
        }else if(type === 'menu'){
            this.setState({ visibleMenu: true,menuEntity:record,titleMenu:'查看拥有该菜单的角色',type:3});
        }
    }

    initValue =() =>{
        getAjax('/admin/user')
            .then(response =>{
                const  result = response.data;
                if(result.flag){
                    this.setState({userData:result.data})
                }
            });
        getAjax('/admin/role')
            .then(response =>{
                const  result = response.data;
                if(result.flag){
                    this.setState({roleData:result.data})
                }
            });
        getAjax('/admin/menu')
            .then(response =>{
                const  result = response.data;
                if(result.flag){
                    this.setState({menuData:result.data,menuList:result.data})
                }
            });

        // 获取role列表
        getAjax('/admin/role/list')
            .then(response =>{
                const  result = response.data;
                if(result.flag){
                    this.setState({roleList:result.data})
                }
            });
        //  通过role获取角色
        getAjax('/admin/user/user')
            .then(response =>{
                const  result = response.data;
                if(result.flag){
                    this.setState({userListByRoleId:result.data})
                }
            });

        // 通过menu获取role
        getAjax('/admin/role/role')
            .then(response =>{
                const  result = response.data;
                if(result.flag){
                    this.setState({roleListByMenuId:result.data})
                }
            });


    }

    componentDidMount() {
        this.initValue();
    }


    render() {

        // 用户数据
        const userColumns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'phone',
            },
            {
                title: '昵称',
                dataIndex: 'nickName',
            },
            {
                title: '操作',
                render: (value, record) => {
                    return <div>
                        <a onClick={() => this.handleUpdate(record,'user')}>修改 &nbsp;&nbsp;</a>
                        <a onClick={() => this.handleDelete(record.id,'user')}>删除 &nbsp;&nbsp;</a>
                    </div>
                }
            },
        ];
        // const userData = [
        //     {
        //         id: 1,
        //         phone: '13232323232',
        //         nickName: '风往西边吹丶',
        //         roleId:1
        //     },
        //     {
        //         id: 2,
        //         phone: '13456789087',
        //         nickName: '普通用户丶',
        //         roleId:2
        //     },
        //     {
        //         id: 3,
        //         phone: '13456474578',
        //         nickName: '我是高级用户',
        //         roleId:3
        //     },
        // ];

        // 角色 数据
        const roleColumns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                align: 'center',
                render: (value, record) => {
                    return <div>
                        <a onClick={() => this.handleSee(record,'role')}>查看 &nbsp;&nbsp;</a>
                        <a onClick={() => this.handleUpdate(record,'role')}>修改 &nbsp;&nbsp;</a>
                        <a onClick={() => this.handleDelete(record.id,'role')}>删除 &nbsp;&nbsp;</a>
                    </div>
                }
            },
        ];
        // const roleData = [
        //     {
        //         id: 1,
        //         name: '管理员',
        //         description: '这是管理员的',
        //         menuId:[1,2,3,4]
        //     },
        //     {
        //         id: 2,
        //         name: '普通用户',
        //         description: '这是普通用户的',
        //         menuId:[1,4]
        //     },
        //     {
        //         id: 3,
        //         name: '高级用户',
        //         description: '这是高级用户的',
        //         menuId:[1,2,4]
        //     },
        // ];
        // 角色 数据
        const menuColumns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '菜单名称',
                dataIndex: 'description',
            },
            {
                title: '操作',
                render: (value, record) => {
                    return <div>
                        <a onClick={() => this.handleSee(record,'menu')}>查看 &nbsp;&nbsp;</a>
                        <a onClick={() => this.handleUpdate(record,'menu')}>修改 &nbsp;&nbsp;</a>
                        <a onClick={() => this.handleDelete(record.id,'menu')}>删除 &nbsp;&nbsp;</a>
                    </div>
                }
            },
        ];
        // const menuData = [
        //     {
        //         id: 1,
        //         name: 'plan',
        //         description: '计划界面',
        //     },
        //     {
        //         id: 2,
        //         name: 'TV',
        //         description: '动漫界面',
        //     },
        //     {
        //         id: 3,
        //         name: 'log',
        //         description: '开发日志',
        //     },
        //     {
        //         id: 4,
        //         name: 'statistics',
        //         description: '计划统计',
        //     },
        //     {
        //         id: 5,
        //         name: 'admin',
        //         description: '系统管理',
        //     },
        // ];

        const {userEntity,roleEntity,menuEntity,
            visibleUser,visibleRole,visibleMenu,
            titleUser,titleRole,titleMenu,
        userData,roleData,menuData,
        roleList,menuList,
            userListByRoleId,roleListByMenuId,
        type} = this.state;

    /*    console.log('userData',userData)
        console.log('roleData',roleData)
        console.log('menuData',menuData)*/

        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="用户管理" key="1">
                      <Button type='primary' onClick={() =>this.handleAdd('user')}  >+添加</Button>
                    {userData && userData.length > 0 &&
                    <SmallTable columns={userColumns} dataSource={userData}/>
                    }
                    <Modal
                        title={titleUser}
                        visible={visibleUser}
                        onOk={this.handleOk}
                        onCancel={() => this.handleCancel('user')}
                        footer={null}
                        destroyOnClose={true}
                    >
                        <UpdateUserModal handleCancel={() => this.handleCancel('user')} data={userEntity} roleList={roleList} initValue={this.initValue} type={type} />
                    </Modal>
                </TabPane>
                <TabPane tab="角色管理" key="2" style={{margin:5}} >
                    <Button type='primary' onClick={() =>this.handleAdd('role')}  >+添加</Button>
                    <SmallTable columns={roleColumns} dataSource={roleData}/>
                    <Modal
                        title={titleRole}
                        visible={visibleRole}
                        onOk={this.handleOk}
                        onCancel={() => this.handleCancel('role')}
                        footer={null}
                        destroyOnClose={true}
                    >
                        <UpdateRoleModal handleCancel={() => this.handleCancel('role')} data={roleEntity} menuList={menuList} userListByRoleId={userListByRoleId} initValue={this.initValue} type={type} />
                    </Modal>
                </TabPane>
                <TabPane tab="权限菜单" key="3">
                    <Button type='primary' onClick={() =>this.handleAdd('menu')}  >+添加</Button>
                    <SmallTable columns={menuColumns} dataSource={menuData}/>
                    <Modal
                        title={titleMenu}
                        visible={visibleMenu}
                        onCancel={() =>this.handleCancel('menu')}
                        footer={null}
                        destroyOnClose={true}
                    >
                        <UpdateMenuModal handleCancel={() =>this.handleCancel('menu')} data={menuEntity} roleListByMenuId={roleListByMenuId} initValue={this.initValue} type={type} />
                    </Modal>
                </TabPane>
            </Tabs>
        )
    }
}

export default Admin
