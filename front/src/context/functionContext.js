import { createContext } from "react";

export const FunctionContext = createContext(null);

export default function FunctionContextProvider(props) {
    return (
        <FunctionContext.Provider value={{
            importAll
        }}>
            {props.children}
        </FunctionContext.Provider>
    );
}

// Path: front\src\context\userContext.js

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}