import React from 'react';

export default React.createContext({
    user: null,
    products: [],
    count: 1,
    page: 1,
    keyword: '',
    loading: false,
    handleUpdateMainState: object => {},
    updateUserStateFromLocalStorage: object => {}
});
