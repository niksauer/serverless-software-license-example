// Font Awesome icon library. New icons must be imported here and added to the library to be used.
// https://github.com/FortAwesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faArrowLeft,
  faPlus,
  faMinus,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

library.add(
  // Use: <FontAwesomeIcon icon="shield-alt" />
  faArrowLeft,
  faPlus,
  faMinus,
  faTimes,

  // Regular icons need to be namespaced 'far'
  // Use: <FontAwesomeIcon icon={['far', 'check-circle']} />
  faUserCircle
);
