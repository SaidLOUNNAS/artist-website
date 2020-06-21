// Logout

const btnSignOut = document.getElementById('btnLogout');
btnSignOut.addEventListener('click', (e) => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.location = '../../admin.html';
      console.log('ok');
    })
    .catch(function (error) {
      alert('erreur');
    });
});

const ref = firebase.database().ref('users');
var new_html = '';
window.onload = function () {
  initApp();
  displayEmpData();
};

function initApp() {
  document.getElementById('add_emp').addEventListener('click', addNewEmp, false);
}
function addNewEmp() {
  var name = document.getElementById('name').value;
  var date = document.getElementById('date').value;
  var time = document.getElementById('time').value;
  var map = document.getElementById('map').value;
  var timeStamp = new Date().getTime();
  var empID = 'EMP_' + timeStamp;
  ref.child(empID).set({
    name: name,
    date: date,
    time: time,
    map: map,
    emp_id: empID,
  });
  $('#name').val('');
  $('#date').val('');
  $('#time').val('');
  $('#map').val('');
}

//Display Employee Data

function displayEmpData() {
  ref.on('child_added', function (empData) {
    new_html += '<tr id="' + empData.val().emp_id + '">';
    new_html += '<td id="name_' + empData.val().emp_id + '">' + empData.val().name + '</td>';
    new_html += '<td id="date_' + empData.val().emp_id + '">' + empData.val().date + '</td>';
    new_html += '<td id="time_' + empData.val().emp_id + '">' + empData.val().time + '</td>';
    new_html += '<td id="map_' + empData.val().emp_id + '">' + empData.val().map + '</td>';
    new_html += '<td><a  class="edit" data-toggle="modal"><i class="material-icons editEmp"';
    new_html += 'data-toggle="tooltip" data-emp-id="' + empData.val().emp_id + '" title="Edit">&#xE254;</i></a>';
    new_html += '<a class="" data-toggle="modal"><i class="material-icons delete"';
    new_html += 'data-toggle="tooltip"  data-emp-id="' + empData.val().emp_id + '" title="Delete">&#xE872;</i></a>';
    new_html += '</td>';
    new_html += '</tr>';
    $('#emp-table').html(new_html);
  });
}

$(document).on('click', '.delete', function () {
  var emp_id = $(this).attr('data-emp-id');

  ref.child(emp_id).once('value', function (emp) {
    var modal_header = '';

    modal_header += '<h4 class="modal-title">Supprimer ' + emp.val().name + '</h4>';
    modal_header += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

    var modal_body = '';
    modal_body += '<p>Voulez-vous vraiment supprimer ces enregistrements?</p>';
    modal_body += '<p class="text-warning"><small></small></p>';
    var modal_footer = '';
    modal_footer += '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
    modal_footer += '<input type="submit" data-dismiss="modal" data-emp-id="' + emp_id + '" class="btn btn-danger deleteEmpData" value="Delete">';
    $('#deleteEmployeeModal').find('.modal-header').html(modal_header);
    $('#deleteEmployeeModal').find('.modal-body').html(modal_body);
    $('#deleteEmployeeModal').find('.modal-footer').html(modal_footer);
    $('#deleteEmployeeModal').modal();
  });
});

$(document).on('click', '.editEmp', function () {
  var emp_id = $(this).attr('data-emp-id');

  ref.child(emp_id).once('value', function (emp) {
    var modal_header = '';

    modal_header += '<h4 class="modal-title">Ajouter ' + emp.val().name + '</h4>';
    modal_header += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

    var modal_body = '';
    modal_body += '<div class="form-group">';
    modal_body += '<label>Name</label>';
    modal_body += '<input id="edit-name" type="text" value="' + emp.val().name + '" class="form-control" required>';
    modal_body += '</div>';

    modal_body += '<div class="form-group">';
    modal_body += '<label>Date</label>';
    modal_body += '<input type="date" id="edit-date" value="' + emp.val().date + '" class="form-control" required>';
    modal_body += '</div>';

    modal_body += '<div class="form-group">';
    modal_body += '<label>Heure</label>';
    modal_body += '<input type="time" id="edit-date" value="' + emp.val().time + '" class="form-control" required>';
    modal_body += '</div>';

    modal_body += '<div class="form-group">';
    modal_body += '<label>Localisation</label>';
    modal_body += '<input id="edit-map" type="text" value="' + emp.val().map + '" class="form-control" required>';
    modal_body += '</div>';

    var modal_footer = '';
    modal_footer += '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
    modal_footer += '<input type="submit" data-dismiss="modal" data-emp-id="' + emp_id + '"  class="btn btn-danger updateEmpData" value="Save">';
    $('#editEmployeeModal').find('.modal-header').html(modal_header);
    $('#editEmployeeModal').find('.modal-body').html(modal_body);
    $('#editEmployeeModal').find('.modal-footer').html(modal_footer);
    $('#editEmployeeModal').modal();
  });
});

$(document).on('click', '.deleteEmpData', function () {
  var emp_id = $(this).attr('data-emp-id');

  ref.child(emp_id).remove();

  $('#' + emp_id).remove();
});

$(document).on('click', '.updateEmpData', function () {
  var emp_id = $(this).attr('data-emp-id');

  var name = document.getElementById('edit-name').value;
  var date = document.getElementById('edit-date').value;
  var time = document.getElementById('edit-time').value;
  var map = document.getElementById('edit-map').value;

  ref.child(emp_id).update({
    name: name,
    date: date,
    time: time,
    map: map,
    comp: comp,
  });

  $('#name_' + emp_id).html(name);
  $('#date_' + emp_id).html(date);
  $('#time_' + emp_id).html(time);
  $('#map_' + emp_id).html(map);
});

$(document).on('click', '.dltAllData', function () {
  var emp_id = $(this).attr('data-emp-id');

  ref.remove();

  $('#emp-table').remove();
});
