import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from 'src/redux';

// use through your app instead of plain 'useSelector' because you don't need add type anytime like use useSelector
/* While it's possible to import the RootState and AppDispatch types into each component, 
it's better to create typed versions of the useDispatch and useSelector hooks for usage 
in your application. This is important for a couple reasons*/
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
