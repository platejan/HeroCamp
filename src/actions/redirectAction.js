import * as types from './actionTypes';
import {push} from 'react-router-redux';

export function redirectMe(way){
  return(dispatch)=>{
    dispatch(push(way));
  };
}
