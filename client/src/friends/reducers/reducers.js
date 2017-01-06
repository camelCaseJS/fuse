const INITIAL_STATE = { all: [], selected: [] };

const defaultUser = {
  firstName: 'Justin',
  lastName: 'Potter',
  profilePictureURL: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return { all: [defaultUser] };
  }
};
