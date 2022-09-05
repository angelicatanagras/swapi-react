import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import ListPagination from './Components/ListPagination'
import ModalDetail from './Components/ModalDetail'
import SearchFilter from './Components/SearchFilter'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            item: {},
            next: null,
            previous: null,
            searchValue: null,
            showModal: false,
        }
    }

    componentDidMount() {
        this.handleRebuild()
    }

    handleSearch = (e) => {
        const input = e.target.value
        let url = "https://swapi.dev/api/people/?search=" + encodeURIComponent(input)
        this.setState({ searchValue: input }, () => { this.handleRebuild(url) })
    }

    handleRebuild(url) {
        url = url || 'https://swapi.dev/api/people'
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    items: data.results,
                    next: data.next,
                    previous: data.previous,
                })
            })
    }

    openModal = async (detail) => {
        // retrieve homeworld data
        const homeworld_response = await fetch(detail.homeworld)
        const homeworld = await homeworld_response.json()

        let item = {
            name: detail.name,
            films: detail.films,
            homeworld: homeworld.name,
            birth_year: detail.birth_year,
            eye_color: detail.eye_color
        }
        this.setState({ showModal: true, item: item })
    };

    closeModal = () => {
        this.setState({ showModal: false, item: {} })
    };

    next = () => {
        this.handleRebuild(this.state.next)
    }

    previous = () => {
        this.handleRebuild(this.state.previous)
    }

    render() {
        const { items, item, showModal } = this.state
        return (
            <div className="App-header display-flex flex-column justify-content-center">
                <div className='d-flex justify-content-center'>
                    <img src="./obiwan.png" className="image-logo" alt="starwars"></img>
                </div>
                <div className="d-flex flex-column justify-content-center main-center">
                    <h1 className="fw-bold text-center py-2">Star Wars Character</h1>
                    <SearchFilter handleSearch={this.handleSearch} searchValue={this.state.searchValue} />
                    {
                        !(items.length) > 0 &&
                        <p>Nothing to see here —</p>
                    }
                    <ListGroup className='d-flex justify-content-center'>
                        {
                            items.map((item, key) => (
                                <ListGroup.Item key={key} role="button" className="list-item fw-bold" onClick={() => this.openModal(item)}>
                                    {item.name}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                    <ListPagination handleNext={this.next} handlePrevious={this.previous} />
                </div>

                <ModalDetail closeModal={this.closeModal} isOpen={showModal} item={item} />
            </div>
        )
    }
}

export default App;
