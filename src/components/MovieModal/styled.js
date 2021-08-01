import styled from 'styled-components';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody'
import Col from 'react-bootstrap/Col';

export const RBModalHeader = styled(ModalHeader)`
  border: 1px solid lightgray;
  background-color: whitesmoke;
`

export const RBCol = styled(Col)`
  background-color: lightgray;
  padding: 0vw;

  & + & {
    background-color: white;
  }
`

export const RBModalBody = styled(ModalBody)`
  border: 1px solid lightgray;
  overflow: auto;
`;

