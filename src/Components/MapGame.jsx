import React from 'react'
import { Map } from "./Map"
import { Snake } from './Snake'
import { Player } from './SnakeGame'
import { handleController } from './Handler'

class MapGame extends React.Component {
    constructor(props) {
        super(props)
        let initSnake = new Snake('3d4ca1', '#00FF00', 'L', [13, 12])
        var game = new Player(initSnake)
        game.start()
    }

    componentDidMount() {
        window.addEventListener('keypress',
            (e) => (
                handleController(sa, e.key, timer)
            )
        )
    }

    componentWillUnmount() {
        window.removeEventListener('keypress',
            (e) => (
                handleController(sa, e.key, timer)
            )
        )
    }

    render() {
        return <Map />
    }
}

export { MapGame }