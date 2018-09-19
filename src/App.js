import React, {Component} from 'react'
import axios from './axios'
import Fixture from './Fixture'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.getPrimary = this.getPrimary.bind(this)
        this.getSecondary = this.getSecondary.bind(this)
        this.processData = this.processData.bind(this)
        this.catchDiscrepancies = this.catchDiscrepancies.bind(this)
        this.orderByDate = this.orderByDate.bind(this)
    }
    componentDidMount() {
        this.getPrimary()
            .then(() => {
                this.getSecondary()
                    .then(() => {
                        this.catchDiscrepancies()
                            .then(() => {
                                this.orderByDate()
                            })
                    })
            })
    }
    async getPrimary() {
        await axios.get("/primary.json").then(resp => {
            this.setState({
                primary: resp.data
            })
        })
    }
    async getSecondary() {
        await axios.get("/secondary.json").then(resp => {
            this.setState({
                secondary: resp.data
            })
        })
    }
    processData(item, n) {
        item.id = n
        var newDate = new Date(item.start_time)
        var minutes = newDate.getMinutes() + ""
        if (minutes <= 1 ) {
            minutes = 0 + minutes
        }
        item.formattedDate = ("" +
            newDate.getDay() +
            "/" +
            newDate.getMonth() +
            "/" +
            (newDate.getYear() + 1900 )+
            " at " +
            newDate.getHours() +
           ":" +
            minutes
            )
        return item
    }
    async catchDiscrepancies() {
        const primaryClone = this.state.primary
        const secondaryClone = this.state.secondary
        for (var i = 0; i < primaryClone.length; i++) {
            this.processData(primaryClone[i], i)
            for (var j = 0; j < secondaryClone.length; j++) {
                this.processData(secondaryClone[j], j)
            }
            for (var key in primaryClone[i]) {
                if (key !== "formattedDate") {
                    if (primaryClone[i][key] !== secondaryClone[i][key]) {
                        primaryClone[i].discrepancy = []
                        primaryClone[i].discrepancy.push([key, secondaryClone[i][key], primaryClone[i][key]])
                    }
                }
            }
        }
        this.setState({ primary: primaryClone, secondary: secondaryClone, filtered: true })
    }
    async orderByDate() {
        const primaryClone = await this.state.primary.sort((a, b) => {
            return a.start_time - b.start_time
        });
        this.setState({ primary: primaryClone, ordered: true })
    }
    render() {
        if (!this.state.ordered) {
            return null
        }
        return (
            <div id="app">
                <img id="logo" src="/dojo.jpg" alt=""/>
                <div id="title">Upcoming Fixtures</div>
                <div id="sub-title">(by date ascending)</div>
                { this.state.message && <div id="message">All fixtures have a double</div> }
                { this.state.warning && <div id="warning">{ this.state.warning }</div> }
                <div id="grid">
                    { this.state.primary.map(item => {
                        return (
                            <Fixture key={item.id} item={item} />
                        )
                    }) }
                </div>
            </div>
        )
    }
}

export default App
