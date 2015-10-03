/*===========================================
=            MOCK DATA FOR TESTS            =
===========================================*/

'use strict';

var mockData = (function() {
    return {
        getMockUsers: getMockUsers
    };

    function getMockUsers() {
        return [{
            username: 'mockUser1',
            password: '91af89a5be8d184e107302a0f10818c8',
            email: 'mockEmail1@mock.com'
        }, {
            username: 'mockUser2',
            password: 'mockUser2',
            email: 'mockEmail2@mock.com'
        }, {
            username: 'mockUser3',
            password: 'mockUser3',
            email: 'mockEmail3@mock.com'
        }];
    }

})();
