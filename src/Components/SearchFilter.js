export default (props) => {
    return (
        <div className="d-inline pb-4">
            <p className="pb2">Filter by name</p>
            <input className="form-control filter" placeholder="Enter name here" onChange={props.handleSearch} value={props.searchValue || ''} />
        </div>
    )
}