import React from 'react';

export const MenuContext = React.createContext();

class MenuProvider extends React.Component
{
    state = 
    {
        selMenu: '',
        wasFeatherFound: false
    }

    render() {
        return (
            <MenuContext.Provider 
                value={{
                    selMenu: this.state.selMenu,
                    wasFeatherFound: this.state.wasFeatherFound,
                    setSelMenu: (menu) =>
                    {
                        this.setState((prevState) => ({selMenu: menu}))
                    },
                    setWasFeatherFound: (found) => 
                    {
                        found = !!found; // ensure a boolean value
                        this.setState((prevState) => ({wasFeatherFound: found}))
                    }
                }}
            >
                {this.props.children}
            </MenuContext.Provider>
        )
    }
};

export default MenuProvider;