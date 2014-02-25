var Contact = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

var Address = {
  fullAddress: function() {
  return this.street + ", " + this.city + ", " + this.state + " " + this.zip; 
  }
};

var PhoneNumber = {
  phoneFormat: function() {
    return "(" + this.areacode + ")" + this.exchange + "-" + this.individual;
  }
};

$(document).ready(function() {
  var contactToEdit;

   $("#add-address").click(function() {
     $("#new-addresses").append('<h4>Address</h4>' + 
                                '<div class="new-address">' + 
                                  '<div class="form-group">' + 
                                    '<label for="new-street">Street</label>' + 
                                    '<input type="text" class="form-control" id="new-street">' + 
                                  '</div>' + 
                                  '<div class="form-group inline padright">' + 
                                    '<label for="new-city">City</label>' + 
                                    '<input type="text" class="form-control" id="new-city">' + 
                                  '</div>' + 
                                  '<div class="form-group inline padright">' + 
                                    '<label for="new-state">State</label>' + 
                                    '<input type="text" class="form-control" id="new-state">' + 
                                  '</div>' + 
                                  '<div class="form-group inline">' + 
                                    '<label for="new-zipcode">Zipcode</label>' + 
                                    '<input type="text" class="form-control" id="new-zipcode">' + 
                                  '</div>' + 
                                '</div>');
  });
  
  $('#add-phone').click(function() {
    $('#new-phoneNumbers').append('<h4>Phone Number</h4>' + 
                                  '<div class="newphone">' + 
                                    '<div class="form-group inline">' + 
                                      '<input type="text" class="form-control inline new-areacode">' + 
                                      '<input type="text" class="form-control inline new-exchange">' + 
                                      '<input type="text" class="form-control inline new-individual">' + 
                                      '<input type="radio" name="phoneType" value="home" checked="checked" />Home' + 
                                      '<input type="radio" name="phoneType" value="cell" />Cell' + 
                                      '<input type="radio" name="phoneType" value="work" />Work' + 
                                    '</div>' + 
                                  '</div>');
  });

  
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



