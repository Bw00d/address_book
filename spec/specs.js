describe('Contact', function() {
  describe('fullName', function() {
    it('combines first and last names separated by a space', function() {
      var testContact = Object.create(Contact);
      testContact.firstName = "Bruce";
      testContact.lastName = "Springsteen";
      testContact.fullName().should.equal("Bruce Springsteen");
    });
  });
});

describe('Address', function() {
  describe('fullAddress', function() {
    it('returns the full address with nice formatting', function() {
      var testAddress = Object.create(Address);
      testAddress.street = "6317 Yellowood Road";
      testAddress.city = "Charlotte";
      testAddress.state = "NC";
      testAddress.zip = "28210"
      testAddress.fullAddress().should.equal("6317 Yellowood Road, Charlotte, NC 28210");
    });
  });
});
describe('PhoneNumber', function() {
  describe('phoneFormat', function() {
    it('returns a phone number in the proper format',function() {
      var testPhone = Object.create(PhoneNumber);
      testPhone.phoneFormat("8034121218").should.equal("(803)412-1218"); 
    });
  });
});
  
