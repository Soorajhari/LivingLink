import {TypedUseSelectorHook} from 'react-redux'
import  { RootState,AppDispatch } from './store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


export  const useAppSelector :TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch=()=>useDispatch<AppDispatch>()
