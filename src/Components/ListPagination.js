export default (props) => {
    return (
        <div className='d-flex justify-content-between py-2'>
            <button className="btn btn-link" onClick={props.handlePrevious}>Previous</button>
            <button className="btn btn-link text-decoration-none" onClick={props.handleNext}>Next</button>
        </div>
    )
}