import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { addreserve } from '../redux/reservation/reservationSlice';
import { fetchreservation } from '../redux/reservation/reservationSlice';

const initials = {
  time: '',
  message: '',
};

const Form = () => {
  const [state, setState] = useState(initials);
  const Array = useSelector((state) => state.reserveReducer.reserves);
  console.log("check data:", Array)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchreservation());
  }, [dispatch]);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev, [name]: value
    }));
  };

  const handleSubmit = () => {
    dispatch(fetchreservation());
    setState(initials);
  };

  return (
    <div className="mainform">
      <div className="Line" />
      <div className="Title">
        Add your reservation
      </div>
      <form className="Form" method="post">
        <input type="time" value={state.time} id="time" className="form_item" name="time" placeholder="Time" onChange={handleChange} required />
        <input type="text" value={state.message} id="message" className="form_item" name="message" placeholder="message" onChange={handleChange} required />
        <button type="button" onClick={handleSubmit} className="form_button">Submit</button>
      </form>
    </div>
  );
};
export default Form;
