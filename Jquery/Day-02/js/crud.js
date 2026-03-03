$(document).ready(function () {

  // Add new person
  $("#add").click(function () {
    let name = $("#name").val().trim();
    let age = $("#age").val().trim();

    // Validation
    if (name === "" || age === "") {
      alert("Please enter name and age");
      return;
    }

    // Create new row
    let row = `
      <tr>
        <td>${name}</td>
        <td>${age}</td>
        <td><button class="delete">Delete</button></td>
      </tr>
    `;

    $("#persons-list tbody").append(row);

    // Clear inputs
    $("#name").val("");
    $("#age").val("");
  });

  // Delete person (event delegation)
  $("#persons-list").on("click", ".delete", function () {
    $(this).closest("tr").remove();
  });

  // Search
  $("#search").click(function () {
    let searchValue = $("#search-item").val().toLowerCase();

    $("#persons-list tbody tr").filter(function () {
      $(this).toggle(
        $(this).text().toLowerCase().indexOf(searchValue) > -1
      );
    });
  });

});
