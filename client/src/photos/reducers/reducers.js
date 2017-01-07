const INITIAL_STATE = { photoEntry: [] };

const photos = {
  photoEntry: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return { photos: [photos] };
  }
};
