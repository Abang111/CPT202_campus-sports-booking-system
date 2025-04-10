// 注册
document.getElementById('confirm').addEventListener('click', function (event) {
    event.preventDefault(); // 阻止表单的默认提交行为
    var isValid = validForm(document.querySelector('form'), "[name]")
    var json = jsonForm(document.querySelector('form'), "[name]")
    var password = json.password;
    var flag = true;
    if (password.length > 8){
        for (var i = 0; i<password.length; i++){
            if (/^[A-Z]+$/.test(password[i])){
                flag = false;
                break;
            }
        }
        if (flag){
            alert("Password needs to have capital letters and contain both number and letters!");
            isValid = false;
        }
    } else {
        alert("Password needs to be greater than eight characters!");
        isValid = false;
    }
    if (!document.getElementById("agreement").checked) {
        alert("Please check the agreement")
        isValid = false;
    }
    if (isValid) {
        axios.post(HTTPURL + '/user/save', json)
            .then(function (response) {
                console.log(response.data);
                if (!response.data.success) {
                    alert(response.data.msg)
                } else {
                    window.location.href = 'logtest.html'; // 替换为你要跳转的页面的URL  
                }
            })
    }
});

// 返回
document.getElementById('back').addEventListener('click', function (event) {
    event.preventDefault(); // 阻止表单的默认提交行为   
    window.location.href = 'logtest.html'; // 替换为你要跳转的页面的URL  
});
