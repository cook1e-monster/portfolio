// Import server startup through a single index entry point

import './fixtures.js';
import './register-api.js';

//To forbid users from making any modifications to their user document
Meteor.users.deny({ update: () => true });

//update accounts template
Accounts.onCreateUser((options, user) => {
  const customizedUser = Object.assign(
    {
      coins: []
    },
    user
  );

  // We still want the default hook's 'profile' behavior.
  if (options.profile) {
    customizedUser.profile = options.profile;
  }

  return customizedUser;
});
