import React, { Component } from 'react'
import {connect} from 'react-redux'
import {startGetjob,startUpdateJob,startRemoveJob} from '../actions/jobAction'
import { Collapse, Modal ,DatePicker ,Button ,Pagination } from 'antd';

const { Panel } = Collapse;


class ListJobs extends Component {
    constructor(){
        super()
        this.state = {
            jobid : '',
            description : '',
            date : '',
            visible : false ,
            bool : false,
            search : '',
            pagesize : 5,
            pagenumber : 1
        }
    }
    componentDidMount(){
        if(this.props.job.length === 0){
            this.props.dispatch(startGetjob())
        }
    }
    handleDelete = (id) => {
        const validate = window.confirm("Are You Sure ....?")
        if(validate){
            this.props.dispatch(startRemoveJob(id))
        }
        
    }
    callback =(key) =>{
        //console.log(key);
      }
      showModal = (ele) => {
        this.setState({
            jobid : ele.job_id,
            description : ele.description,
            date : ele.date ,
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
    handleSubmit = (id ,e) =>{
        e.preventDefault()
        console.log(id);
        const obj = {
            job_id : this.state.jobid,
            description : this.state.description,
            date : this.state.date
        }
        //console.log(obj);
        if(obj.job_id && obj.description && obj.date){
            this.setState({visible:false})
            this.props.dispatch(startUpdateJob(id ,obj))
            this.setState({jobid:'',description:'',date:'' , bool:false})
        }
        else {
            this.setState({bool : true})
        }
    }

    filter = () => {
        if(this.state.search.length > 0){
            return this.props.job.filter(ele => 
                                    ele.job_id.includes(this.state.search) || 
                                    ele.description.includes(this.state.search) 
                                    )
        }
        else {
            return this.props.job
        }
    }
    handleChangePage = (action ,e) => {
        if(action === 'inc'){
            this.setState((prevState) => ({
                pagenumber: prevState.pagenumber + 1
              }));
        }
        else if(action === 'dec'){
            this.setState((prevState) => ({
                pagenumber: prevState.pagenumber - 1
              }));
        }

      }
    render() {
        return (
            <div align='center'>
                <input
                    type='text'
                    name='search'
                    placeholder='search title / description'
                    value={this.state.search}
                    onChange={this.handleChange}
                /><br/>
                <h2>No. of Jobs - {this.props.job.length} </h2> <br/>
                <Collapse defaultActiveKey={['1']} onChange={this.callback} style={{width : '500px'}} >
                    {
                        (this.filter())
                        .slice(
                                (this.state.pagenumber - 1 ) * this.state.pagesize , 
                                this.state.pagenumber * this.state.pagesize
                            ).map(ele => {
                            return (
                                <>
                                <Panel header={ele.job_id} key={ele._id} >
                                <p align='left'><b>Description</b> :- {ele.description}</p>
                                <p align='left'><b>Date</b>        :- {ele.date}</p>
                                <Modal
                                title="Basic Modal"
                                visible={this.state.visible}
                                onOk={(e)=>{this.handleSubmit(ele._id,e)}}
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
                                <Button type="primary" onClick={()=>{this.showModal(ele)}}>edit</Button>
                                <Button type="primary" onClick={()=>{this.handleDelete(ele._id)}} danger>delete</Button>
                                </Panel>
                                </>
                            )
                        })
                    }

                </Collapse>
                <h2>Current page = {this.state.pagenumber}</h2>
                <Button 
                    disabled={this.state.pagenumber <= 1} 
                    onClick={(e)=>{this.handleChangePage('dec',e)}}
                    type="primary"
                >
                    Prev
                </Button>
                <Button 
                    disabled={this.state.pagenumber >= Math.ceil(this.props.job.length / this.state.pagesize)} onClick={(e)=>{this.handleChangePage('inc',e)}}
                    type="primary"
                    >
                    next
                </Button>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        job : state.job
    }
}
export default connect(mapStateToProps)(ListJobs)