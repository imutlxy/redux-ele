import React, {Component} from 'react';
import classNames from 'classnames';

import './style/index.scss';

/**
 * 搜索页通用条件按钮
 */
export default class CommonButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orientation: ['asc', 'desc'].includes(props.className.toLowerCase()) ? props.className : 'asc'
        };
    }

    switchOrientation = () => {
        const orientation = this.state.orientation === 'asc' ? 'desc' : 'asc';
        this.setState({orientation}, () => {
            this.props.onChange(this.props.keyWord, orientation);
        });
    }

    render() {
        const {text, className, hidden} = this.props;
        const orientationClassNames = classNames({
            'fa': true,
            'fa-sort-asc': this.state.orientation === 'asc',
            'fa-sort-desc': this.state.orientation === 'desc'
        });
        return (
            <div onClick={this.switchOrientation} className={`wrap-common-btn ${className || ''}`}>
                <span>{text}</span>
                <i style={{display: !hidden ? 'inline-block' : 'none', flex: !hidden ? '1' : '0'}} className={orientationClassNames}/>
            </div>
        );
    }
}

CommonButton.defaultProps = {
    keyWord: '',
    text: '',
    className: '',
    orientation: 'asc',
    onChange: () => {}
};
