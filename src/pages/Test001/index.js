import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '等级',
                dataIndex: 'rank',
                width: '10%',
            },
            {
                title: '星级',
                dataIndex: 'star',
            },
            {
                title: '花费',
                dataIndex: 'cost',
                editable: true,
            },
            {
                title: '增加金币%',
                dataIndex: 'incCoin',
                editable: true,
            },
            {
                title: '增加经验%',
                dataIndex: 'incExperience',
                editable: true,
            },
            {
                title: '概率下限',
                dataIndex: 'lowPercent',
                editable: true,
            },
            {
                title: '概率上限',
                dataIndex: 'topPercent',
                editable: true,
            },
            {
                title: '概率期望',
                dataIndex:'hopePercent',
                render:(text,record) =>
                    ((record.lowPercent*1+record.topPercent*1)/2).toFixed(2)
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                            <a onClick={() => this.handleDelete(record.key)}>删除</a>
                    ) : null,
            },
        ];

        this.state = {
            dataSource: [
                {
                    key: 0,
                    rank: 1,
                    star:1,
                    cost: 50,
                    incCoin: 6.2,
                    incExperience: 6.2,
                    lowPercent:0.15,
                    topPercent:0.66,
                },
                {
                    key: 1,
                    rank: 2,
                    star:1,
                    cost: 70,
                    incCoin: 6.4,
                    incExperience: 6.4,
                    lowPercent:0.15,
                    topPercent:0.67,
                },
            ],
            count: 2,
            upLowPercent:false,
            loop:0,
            star:1,
        };
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        const {  dataSource } = this.state;
        let {upLowPercent,count,loop,star} = this.state
        count = count + 1;
        upLowPercent =count % 4 === 0
        loop =Math.floor(count /4)
        star = Math.floor((count-1)/10+1)
        const newData = {
            key: count,
            rank: count,
            star,
            cost: 20*count+50,
            incCoin:(count*0.2+6).toFixed(1),
            incExperience: (count*0.2+6).toFixed(1),
            lowPercent:(0.01*loop+0.15).toFixed(2),
            topPercent:(0.01*count+0.65-loop*0.01).toFixed(2),
        };
        console.log(typeof newData.key,typeof newData.lowPercent)
        this.setState({
            dataSource: [...dataSource, newData],
            count: count ,
            upLowPercent:upLowPercent,
            loop:loop,
        });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
        console.log("新数据：",row)
    };

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                  添加一行
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={
                        {
                            pageSize:40,
                            hideOnSinglePage:true
                        }
                    }
                />
            </div>
        );
    }
}

export  default EditableTable
