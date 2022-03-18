import React from 'react';

export default React.createContext({
    user: null,
    products: [],
    handleUpdateMainState: object => {},
    updateUserStateFromLocalStorage: object => {}
});
