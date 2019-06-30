import React,{Component} from 'react'
import { DatePicker } from "antd";
import moment from 'moment';
import locale from "antd/lib/date-picker/locale/zh_CN";

moment.locale('zh-cn');
class YearPicker extends Component {
    state = {
        value: null,
        open: false
    };

    setOpenState = () => {
        this.setState({
            open: !this.state.open
        });
    };

    changeValue = v => {
        this.setState({
            value: v
        });
    };

    changeRender = v => {
        this.setState({
            value: v,
            open: false
        });
    };

    test = () => {
        console.log("test");
    };

    render() {
        const { open } = this.state;
        if (!open)
            return (
                <DatePicker
                    mode="year"
                    format="YYYY"
                    value={this.state.value}
                    onChange={this.changeValue}
                    onPanelChange={this.changeRender}
                    onOpenChange={this.setOpenState}
                    open={open}
                    locale={locale}
                    placeholder="选择年"
                />
            );
        else {
            return (
                <DatePicker
                    mode="year"
                    format="YYYY"
                    value={this.state.value}
                    onChange={this.changeValue}
                    onPanelChange={this.changeRender}
                    open={open}
                    locale={locale}
                    placeholder="选择年"
                />
            );
        }
    }
}

export default YearPicker
