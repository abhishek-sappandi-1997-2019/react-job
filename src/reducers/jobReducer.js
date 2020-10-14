const initialstate = []
const jobReducer = (state = initialstate ,action) =>{
    switch(action.type){
        case 'GET_JOBS':{
            return [...action.payload]
        }
        case 'ADD_JOBS':{
            return [...state , action.payload]
        }
        case 'UPDATE':{
            return state.map((job)=>{
                if(job._id === action.payload._id){
                    return {...job ,...action.payload.obj}
                }else
                {
                    return {...job}
                }
            })
        }
        case 'REMOVE':{
            return state.filter(e => e._id != action.payload)
        }
        default : {
            return [...state]
        }
    }
}
export default jobReducer