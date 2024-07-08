

$(document).ready(function () {
    ShowEmployeeData();
});
function ShowEmployeeData() {
  
    //var url = '/Home/EmployeeList';
    var url = $('#urlempdata').val();

    $.ajax({
        //url: '/Home/EmployeeList',
        url: url,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset:utf-8;',
        success: function (result, status, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.name + '</td>';
                object += '<td>' + item.city + '</td>';
                object += '<td>' + item.state + '</td>';
                object += '<td>' + item.salary + '</td>';
                object += '<td><a href="#" onclick="Edit(' + item.id + ')" class="btn btn-success">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.id + ')">Delete</a></td>';
                object += '</tr>';
            });
            $("#table_data").html(object);
        },
        error: function () {
            alert('data can not be get');
        }
    });
}

$('#btnadd').click(function () {
    clearTextBox();
    $('#employeemodel').modal('show');
    $('#empid').hide();
    $('#addemployee').css('display', 'block');
    $('#updateemployee').css('display', 'none');
    $('#employeeheading').text('Add Employee');
});

function Addemployee() {
   
    var adddata = {
        Name : $('#Name').val(),
        City : $('#City').val(),
        State : $('#State').val(),
        Salary : $('#Salary').val()
    }
    $.ajax({
        url: '/Home/AddEmployee',
        type: 'Post',
        data: adddata,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        success: function () {
            alert('Data saved');
            clearTextBox()
            ShowEmployeeData();
            hidepopup();
        },
        error: function () {
            alert('Data not saved');
        }
    });
}
function hidepopup() {
    $('#employeemodel').modal('hide');
}
function clearTextBox() {
    $('#EmployeeId').val('');
    $('#Name').val('');
    $('#City').val('');
    $('#State').val('');
    $('#Salary').val('');
}
function Delete(id) {
    if (confirm('Are you sure,You Want to delete this recard ?')) {
        $.ajax({
            url: '/Home/Delete?id=' + id,
            success: function () {
                alert('Recard Deleted');
                ShowEmployeeData();
            },
            error: function () {
                alert('Data Not Deleted');
            }
        });
    }
}

function Edit(id) {
   
    $.ajax({
        url: '/Home/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#employeemodel').modal('show');
            $('#EmployeeId').val(response.id);
            $('#Name').val(response.name);
            $('#City').val(response.city);
            $('#State').val(response.state);
            $('#Salary').val(response.salary);

            $('#addemployee').css('display','none');
            $('#updateemployee').css('display', 'block');
            $('#employeeheading').text('Update Recard');
            $('#empid').show();

            //$('#addemployee').hide();
            //$('#updateemployee').show();
        },
        error: function () {
            alert('Data not found');
        }
    });
}

function UpdateEmployee() {
    var adddata = {
        Id: $('#EmployeeId').val(),
        Name: $('#Name').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        Salary: $('#Salary').val()
    }
    $.ajax({
        url: '/Home/Update',
        type: 'Post',
        data: adddata,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        success: function () {
            alert('Data saved');
            clearTextBox()
            ShowEmployeeData();
            hidepopup();
        },
        error: function () {
            alert('Data not saved');
        }
    });
}