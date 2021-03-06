import React from 'react';

const FirebaseContext = React.createContext(null);
// Create 2 components: FirebaseContext.Provider to provide a Firebase instance once at the top-level of component hierarchy, and FirebaseContext.Consumer to retrieve the instance if it's needed in any React component.


export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;