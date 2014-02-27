beforeEach(function() {
  Contact.all = [];
});

describe('Contact', function() {
  describe('createAddress', function() {
    it("creates an address object", function() {
      var testContact = Contact.create();
      var testAddress = testContact.createAddress();
      Address.isPrototypeOf(testAddress).should.equal(true);
    });
  });

  describe('initialize', function() {
    it('sets the first and last name', function() {
      var testContact = Object.create(Contact);
      testContact.initialize("Mary", "Jane");
      testContact.firstName.should.equal("Mary");
      testContact.lastName.should.equal("Jane");
    });
    it('sets an empty aray for the address property', function() {
      var testContact = Object.create(Contact);
      testContact.initialize("Mary", "Jane");
      testContact.addresses.should.eql([]);
    });  
  });

  describe('create', function() {
    it('initializes the contact', function() {
      var testContact = Contact.create("Mary", "Jane");
      testContact.addresses.should.eql([]);
    });
    it('adds the contact to the .all property', function() {
      var testContact = Contact.create();
      Contact.all.should.eql([testContact]);
    });
  });
  describe('fullName', function() {
    it('combines first and last names separated by a space', function() {
      var testContact = Object.create(Contact);
      testContact.firstName = "Bruce";
      testContact.lastName = "Springsteen";
      testContact.fullName().should.equal("Bruce Springsteen");
    });
  });
});

beforeEach(function() {
  Address.all = [];
});

describe('Address', function() {
  describe('initialize', function() {
    it('creates empty arrays for the address properties', function() {
      var testAddress = Object.create(Address);
      testAddress.initialize();
      testAddress.street.should.eql([]);
    });
    describe('create', function() {
    it('initializes the address', function() {
      var testAddress = Address.create();
      testAddress.street.should.eql([]);
    }); 
    it('adds the address to the .all property', function() {
      var testAddress = Address.create();
      Address.all.should.eql([testAddress]);
    });
  });
});
  describe('fullAddress', function() {
    it('returns the full address with nice formatting', function() {
      var testAddress = Object.create(Address);
      testAddress.street = "6317 Yellowood Road";
      testAddress.city = "Charlotte";
      testAddress.state = "NC";
      testAddress.zipcode = "28210"
      testAddress.fullAddress().should.equal("6317 Yellowood Road <br/>Charlotte, NC 28210");
    });
  });
});
describe('PhoneNumber', function() {
  describe('create', function() {
    it('initializes the phone number', function() {
      var testPhone = PhoneNumber.create();
      testPhone.initialize("907", "235", "8557", "home");
      testPhone.exchange.should.eql("235");
    });
  });
  describe('initialize', function() {
    it('sets the phone number', function() {
      var testPhone = Object.create(PhoneNumber);
      testPhone.initialize("907", "235", "8557", "home");
      testPhone.areacode.should.eql("907");
    });
  });
  describe('phoneFormat', function() {
    it('returns a phone number in the proper format',function() {
      var testPhone = Object.create(PhoneNumber);
      testPhone.areacode = "803";
      testPhone.exchange = "412";
      testPhone.individual = "1218";
      testPhone.phoneType = "Cell";
      testPhone.phoneFormat("Cell 8034121218").should.equal("Cell: 803.412.1218"); 
    });
  });
});
  
