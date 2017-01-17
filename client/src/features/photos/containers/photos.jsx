import React from 'react';
import Main from '../../../shared-components/main';
import Friends from '../../friends/containers/friends';
import PhotosList from '../components/photos-list';

// FOR TESTING
// right={
//       <img
//         src="https://camo.githubusercontent.com/222c6a021b280859b439c4e69ca6c05ef28c85fe/687474703a2f2f6d6164656972612e686363616e65742e6f72672f70726f6a656374322f6d696368656c735f70322f77656273697465253230706963732f62656e6465722e6a7067"
//         role="presentation"
//       />
//     }

const Photos = () => (
  (<Main
    left={<Friends />}
    right={<PhotosList />}
  />)
);

export default Photos;
