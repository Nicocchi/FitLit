import React, { Component } from 'react'
import shortid from "shortid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";

export default class Routine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalEditName: false,
            modalEditLift: false,
            modalEditReps: false,
        }

        this.togglePrevious = this.togglePrevious.bind(this);
        this.toggleLift = this.toggleLift.bind(this);
        this.toggleReps = this.toggleReps.bind(this);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    
    togglePrevious() {
        this.setState({ modalEditName: !this.state.modalEditName, modalEditLift: false, modalEditReps: false })
    }

    toggleLift() {
        this.setState({ modalEditLift: !this.state.modalEditLift, modalEditName: false, modalEditReps: false })
    }

    toggleReps() {
        this.setState({ modalEditReps: !this.state.modalEditReps, modalEditName: false, modalEditLift: false })
    }
	
	/**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ modalEditName: false, modalEditLift: false, modalEditReps: false })
        }
	}
	
	handleKeyPress(e, id, setId, type) {
		if (e.key == "Enter" && e.target.value !== "") {
			this.props.handleSetKeyPress(e, id, setId, type)
			this.setState({ modalEditName: false, modalEditLift: false, modalEditReps: false })
		}
		
	}

    render() {
        return (
			<tr key={shortid.generate()}>
                <td>{this.props.set.id}</td>
                {
					this.state.modalEditName ?
					<InputGroup className="mb-3" ref={this.setWrapperRef}>
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl autoFocus onKeyPress={e => this.handleKeyPress(e, this.props.id, this.props.set.id, "previous")} placeholder={this.props.set.previous} aria-label="Set-Previous" aria-describedby="basic-addon1" />
					</InputGroup>
					: <td onDoubleClick={this.togglePrevious}>{this.props.set.previous}</td>
				}
                {
					this.state.modalEditLift ?
					<InputGroup className="mb-1" ref={this.setWrapperRef}>
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl autoFocus onKeyPress={e => this.handleKeyPress(e, this.props.id, this.props.set.id, "lift")} placeholder={this.props.set.lift} aria-label="Set-Lift" aria-describedby="basic-addon1" />
					</InputGroup>
					: <td onDoubleClick={this.toggleLift}>{this.props.set.lift}</td>
				}
                {
					this.state.modalEditReps ?
					<InputGroup className="mb-1" ref={this.setWrapperRef}>
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl autoFocus onKeyPress={e => this.handleKeyPress(e, this.props.id, this.props.set.id, "reps")} placholder={this.props.set.reps} aria-label="Set-Reps" aria-describedby="basic-addon1" />
					</InputGroup>
					: <td onDoubleClick={this.toggleReps}>{this.props.set.reps}</td>
				}
            </tr>
        )
    }
}
