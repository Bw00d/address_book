var Contact = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

$(document).ready(function() {
  var contactToEdit;

  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedAddress = $("input#new-address").val();
    var newContact = Object.create(Contact);
    newContact.firstName = inputtedFirstName;
    newContact.lastName = inputtedLastName;
    newContact.address = inputtedAddress;

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      contactToEdit = newContact;
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $(".address").text(newContact.address);
    });

    $("button#edit").last().click(function() {
      event.preventDefault();
        $('#edit-contact').show();
        $('input#edit-first-name').val(contactToEdit.firstName);
        $('input#edit-last-name').val(contactToEdit.lastName);
        $('input#edit-address').val(contactToEdit.address);
        $('#show-contact').hide();
    });

    $("form#edit-contact").submit(function(event) {
      event.preventDefault();
      contactToEdit.firstName = $('input#edit-first-name').val();
      contactToEdit.lastName = $('input#edit-last-name').val();
      contactToEdit.address = $('input#edit-address').val();
      // contactToEdit.html('<li>' + newContact.fullName() + '</li>');
    });

    this.reset();
  });
});



