// 通过jsonp 渲染内容

function callback(data) {
  // 从服务器获取内容

  let arr = data.map((item) => {
    return (str = ` <li class = 'active' id= ${item._id}>
        <label>
          <input type="checkbox" ${item.isDone ? "checked" : ""}/>
          <span  class = ${item.isDone ? "active" : ""} }>${
      item.todosName
    }</span>
        </label>
        <button class="btn btn-danger" style="display:none">删除</button>
      </li>`);
  });
  arr = arr.join("");
  document.querySelector(".todo-main").innerHTML = arr;
  document.querySelector("#allTodos").innerHTML = data.length;
  let value = data.filter((item) => {
    return item.isDone;
  }).length;
  document.querySelector("#tocalTodos").innerHTML = value;
  document.querySelector(".todo-footer input").checked = value === data.length && data.length !== 0;
}

// 添加 script 标签
const script = document.createElement("script");
script.src = "http://127.0.0.1:5000/findtodos?callback=callback";
document.body.appendChild(script);

// 移入显示

show();
function show() {
  const main = document.querySelector(".todo-main");
  main.onmouseover = function (e) {
    if (e.target.tagName === "LI") {
      e.target.lastElementChild.style.display = "block";
    }
    if (e.target.tagName === "BUTTON") {
      e.target.style.display = "block";
    }
  };
  main.onmouseout = function (e) {
    if (e.target.tagName === "LI") {
      e.target.lastElementChild.style.display = "none";
    }
    if (e.target.tagName === "BUTTON") {
      e.target.style.display = "none";
    }
  };
}

// 回车添加任务

add();
function add() {
  const t = document.querySelector(".todo-header input");

  t.onkeydown = async function (e) {
    if (e.keyCode === 13) {
      let value = this.value;
      const result = await myAjax({
        url: "http://127.0.0.1:5000/addtodos",
        type: "post",
        data: {
          todosName: value,
        },
      });
      this.value = ''
      callback(result);
    }
  };
}

// 单击删除 和 改变状态

delOne()
function delOne() {
    const main = document.querySelector(".todo-main")
    main.onclick = async function(e){
      
        if(e.target.tagName === 'BUTTON'){
            let value =ids = e.target.parentNode.getAttribute('id')
            ids  = JSON.stringify([ids])
            console.log(ids);
         const result = await myAjax({
            url: "http://127.0.0.1:5000/delAlltodos",
            type : "post",
            data: {
              ids
            }
          })
         /*  e.target.parentNode.remove()
          const length = document.querySelectorAll('.todo-main li').length
          
          document.querySelector("#allTodos").innerHTML = length */
          callback(result)
        }
        if(e.target.tagName === 'INPUT'){
          const _id = e.target.parentNode.parentNode.getAttribute('id')
            const status = e.target.checked
          const result = await myAjax({
            url: "http://127.0.0.1:5000/updateOnetodos" ,
            type: "post",
            data: {
              id : _id,
              isDone : status
            }
            
          })
          
          callback(result)
          console.log(result);
        }
    }
}

// 点击全选

checkAll()
function checkAll(){

    const input = document.querySelector('.todo-footer label input')
    
    input.onclick = async function () {
        const status = this.checked
        const result = await myAjax({
          url: "http://127.0.0.1:5000/updateAlltodos",
          type: "post",
          data: {
            isDone : status
          }
        })

        callback(result)

    }

}

// 点击删除选中的

delChecked()

function delChecked() {

  const btn = document.querySelector('.btn')
  btn.onclick = async function () {
    let  lis =  document.querySelectorAll('.todo-main input[checked]')
    let ids =  Array.from(lis).map(function(item){

          return item.parentNode.parentNode.getAttribute('id')
    })
    ids = JSON.stringify(ids)
    const result = await myAjax({
      url: "http://127.0.0.1:5000/delAlltodos",
      type : 'post' ,
      data : {
        ids
      }
      
    }) 
   callback(result)
  }
}