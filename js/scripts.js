var Contact = {
  all: [],
  create: function(firstName, lastName) {
    var entry = Object.create(Contact);
    entry.initialize(firstName, lastName);
    Contact.all.push(entry);
    return entry;
  },
  initialize: function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.addresses = [];
  }, 
  fullName: function() {
    return this.firstName + " " + this.lastName;
  },
  createAddress: function(street, city, state, zipcode) {
    var address = Address.create(street, city, state, zipcode);
    this.addresses.push(address);
    return address;
  }
};

var Address = {
  create: function(street, city, state, zipcode) {
    var address = Object.create(Address)
    address.initialize(street, city, state, zipcode);
    return address;
  },
  initialize: function(street, city, state, zipcode) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
  },
  fullAddress: function() {
  return this.street + " <br/>" + this.city + ", " + this.state + " " + this.zipcode; 
  }
};

var PhoneNumber = {
  create: function(areacode, exchange, individual, phoneType) {
    var phoneNumber = Object.create(PhoneNumber);
    phoneNumber.initialize(areacode, exchange, individual, phoneType);
    return phoneNumber;
  },
  initialize: function(areacode, exchange, individual, phoneType) {
    this.areacode = areacode;
    this.exchange = exchange;
    this.individual = individual;
    this.phoneType = phoneType;
  },
  phoneFormat: function() {
    return  this.phoneType + ": " + this.areacode + "." + this.exchange + "." + this.individual;
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
                                    '<input type="text" maxlength="2" class="form-control" id="new-state">' + 
                                  '</div>' + 
                                  '<div class="form-group inline">' + 
                                    '<label for="new-zipcode">Zipcode</label>' + 
                                    '<input type="text" maxlength="5" class="form-control" id="new-zipcode">' + 
                                  '</div>' + 
                                '</div>');
  });
  
  $('#add-phone').click(function() {
    $('#new-phoneNumbers').append('<h4>Phone Number</h4>' + 
                                  '<div class="newphone">' + 
                                    '<div class="form-group inline">' + 
                                      '<input type="text" maxlength="3" class="form-control inline new-areacode">' + 
                                      '<input type="text" maxlength="3" class="form-control inline new-exchange">' + 
                                      '<input type="text" maxlength="4" class="form-control inline new-individual">' + 
                                      '<select name="phoneType" class="phoneType">' + 
                                          '<option value="home">Home</option>' + 
                                          '<option value="cell">Cell</option>' + 
                                          '<option value="work">Work</option>' + 
                                        '</select>' + 
                                        // '<input type="text" class="form-control inline phoneType">' + 
                                    '</div>' + 
                                  '</div>');
  });

  
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = Contact.create(inputtedFirstName, inputtedLastName);
    //newContact.addresses = [];

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input#new-street").val();
      var inputtedCity = $(this).find("input#new-city").val();
      var inputtedState = $(this).find("input#new-state").val();
      var inputtedZipcode = $(this).find("input#new-zipcode").val();

      var newAddress = newContact.createAddress(inputtedStreet, inputtedCity, inputtedState, inputtedZipcode);
      console.log(newAddress);
      // newContact.addresses.push(newAddress);
      
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");
    $(".contact").last().click(function() {
      contactToEdit = newContact;

      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);

      $('ul#phoneNumbers').text("");
      newContact.phoneNumbers.forEach(function(phonenumber) {
        $('ul#phoneNumbers').append("<li>" + phonenumber.phoneFormat() + "</li>");
      });

      $('ul#addresses').text("");
      newContact.addresses.forEach(function(address) {
        $('ul#addresses').append("<li>" + address.fullAddress() + "</li>");
      });
    });


    newContact.phoneNumbers = [];
    
    $(".newphone").each(function() {
      var inputtedAreaCode   = $(this).find("input.new-areacode").val();
      var inputtedExchange   = $(this).find("input.new-exchange").val();
      var inputtedIndividual = $(this).find("input.new-individual").val();
      var inputtedPhoneType  = $(this).find("select.phoneType").val(); 

      var newPhone = PhoneNumber.create(inputtedAreaCode, inputtedExchange, inputtedIndividual, inputtedPhoneType); 
      // newPhone.areacode   = inputtedAreaCode;
      // newPhone.exchange   = inputtedExchange;
      // newPhone.individual = inputtedIndividual;
      // newPhone.phoneType  = inputtedPhoneType;



      newContact.phoneNumbers.push(newPhone);
      console.log(newPhone.phoneType)
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



