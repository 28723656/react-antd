import { Table } from 'antd';
import React,{Component} from 'react'
import PropTypes from 'prop-types'


const initColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const initData = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];

const initTitle='表格标题'




class SmallTable extends Component{

    static propTypes = {
        title:PropTypes.string,
        columns: PropTypes.array,
        dataSource: PropTypes.array,
    }


    render() {
        let {title,columns,dataSource} = this.props;
        //如果为空，就用默认的
        title = title===undefined?initTitle:title;
        columns = columns===undefined?initColumns:columns;
        dataSource = dataSource===undefined?initData:dataSource;

        return (
            <div>
                <Table rowKey='id' columns={columns} dataSource={dataSource} size="middle"
                       pagination={{
                           hideOnSinglePage:true,
                           pageSize:30
                       }}
                       scroll={{x: '100%'}}
                />
            </div>
        )
    }
}








export  default SmallTable
