function initData() {
    axios.post(HTTPURL + '/product/find', {})
        .then(function (response) {
            console.log(response.data);
            if (!response.data.success) {
                alert(response.data.msg)
            } else {
                var list = response.data.data.list;
                var vertical = document.getElementById("tbody")
                vertical.innerHTML = ''
                let content = ''
                maxId = Math.max.apply(Math,list.map(item => { return item.id }))
                list.forEach(item => {
                    content +=
                        `<tr>
                        <td hidden><input class='cn readinput' type="text" value="${item.id}"  disabled name="cnId"></td>
                        <td><input class='cn readinput' type="text" value="${item.product}" disabled name="activityName"></td>
                        <td><input class='cn readinput' type="number" min="0" value="${item.court}" disabled name="court"></td>
                        <td><input class='cn readinput' type="number" min="0" value="${item.num}" disabled name="venueCount"></td>
                        <td><select class='cn readinput' type="text" value="${item.available}" disabled name="status">
                        <option value='2' ${item.available == 2 && 'selected'}>Available</option>
                        <option value='1'  ${item.available == 1 && 'selected'}>Unavailable</option>
                        </select></td>
                        <td><button class='cn readinput' type="button" onclick="editRow(this)">Edit</button></td>
                    </tr>`
                });
                vertical.innerHTML = content
            }
        })
}
initData()

var maxId



function addRow() {
    var tbody = document.getElementById('tbody');
    var newRow = tbody.insertRow();
    newRow.innerHTML = `
    <td hidden><input class='cn readinput' type="text" value="${maxId}"  disabled name="cnId"></td>
    <td><input class='cn readinput' type="text" value=""  name="activityName"></td>
    <td><input class='cn readinput' type="number" min="0" value=""  name="court"></td>
    <td><input class='cn readinput' type="number" min="0" value=""  name="venueCount"></td>
    <td><select class='cn readinput' type="text" value="1"  name="status"><option value='1'>Available</option><option value='2'>Unavailable</option></select></td>
    <td><button class='cn readinput' type="button" onclick="saveRow(this)">Save</button></td>
        `;
}

function editRow(button) {

    var row = button.parentElement.parentElement;
    var inputs = row.querySelectorAll('.cn');
    inputs.forEach(input => {
        input.disabled = false; // 设置输入框可编辑
        input.classList.remove('readinput');
    });
    button.textContent = "Save";
    button.onclick = function () {
        saveRow(this);
    };
}

function saveRow(button) {
    var row = button.parentElement.parentElement;
    var inputs = row.querySelectorAll('.cn');
    var data = {
        id: inputs[0].value,
        product: inputs[1].value,
        court: inputs[2].value,
        num: inputs[3].value,
        available: inputs[4].value
    };

    // 在这里使用axios向后台发送数据保存
    axios.post(HTTPURL + '/product/update', data)
        .then(function (response) {
            console.log(response.data);
            // 如果保存成功，将输入框设置为只读状态
            inputs.forEach(input => {
                input.disabled = true; // 设置输入框可编辑
                input.classList.add('readinput')
            });
            button.textContent = "Edit";
            button.onclick = function () {
                editRow(this);
            };
        })
        .catch(function (error) {
            console.error('Error saving data:', error);
            alert('Failed to save data, please try again!');
        });
}

function downloadFile() {
    //var url = '../../../../../../school.log';
    //var url = '/school-fitness/school.log';
    var url = 'C:\\Users\\19669\\Desktop\\school-fitness\\school.log';
    var filename = 'school.log';
    //var filename = 'school.log'

    // 创建一个虚拟的链接元素
    var downloadLink = document.createElement('a');
    downloadLink.href = url;  // 替换为你要下载的文件路径

    // 设置下载文件的名称
    downloadLink.download = filename;  // 替换为你要下载的文件名称（包括扩展名）

    // 触发点击事件进行下载
    downloadLink.click();
}