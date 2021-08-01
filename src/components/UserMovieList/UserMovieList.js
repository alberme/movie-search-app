import { useEffect, useState } from 'react';

import UserMovieListService from '../../utils/userMovieList.service';
import MovieCard from '../MovieCard/MovieCard';
import MovieDetails from '../MovieDetails';
import MovieModal from '../MovieModal/MovieModal.js';

import { StyledButtonContainer, RBButton } from '../Button/styled';

export const UserMovieList = () => {
  // const userMovieListService = new UserMovieListService();
  const [userMovieListService] = useState(new UserMovieListService());
  const [userMovieData, setUserMovieData] = useState({
    selectedMovieId: '',
    userMovieList: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [modalData, setModalData] = useState({
    body: null,
    footer: null,
  });

  const updateUserMovieData = ( key, value ) => {
    setUserMovieData(prevUserMovieData => {return { ...prevUserMovieData, [key]: value }} );
  }

  const updateModalData = ( key, value ) => {
    setModalData(prevModalContent => {return { ...prevModalContent, [key]: value }});
  }
  
  const getMovieList = () => {
    const responseUserMovieList = userMovieListService.getMovieList().list;
    updateUserMovieData('userMovieList', responseUserMovieList);
  }
  /**
   * handler for show details button on a MovieCard
   * @param {string} id 
   */
  const handleOnShowDetails = (id) => {
    updateUserMovieData('selectedMovieId', id); // maybe we dont need to set selected id here anymore
    updateModalData('body', <MovieDetails selectedMovieId={id} />);
    setShowModal(true);
  }

  /**
   * handler for delete confirmation buttons on MovieModal
   * @param {*} id 
   */
  const handleDeleteConfirmation = (id) => {
    // user confirms deletion, use id to remove 
    if (id) {
      userMovieListService.removeMovieFromList(id);
      getMovieList();
    }

    updateModalData('footer', null);
    setShowModal(false);
  }
  
  /**
   * handler for remove movie button on a MovieCard
   * @param {*} id 
   */
  const handleOnRemoveFromMovieList = (id) => {
    // set showModal true, set modal body to confirmation dialog
    if (!showModal) {
      const bodyContent = (
        <h2>Are you sure you want to remove this movie?</h2>
      );
      const footerContent = (
        <StyledButtonContainer>
          <RBButton variant="outline-danger" onClick={() => handleDeleteConfirmation(id)}>Yes</RBButton>
          <RBButton variant="outline-success" onClick={() => handleDeleteConfirmation()}>No</RBButton>
        </StyledButtonContainer>
      );
      updateModalData( 'body', bodyContent );
      updateModalData( 'footer', footerContent );
      setShowModal(true);
    }

  }

  /**
   * handler for close button on MovieModal
   */
  const handleModalClose = () => {
    updateUserMovieData('selectedMovieId', '');
    setDeleteConfirmation(false);
    setShowModal(false);
  }
  const renderUserMovieList = () => {
    const list = userMovieData.userMovieList;
    return list.length > 0 ? (
      <>
      {
        showModal && (
          <MovieModal
            show={showModal}
            onClose={handleModalClose}
          >
            { modalData }
          </MovieModal>
        )
      }
      {
        list.map(movie => (
          <MovieCard
            movie={movie}
            onShowDetails={handleOnShowDetails}
            onRemoveFromMovieList={handleOnRemoveFromMovieList}
            key={movie.imdbID}
          />
        ))
      }
      </>
    ) : <h2>No user movies found!</h2>

  }

  useEffect(() => {
    getMovieList();
    // console.log(movieData);
  }, []);

  return (
    <div className="movie-list-container">
      <h1>User Movie List</h1>
      {renderUserMovieList()}
    </div>
  )
}