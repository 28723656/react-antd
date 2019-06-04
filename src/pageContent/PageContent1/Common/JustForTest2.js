import React,{Component} from 'react'
import {Input} from "antd";


/**
 * 接收一个  {initialValue:'口吐芬芳'}    返回 '口吐芬芳'
 */
class JustForTest extends Component{

    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return nextProps.value
        }
        return null;
    }

    // 官方推荐用这个 state，我日，本来不想用的
    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            text: value|| 'rnm',
        };
    }


    handleNumberChange = e => {
        const text = e.target.value ;
        this.setState({ text });
        // 调用这个的时候，会调用getDerivedStateFromProps，然后看那个方法里面的return
        this.props.onChange(text);
    };


    render() {

        const {text} = this.state;
        return (
            <Input
                value={text}
                onChange={this.handleNumberChange}/>
        )
    }
}

export  default  JustForTest;
