import React, { Component } from 'react'
import CreateJob from './components/CreateJob'
import ListJobs from './components/ListJobs'

class App extends Component {
    render() {
        return (
            <div>
                <CreateJob/>
                <ListJobs/>
            </div>
        )
    }
}
export default App