import React, { Component } from 'react'

class Controller extends Component {
    constructor(props) {
        super(props)
        this.handleController = this.handleController.bind(this)
    }

    componentDidMount() {
        window.addEventListener('keypress',
            (e) => (this.handleController(e.key))
        )
    }
    
    handleController(dir) {
        console.log(dir);
        switch (dir) {
            case ('up' || 'w'):
                break;
            case ('down' || 's'):
                break;
            case ('left' || 'a'):
                break;
            case ('right' || 'd'):
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="controller">
                <div className="top">
                    <button onClick={this.handleController('up')}>
                        <span className="fa fa-angle-double-up"></span>
                    </button>
                </div>
                <div className="center">
                    <button onClick={this.handleController('left')}>
                        <span className="fa fa-angle-double-left"></span>
                    </button>
                    <button onClick={this.handleController('right')}>
                        <span className="fa fa-angle-double-right"></span>
                    </button>
                </div>
                <div className="bottom">
                    <button onClick={this.handleController('down')}>
                        <span className="fa fa-angle-double-down"></span>
                    </button>
                </div>
            </div>
        )
    }
}

export { Controller }