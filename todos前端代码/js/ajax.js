function myAjax(obj){
    let {url,data,type} = obj
  
    if(!url) return
    return new Promise((resolve,reject) =>{
        const xhr = new XMLHttpRequest()
        
        data = data && str(data)
        if(type === 'get'){
            url += `?${data}`
            data = null
        }
        xhr.open(type,url)
        if(type === 'post'){
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        }
        
        xhr.send(data)
        
        xhr.onreadystatechange = function () {
    
            if(xhr.readyState === 4 ){
                if(xhr.status === 200){
                    const result = JSON.parse(xhr.responseText)
                    resolve(result)
                }else{
                    reject()
                }
            }
        }
    
    })
    function str(obj){
       
        let arr = []
        for(var key in obj){
            arr.push(`${key}=${obj[key]}`)
        }
        
        return arr.join('&')
    }

}



