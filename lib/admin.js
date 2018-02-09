/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * Create a User
 * @param {com.aczire.alm.base.user.admin.CreateUser} createUser - the CreateUser transaction
 * @transaction
 */
function createUser(newuser) {
    console.log('createUser');

    var factory = getFactory();
    var NS_AU = 'com.aczire.alm.base.user.admin';

    var testuser = factory.newResource(NS_AU, 'Admin', newuser.user.uname);
  
    testuser.uid = newuser.user.uid;
	testuser.logEntries=newuser.user.logEntries
    
  	// Create new user.
    return getParticipantRegistry(NS_AU + '.Admin')
        .then(function (registry) {
            return registry.add(testuser);
        })
        .then(function(){
    		var userCreatedEvent = factory.newEvent(NS_AU, 'UserCreatedEvent');
            userCreatedEvent.user = newuser.user;
      		userCreatedEvent.modified_by = newuser.modified_by;
            userCreatedEvent.comment = 'Created new admin user - ' + newuser.user.uname + '!';
    		emit(userCreatedEvent);
    	});
}
