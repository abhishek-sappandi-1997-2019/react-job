import axios from 'axios'

export const getjobs = (cart) =>{
    return {type:'GET_JOBS' ,payload:cart}
}
export const addjob = (cart) =>{
    return {type:'ADD_JOBS' ,payload:cart}
}
export const update = (_id ,obj) =>{
    return {type:'UPDATE' , payload:{_id,obj}}
}
export const remove = (id) =>{
    return {type:'REMOVE' , payload:id}
}

export const startGetjob = () =>{
    return (dispatch) =>{
        axios.get(`https://node-havi-jobs.herokuapp.com/job/`)
        .then((response)=>{
            const job = response.data
            console.log(job);
            if(job){
                dispatch(getjobs(job))
            }
        })
        .catch((error)=>[
            alert(error.message)
        ])
    }
}
export const startAddJob = (obj)=>{
    return (dispatch) =>{
        axios.post(`https://node-havi-jobs.herokuapp.com/job`,obj)
        .then((response)=>{
            const job = response.data
            console.log(job);
            if(!job.errors){
                dispatch(addjob(job))
            }
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
}
export const startUpdateJob = (_id,obj) =>{
    return (dispatch)=>{
        axios.put(`https://node-havi-jobs.herokuapp.com/job/${_id}`,obj)
        .then((response)=>{
            const job = response.data
            if(!job.errors){
                dispatch(update(_id,job))
            }
        })
        .catch((error)=>{
            alert(error.message)
        })
    }
}
export const startRemoveJob = (id) =>{
    return (dispatch)=>{
        axios.delete(`https://node-havi-jobs.herokuapp.com/job/${id}`)
        .then((response)=>{
            const job = response.data
            if(!job.errors){
                dispatch(remove(id))
            }
        })
        .catch((error)=>{
            alert(error.message)
        })
    }
}