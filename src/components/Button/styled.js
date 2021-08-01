import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

export const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .btn {
    margin: 0 0.1rem
  }
`

export const RBButton = styled(Button)`
  border-radius: 1.0rem
`