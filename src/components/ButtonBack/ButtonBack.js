import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function ButtonBack(props) {
  return (
    <button type="button" onClick={props.onClick} className={s.btnBack}>
        {props.children}
    </button>
  );
}

ButtonBack.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string,
};
