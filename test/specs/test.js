var assert = require('assert');
describe('/friends route', function() {

    it('button should have class friends', function () {
        browser.url('http://localhost:8000/friends');
        var button = $('button').getAttribute('class')
        assert.equal(button, 'friends')
    });

});