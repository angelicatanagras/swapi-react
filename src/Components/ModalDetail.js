import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'

export default (props) => {
  if (!props.isOpen) {
    return null;
  }

  const [films, setFilms] = useState([])
  function getFilms(filmsApi) {
    let filmsArray = []
    if (!(props.item.films === undefined) && props.item.films.length > 0) {
      filmsApi.forEach(async data => {
        const response = await fetch(data)
        let film = await response.json()
        filmsArray.push(film.title)
        setFilms([...filmsArray])
      })
    }
  }
  useEffect(() => {
    setFilms(getFilms(props.item.films))
  }, [])

  return (
    <Modal size="lg" centered show={props.isOpen} onHide={props.closeModal}>
      <Modal.Header className='d-flex justify-content-center border-bottom-0'>
        <h2 className='fw-bold'>{props.item.name}</h2>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column text-center'>
        <div className='p-2 m-2'>
          <p className='fw-bold mb-1'>Appeared In: </p>
          {
            films && films.map(film => {
              return <p className='mb-0'>{film}</p>
            })
          }
        </div>
        <p className='fw-bold mb-2'>Home planet: <span className='fw-normal'>{props.item.homeworld}</span></p>
        <p className='fw-bold mb-2'>Year of Birth: <span className='fw-normal'>{props.item.birth_year}</span></p>
        <p className='fw-bold mb-2'>Eye Color: <span className='fw-normal'>{props.item.eye_color}</span></p>
      </Modal.Body>
      <Modal.Footer className='border-top-0 d-flex justify-content-center'>
        <Nav.Link className='nav-link text-decoration-underline' onClick={props.closeModal}>
          Close
        </Nav.Link>
      </Modal.Footer>
    </Modal>
  );
}
