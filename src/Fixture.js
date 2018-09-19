import React, {Component} from 'react'
import axios from './axios'
import View from './View'

class Fixture extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showView: false
        }

        this.toggleShowView = this.toggleShowView.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    toggleShowView() {
        this.setState({ showView: !this.state.showView })
    }
    render() {
        const { team1, team2, sport, championship, formattedDate, discrepancy, start_time, duplicate } = this.props.item
        if (!this.state.mounted) {
            return null
        }
        return (
            <div className="wrapper">
                <div className="box shadow scale" onClick={this.toggleShowView}>
                    <div>Date:</div>
                    <div className="highlight">{ formattedDate }</div>
                    <div>Match between:</div>
                    <div className="highlight inline-block">{ team1 }</div>
                    <div className="inline-block">vs </div>
                    <div className="highlight inline-block">{ team2 }</div>
                    <div>Championship:</div>
                    <div className="highlight">{ championship }</div>
                    { discrepancy &&
                        <div className="discrepancy">
                            Discrepancy in data found
                        </div>
                    }
                    {/*{ duplicate ?
                        <div className="discrepancy">
                            Has pair
                        </div> :
                        <div className="discrepancy">
                            Missing pair
                        </div>
                    }*/}
                </div>
                { this.state.showView &&
                    <View item={this.props.item}
                        toggleShowView={this.toggleShowView}
                    />
                }
            </div>
        )
    }
}

export default Fixture
