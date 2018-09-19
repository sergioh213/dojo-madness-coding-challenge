import React, {Component} from 'react'
import axios from './axios'

class Fixture extends Component {
    constructor(props) {
        super(props)

        this.state = { editable: true }

    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    render() {
        const { team1, team2, sport, championship, formattedDate, discrepancy, start_time, missing } = this.props.item
        if (!this.state.mounted) {
            return null
        }
        return (
            <div id="view">
                <div id="dim-background" onClick={this.props.toggleShowView}></div>
                <div
                    id="modal"
                >
                    <div id="sub-title">(content editable)</div>
                    <div
                        id="x"
                        className="scale-more"
                        onClick={this.props.toggleShowView}
                        contentEditable={!this.state.editable}
                    >x</div>
                    <div>Date:</div>
                    <div className="highlight" contentEditable={this.state.editable}>{ formattedDate }</div>
                    <div>Match between:</div>
                    <div className="highlight inline-block" contentEditable={this.state.editable}>{ team1 }</div>
                    <div className="inline-block">vs </div>
                    <div className="highlight inline-block" contentEditable={this.state.editable}>{ team2 }</div>
                    <div>Championship:</div>
                    <div className="highlight" contentEditable={this.state.editable}>{ championship }</div>
                    <div>Sport:</div>
                    <div className="highlight" contentEditable={this.state.editable}>{ sport }</div>
                    { discrepancy &&
                        <div className="discrepancy">
                            {`Discrepancy at: `}
                            <div
                                className="bold"
                                contentEditable={this.state.editable}>{`${discrepancy[0][0]}`}
                            </div>
                            {`, says `}
                            <div
                                className="bold"
                                contentEditable={this.state.editable}>{`${discrepancy[0][1]} `}
                            </div>
                            {`instead of `}
                            <div
                                className="bold"
                                contentEditable={this.state.editable}>{`${discrepancy[0][2]}`}
                            </div>
                        </div>
                    }
                    { missing && <div className="discrepancy">{ missing }</div> }
                </div>
            </div>
        )
    }
}

export default Fixture
