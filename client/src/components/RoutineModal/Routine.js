import React, { Component } from 'react'
import shortid from "shortid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import Exercise from "./Exercise";

export default class Routine extends Component {
    constructor(props) {
        super(props);
        this.state = {
			modalEditName: false,
        }

		this.editName = this.editName.bind(this);
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

    editName() {
        this.setState({ modalEditName: !this.state.modalEditName })
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
            this.setState({ modalEditName: false })
        }
	}
	
	handleKeyPress(e, id) {
		if (e.key == "Enter" && e.target.value !== "") {
			this.props.handleKeyPress(e, id)
			this.setState({ modalEditName: false })
		}
		
	}

    render() {
        return (
			<div>
				<br />
				{
					this.state.modalEditName ?
					<InputGroup className="mb-3" ref={this.setWrapperRef}>
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl autoFocus onKeyPress={e => this.handleKeyPress(e, this.props.exercise.id)} placeholder={this.props.exercise.name} aria-label="Exercise-Name" aria-describedby="basic-addon1" />
					</InputGroup>
					: <h4 onDoubleClick={this.editName} >{this.props.exercise.name}</h4>
				}
				<Table responsive>
					<thead>
						<tr>
							<th>Set</th>
							<th>Previous</th>
							<th>LBS</th>
							<th>Reps</th>
						</tr>
					</thead>
					<tbody>
						{this.props.exercise.sets.map(set => {
							return (
								<Exercise id={this.props.exercise.id} set={set} handleSetKeyPress={this.props.handleSetKeyPress} />
							);
						})}
					</tbody>
				</Table>
				<Button onClick={() => this.props.addSet(this.props.exercise.id)}>Add Set</Button>
			</div>
        )
    }
}
