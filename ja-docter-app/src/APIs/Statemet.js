import axios from "axios"


const baseURL = "http://43.200.184.226/api"
const axiosInstance = axios.create({
    // baseURL: 'your_base_url_here',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

// GET APIs

/**
 * @param NONE
 * @return
 * user의 Statement리스트를 리턴한다!!!
 * 실패시 콘솔창에 실패메시지 + error코드 뜸
 */
const getStatementList = () =>{
    const apiURL = baseURL + `/statement/`

    axiosInstance.get(apiURL)
    .then(response =>{
        return(response.data)
    }    
    )
    .catch(error => {
        console.log(error)
        console.log('getStatementList 실패!!!')
    })
}
/**
 * @param statementID (num)
 * @return
 * parm으로 받은 statementID에 해당하는statment를 리턴한다!!!
 * 실패시 콘솔창에 실패메시지 + error코드 뜸
 */
const getStatement = (statementID) => {
    const apiURL = baseURL + `/statement/${statementID}/`

    axiosInstance.get(apiURL)
    .then(response =>{
        return(response.data)
    }    
    )
    .catch(error => {
        console.log(error)
        console.log('getStatement 실패!!!')
    })
}
/**
 * @param statementID (num)
 * @return
 * parm으로 받은 statementID에 해당하는statment의 post를 모두 리턴한다!!!
 * 실패시 콘솔창에 실패메시지 + error코드뜸
 */
const getPostList = (statementID) => {
    const apiURL = baseURL + `/statement/${statementID}/post/`

    axiosInstance.get(apiURL)
    .then(response =>{
        return(response.data)
    }    
    )
    .catch(error => {
        console.log(error)
        console.log('getPostList 실패!!!')
    })
}


// PUt APIs

/**
 * 매개변수로 받은 key에 해당하는 post의 content와 versionInfo로 수정함
 * @param statementID 
 * @param postID 
 * @param content 
 * @param versionInfo
 * 
 *  
 */
const updatePost = (statementID, postID, content,versionInfo) => {
    const apiURL = baseURL + `statement/${statementID}/post/${postID}/`;
    const requestData = {
        "content": content,
        "version_info": versionInfo
    }

    axiosInstance.put(apiURL, requestData)
    .then(response =>{
        return(response.data)
    })
    .catch(error => {
        console.log(error)
        console.log('updatePost 실패!!!')
    })
    
}
/**
 * Statement를 update하는 함수
 * 
 * @return 
 * 
 * @param {} statementID 
 * @param {} title 
 * 
 */
const StatementUpdate = (statementID, title) => {
    const apiURL = baseURL + `statement/${statementID}/`;
    const requestData = {
        "title": title
    }

    axiosInstance.put(apiURL, requestData)
    .then(response =>{
        return(response.data)
    })
    .catch(error => {
        console.log(error)
        console.log('updatePost 실패!!!')
    })
}
// Post APIs

/**
 * 
 * @param {*} statementID 
 * @param {*} content 
 * @param {*} versionInfo 
 */
const Createpost = (statementID, content, versionInfo) => {
    const apiURL = baseURL + `/statement/${statementID}/post/`;
    const requestData = {
        "content": content,
        "version_info": versionInfo
    }

    axiosInstance.post(apiURL, requestData)
    .then(response =>{
        return(response.data)
    })
    .catch(error => {
        console.log(error)
        console.log('updatePost 실패!!!')
    })


}

const statementCreate = () => {
    const apiURL = baseURL + `/statement/`;
    
    axiosInstance.post(apiURL)
    .then(response =>{
        return(response.data)
    })
    .catch(error => {
        console.log(error)
        console.log('statementCreate 실패!!!')
    })
    
}
//delete APIs
const deleteStatement = (statementID, title) => {
    const apiURL = baseURL + `/statement/${statementID}/`;
    const requestData = {
        "title": title,
    }

    axiosInstance.post(apiURL, requestData)
    .then(response =>{
        return(response.data)
    })
    .catch(error => {
        console.log(error)
        console.log('statementCreate 실패!!!')
    })
}   

export {getPostList, getStatement, getStatementList,
    updatePost,  StatementUpdate, 
    Createpost, statementCreate, deleteStatement}


