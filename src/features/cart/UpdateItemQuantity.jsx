/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increseItemQuantity } from './cartSlice';

function UpdateItemQuantity({ id, currentQuanity }) {
  const dispatch = useDispatch();
  return (
    <div className="gap- flex items-center md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(id))}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuanity}</span>
      <Button type="round" onClick={() => dispatch(increseItemQuantity(id))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
