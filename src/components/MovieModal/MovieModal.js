// import React from 'react';
import { PropTypes } from 'prop-types';
import { Row, } from 'react-bootstrap';
import RBModal from 'react-bootstrap/Modal';


import * as S from './styled';
// show: boolean, onClose: function, children: Component
const MovieModal = ({ show, onClose: handleModalClose, children }) => {
  return (
    <RBModal
      className="show-grid"
      size="xl"
      centered
      show={show}
      onHide={handleModalClose}
    >
      <Row>
        <S.RBCol xs={2} sm={2} md={3} lg={3} />
        <S.RBCol xs sm md lg={true}>
          <S.RBModalHeader closeButton>&nbsp;</S.RBModalHeader>
          <S.RBModalBody>
            { children.body }
          </S.RBModalBody>
        </S.RBCol>
      </Row>
      { children.footer &&
        <RBModal.Footer>
          { children.footer }
        </RBModal.Footer>
      }
    </RBModal>
  )
}

MovieModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
}

export default MovieModal;

// const MovieModal = ({ onClose, children }) => {
//   return (
//     <div className="modal-container">
//       <div className="modal-header">
//         <span className="modal-close" onClick={onClose} >&times;</span>
//       </div>
//       <div className="modal-aside"></div>
//       <div className="modal-content">
//         { children }
//       </div>
//     </div>
//   )
// }
