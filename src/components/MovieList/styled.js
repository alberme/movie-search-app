import styled from 'styled-components';

export const MovieListContainer = styled.div`
  padding: 2em 6em;
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  grid-auto-columns: minmax(100px, auto);
  grid-auto-rows: minmax(100px, auto);
  /* gutters */
  column-gap: 6em;
  row-gap: 4em;
`