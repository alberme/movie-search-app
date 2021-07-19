import { PropTypes } from 'prop-types';
import "../styles/Modal.css";
// show: boolean, onClose: function, children: Component
const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-container">
      <div className="modal-header">
        <span className="modal-close" onClick={onClose} >&times;</span>
      </div>
      <div className="modal-aside"></div>
      <div className="modal-content">
        { children }
      </div>
    </div>
  )
}

Modal.propTypes = {
  onClose: PropTypes.func,
}

export default Modal;