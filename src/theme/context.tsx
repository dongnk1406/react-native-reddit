import React, {createContext} from 'react';

interface AuthContextProps {
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({signOut: () => {}});

export {AuthContext};
