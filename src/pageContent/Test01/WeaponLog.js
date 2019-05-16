import React,{Component} from 'react'

class WeaponLog extends Component{

    render() {
        const {weaponMsg} = this.props;
        return (
            weaponMsg.length>0 &&
            <div>
                <h2>-----日志------</h2>

                <div>
                    {weaponMsg}
                </div>
            </div>

        )
    }
}

export  default WeaponLog
