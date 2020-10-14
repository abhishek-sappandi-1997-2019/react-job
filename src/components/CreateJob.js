import React, { Component } from 'react'
import {connect} from 'react-redux'
import {startAddJob} from '../actions/jobAction'
import { Modal, Button , DatePicker, Space } from 'antd';

class CreateJob extends Component {
    constructor(){
        super()
        this.state = {
            jobid : '',
            description : '',
            date : '',
            visible : false ,
            bool : false
        }
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
      handleCancel = e => {
        this.setState({
          visible: false,
        });
      };

    handleChange = (e) =>{
        this.setState({ [e.target.name] : e.target.value })
    }
    onChange = (date, dateString) => {
       this.setState({date : dateString})
      }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.setState({bool:true})
        const obj = {
            job_id : this.state.jobid,
            description : this.state.description,
            date : this.state.date
        }
        console.log(obj);
        if(obj.job_id && obj.description && obj.date){
            this.setState({visible:false})
            this.props.dispatch(startAddJob(obj))
            this.setState({jobid:'',description:'',date:'' , bool:false})
        }
        else {
            this.setState({bool : true})
        }
    }

    render() {
        return (
            <div align='center' style={{padding : '10px'}}>
                <Button  type="primary" onClick={this.showModal}>+ Add Job</Button>
                
                
                <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
                >

                <form onSubmit={this.handleSubmit}>

                <label>JobId :</label>&nbsp;
                <input
                    type='text'
                    name='jobid'
                    placeholder='enter the job_id'
                    value={this.state.jobid}
                    onChange={this.handleChange}
                /><br/>
                {(this.state.bool && this.state.jobid.length < 1 ) && <small style={{color : 'red'}}>*please enter jobid</small>}
                <br/><br/>
                

                <label>Details :</label>&nbsp;
                <textarea
                    rows="3" cols="50"
                    type='text'
                    name='description'
                    placeholder='enter the description'
                    value={this.state.description}
                    onChange={this.handleChange}
                /><br/>
                {(this.state.bool && this.state.description.length < 1 ) && <small style={{color : 'red'}}>*please enter description</small>}
                <br/><br/>

                <label>Date :</label>&nbsp;
                <DatePicker onChange={this.onChange} />
                <br/>
                {(this.state.bool && this.state.date.length < 1 ) && <small style={{color : 'red'}}>*please enter date</small>}

                </form>

                </Modal>


            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        job : state.job
    }
}
export default connect(mapStateToProps)(CreateJob)