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
    var NS_U = 'com.aczire.alm.base.user';

    var user = factory.newResource(NS_U, 'User', newuser.uname);
    user.uid = newuser.uid;

    // save the order
    return getAssetRegistry('com.aczire.alm.base.user')
        .then(function (registry) {
            return registry.add(user);
        })
        .then(function(){
    		var userCreatedEvent = factory.newEvent('com.aczire.alm.base.user.admin', 'UserCreatedEvent');
            userCreatedEvent.user = user;
            userCreatedEvent.comment = 'Created ' + newuser.uname + '!';
    		emit(userCreatedEvent);
    	});
}
