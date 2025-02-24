

import { BrowserAdapter } from "./browser/BrowserAdapter";

let currenetAdapter = BrowserAdapter;

export const DOMAdapter = {
    get(){
        return currenetAdapter;
    },

    set(adapter){
        currenetAdapter = adapter;
        return currenetAdapter;
    }
}