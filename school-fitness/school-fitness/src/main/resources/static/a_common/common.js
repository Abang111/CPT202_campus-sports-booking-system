const HTTPURL = 'http://127.0.0.1:9012';
/**
 * 校验表单
 * @param {父节点} rootNode 
 * @param {子节点名称} childName 
 */
function validForm(rootNode, childName) {
  var formElements = rootNode.querySelectorAll(childName);
  var isValid = true;
  formElements.forEach(item => {
    if (!item.validity.valid && isValid) {
      item.reportValidity()
      isValid = false;
    }
  })
  return isValid;
}

/**
 * 返回节点json
 * @param {*} rootNode 
 * @param {*} childName 
 * @returns 
 */
function jsonForm(rootNode, childName) {
  var formElements = rootNode.querySelectorAll(childName);
  var json = {};
  formElements.forEach(item => {
    json[item.name] = item.value
  })
  console.log('json', json)
  return json;
}

// 创建cookie
function createCookie(name, value, days = 1) {
  var expires = "";

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 读取cookie
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
// 获取地址参数
function getParam(param) {
  // 获取完整的URL
  var url = window.location.href;

  // 使用URLSearchParams来解析URL参数
  var urlParams = new URLSearchParams(url);

  // 获取特定参数的值
  var paramValue = urlParams.get(param);

  // 在控制台打印参数值
  console.log('Parameter Value:', paramValue);
  return paramValue;
}


if (readCookie("admin") != 1) {
  var admin = document.getElementById("admin")
  if (admin) {
    admin.style.display = 'none'
  }
}


var httpurl = window.location.href
if (!readCookie("userName") && !httpurl.includes("login")) {
  window.location.href = '/login/html/logtest.html'
}


// 顶部栏目
var header = document.getElementById("header")
if (header) {
  fetch('/a_common/header.html')
    .then(response => response.text())
    .then(data => {
      header.innerHTML = data;
    })
    .catch(error => console.error('Error fetching header:', error));
}
//左边栏目
var sidebar = document.querySelector(".sidebar")
if (sidebar) {
  if (httpurl.includes("/admin/")) {
    url = "/a_common/a_admin_left.html"
  } else if (httpurl.includes("/user/")) {
    url = "/a_common/a_user_left.html"
  } else if (httpurl.includes("/piao/")) {
    url = "/a_common/a_piao_left.html"
  }
  if (url) {
    sidebar.innerHTML = ''
    fetch(url)
      .then(response => response.text())
      .then(data => {
        sidebar.innerHTML = data;
        active()
        logout()
        hiddenLeft()
        logo()
      })
      .catch(error => console.error('Error fetching header:', error));
  }
}

// 正在使用的左边栏目
function active() {
  var navLinks = document.querySelectorAll('.menu a');
  navLinks.forEach(function (link) {
    // 检查当前URL是否包含链接的href值
    if (window.location.href.indexOf("/" + link.getAttribute('href')) !== -1) {
      link.parentNode.classList.add('active');
    } else {
      link.parentNode.classList.remove('active');
    }
  });
}
// 退出
logout()
function logout() {
  let a = document.querySelector(".log-off")
  if (a) {
    a.addEventListener('click', function (event) {
      event.stopPropagation(); // 阻止事件冒泡
      event.preventDefault(); // 如果有需要，也可以阻止默认行为
      createCookie("userName", null)
      createCookie("admin", null)
      window.location.href = '/login/html/logtest.html'
    })
  }
}
// 隐藏左边栏目
function hiddenLeft() {
  //导航界面
  document.getElementById('toggleSidebar').onclick = function () {
    var sidebar = document.querySelector('.sidebar');
    var content = document.querySelector('.content');

    if (sidebar.style.width === '250px' || !sidebar.style.width) {
      sidebar.style.width = '0';
      sidebar.style.padding = '0';
      content.style.marginLeft = '0';
      header.style.marginLeft = '0'; // 确保header的左边距也是0

    } else {
      sidebar.style.width = '250px';
      sidebar.style.padding = '15px';  // 重新应用原始内边距
      content.style.marginLeft = '265px';
      header.style.marginLeft = '265px'; // 和侧边栏宽度一致

    }
  };
}


if (document.querySelector(".content-body #date")) {
  let currentDate = new Date();
  let year = currentDate.getFullYear(); // 获取当前年份
  let month = currentDate.getMonth() + 1; // 获取当前月份，注意月份从0开始，所以要加1
  let day = currentDate.getDate()
  if (day<10){
    day = "0"+day
  }
  var date = year + '-' + (month > 9 ? month : "0" + month) + '-' + day;
  console.log('date', date)
  document.getElementById("date").value = date
}
// document.querySelector('.logo-text').textContent = document.cookie.split(';')[0].substring(9);
function logo() {
  // document.getElementById('logo-text').innerHtml = document.cookie.split(';')[0].substring(9);
  var newElement = document.createElement("p"); // 创建一个新的 p 元素
  var newText = document.createTextNode(document.cookie.split(';')[0].substring(9)); // 创建文本节点
  newElement.appendChild(newText); // 将文本节点添加到 p 元素中
  document.getElementById("logo-text").appendChild(newElement);
}
