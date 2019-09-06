import {LANGUAGE_SET} from "./action-types";
export const localSet = (lang) =>({
  type: LANGUAGE_SET,
  payload: lang
});

export const setLocal = lang => dispatch =>{
    localStorage.setItem("lang", lang);
    dispatch(localSet(lang))
};
