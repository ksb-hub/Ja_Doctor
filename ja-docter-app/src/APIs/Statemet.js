import axios from "axios"

const baseURL = "/api"
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
        console.log(response.data)
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
 * @return parm으로 받은 statementID에 해당하는statment를 리턴한다!!!
 * 실패시 콘솔창에 실패메시지 + error코드 뜸
 */
const getStatement = async (statementID) => {
    const apiURL = baseURL + `/statement/${statementID}/`;
    console.log(`요청주소 ${apiURL}`);

    try {
        const response = await axiosInstance.get(apiURL);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        console.log('getStatement 실패!!!');
    }
};
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
        console.log(response.data)
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
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    axiosInstance.put(apiURL, finaldata)
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
const updateStatement = (statementID, title) => {
    const apiURL = baseURL + `statement/${statementID}/`;
    const requestData = {
        "title": title
    }
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    axiosInstance.put(apiURL, finaldata)
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
const createpost = (statementID, content, versionInfo) => {
    const apiURL = baseURL + `/statement/${statementID}/post/`;
    const requestData = {
        "content": content,
        "version_info": versionInfo
    }
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    axiosInstance.post(apiURL, finaldata)
    .then(response =>{
        return(response.data)
    })
    .catch(error => {
        console.log(error)
        console.log('updatePost 실패!!!')
    })


}
/**
 * 
 * @param {*} title 
 * @param {*} content 
 */
const createStatement = (title, content) => {
    const apiURL = baseURL + `/statement/`;
    const requsePost = {
        "content": content
    }
    
    const requestData = {
        "title": title,
        "posts": [requsePost]
    }
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    axiosInstance.post(apiURL, finaldata)
    .then(response =>{
        return(response.data)
    })
    .catch(error => {
        console.log(error)
        console.log('statementCreate 실패!!!')
    })
    
}
//delete APIs
/**
 * Statement를 제거하는 API
 * @param {*} statementID 
 * @param {*} title 
 */
const deleteStatement = (statementID, title) => {
    const apiURL = baseURL + `/statement/${statementID}/`;
    const requestData = {
        "title": title,
    }
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    axiosInstance.post(apiURL, finaldata)
    .then(response =>{
        return(response.data)
    })
    .catch(error => {
        console.log(error)
        console.log('statementCreate 실패!!!')
    })
}   

export {getPostList, getStatement, getStatementList,
    updatePost,  updateStatement, 
    createpost, createStatement, deleteStatement}


