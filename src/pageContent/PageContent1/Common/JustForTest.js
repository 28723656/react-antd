import React,{Component} from 'react'
import {Input} from "antd";


/**
 * 接收一个   {initialValue:{text:'口吐芬芳'}}    返回  {text:'口吐芬芳'}
 */
class JustForTest extends Component{

    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }

    constructor(props) {
        super(props);

        const value = props.value || {};
        this.state = {
            text: value.text || 'rnm',
        };
    }


    handleNumberChange = e => {
        const text = e.target.value ;
        console.log(text)

        if (!('value' in this.props)) {
            this.setState({ text });
        }
        this.triggerChange({ text });
    };

    triggerChange = changedValue => {
        // Should provide an event to pass value to Form.
        const {onChange} = this.props;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    };


    render() {

        const state = this.state;

        return (
          <Input
              value={state.text}
              onChange={this.handleNumberChange}/>
        )
    }
}

export  default  JustForTest;
