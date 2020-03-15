import React, { Component } from 'react'
import shortid from "shortid";
import Modal from "react-bootstrap/Modal";
import Button from '@material-ui/core/Button';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
// import Table from "react-bootstrap/Table";
import Exercise from "./Exercise";
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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
					<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Exercise name"
					type="text"
					fullWidth
					onKeyPress={e => this.handleKeyPress(e, this.props.exercise.id)}
				  />
					: <h4 onDoubleClick={this.editName} >{this.props.exercise.name}</h4>
				}
				<Table responsive>
					<TableHead>
						<TableRow>
							<TableCell>Set</TableCell>
							<TableCell>Previous</TableCell>
							<TableCell>LBS</TableCell>
							<TableCell>Reps</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.exercise.sets.map(set => {
							return (
								<Exercise key={shortid.generate()} id={this.props.exercise.id} set={set} handleSetKeyPress={this.props.handleSetKeyPress} />
							);
						})}
					</TableBody>
				</Table>
				<Button variant="success" onClick={() => this.props.addSet(this.props.exercise.id)} style={{marginTop: "10px"}}>Add Set</Button>
			</div>
        )
    }
}
