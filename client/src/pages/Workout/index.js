import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import Button from '@material-ui/core/Button';
import RoutineModal from "../../components/RoutineModal";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardGroup from 'react-bootstrap/CardGroup'
import Typography from '@material-ui/core/Typography';

class Index extends React.Component {
	static propTypes = {};

	constructor(props) {
		super(props);

		this.state = {
            modalShow: false,
            modalEditName: false,
            modalEdit: false,
            routines: [
                {
                    id: 1,
                    name: "Legs",
                    note: "Note",
                    exercises: [
                        {
                            id: "1",
                            name: "Squat (Barbell)",
                            sets: [
                                {
                                    id: 1,
                                    previous: null,
                                    lift: null,
                                    reps: null
                                },
                                {
                                    id: 2,
                                    previous: null,
                                    lift: null,
                                    reps: null
                                },
                                {
                                    id: 3,
                                    previous: null,
                                    lift: null,
                                    reps: null
                                }
                            ]
                        },
                        {
                            id: "2",
                            name: "Leg Extension (Machine)",
                            sets: [
                                {
                                    id: 1,
                                    previous: null,
                                    lift: null,
                                    reps: null
                                },
                                {
                                    id: 1,
                                    previous: null,
                                    lift: null,
                                    reps: null
                                },
                                {
                                    id: 1,
                                    previous: null,
                                    lift: null,
                                    reps: null
                                }
                            ]
                        },
                        {
                            id: "3",
                            name: "Flat Leg Raise",
                            sets: [
                                {
                                    id: 1,
                                    previous: null,
                                    lift: null,
                                    reps: null
                                },
                                {
                                    id: 1,
                                    previous: null,
                                    lift: null,
                                    reps: null
                                },
                                {
                                    id: 1,
                                    previous: null,
                                    lift: null,
                                    reps: null
                                }
                            ]
                        },
                        {
                            id: "4",
                            name: "Standing Calf Raise (Dumbbell)",
                            sets: [
                                {
                                    id: 1,
                                    previous: null,
                                    lift: null,
                                    reps: null
                                },
                                {
                                    id: 1,
                                    previous: null,
                                    lift: null,
                                    reps: null
                                },
                                {
                                    id: 1,
                                    previous: null,
                                    lift: null,
                                    reps: null
                                }
                            ]
                        }
                    ]
                }
            ],
            routine: {
                id: null,
                name: "Untitled",
                note: null,
                exercises: [
                    {
                        id: "1",
                        name: "Arnold Press (Dumbell)",
                        sets: [
                            {
                                id: 1,
                                previous: null,
                                lift: null,
                                reps: null
                            }
                        ]
                    }
                ]
            }
        };

        this.setModalShow = this.setModalShow.bind(this);
		this.addSet = this.addSet.bind(this);
        this.addExercise = this.addExercise.bind(this);
        this.editName = this.editName.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSetKeyPress = this.handleSetKeyPress.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.addRoutine = this.addRoutine.bind(this);
        this.handleRoutineName = this.handleRoutineName.bind(this);
        this.handleRoutineNote = this.handleRoutineNote.bind(this);
	}

	componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

	setModalShow() {
        const routine = {
            id: null,
            name: "Untitled",
            note: null,
            exercises: [
                {
                    id: "1",
                    name: "Arnold Press (Dumbell)",
                    sets: [
                        {
                            id: 1,
                            previous: null,
                            lift: null,
                            reps: null
                        }
                    ]
                }
            ]
        }
		this.setState({ routine, modalShow: !this.state.modalShow, editModalName: false, modalEdit: false });
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
            this.setState({ editModalName: false })
        }
    }

	addExercise(e) {
        e.preventDefault();
		let exercises = this.state.routine.exercises;
		const exercise = {
			id: shortid.generate(),
			name: "Untitled",
			sets: [{ id: 1, previous: null, lift: null, reps: null }]
		};
        exercises.push(exercise);
        let routine = this.state.routine;
        routine.exercises = exercises;


		this.setState({ routine });
	}

	addSet(id) {
		let exercises = this.state.routine.exercises.filter(exer => exer.id !== id);
		let index = null;
		this.state.routine.exercises.forEach((exer, i) => {
			if (exer.id === id) {
				index = i;
				return;
			}
		});
		let exercise = this.state.routine.exercises.find(exercise => exercise.id === id);
		exercise.sets.push({ id: exercise.sets.length + 1, previous: null, lift: null, reps: null });
        exercises.splice(index, 0, exercise);
        let routine = this.state.routine;
        routine.exercises = exercises;

		this.setState({ routine });
    }
    
    editName() {
        this.setState({ editModalName: !this.state.editModalName })
    }

    handleRoutineName(e) {
        let routine = this.state.routine;
        routine.name = e.target.value;
        this.setState({ routine })
    }

    handleRoutineNote(e) {
        let routine = this.state.routine;
        routine.note = e.target.value;
        this.setState({ routine })
    }

    handleKeyPress(e, id) {
        if (e.key == "Enter" && e.target.value !== "") {
            let exercises = this.state.routine.exercises;
            let index = null;
            this.state.routine.exercises.forEach((exer, i) => {
                if (exer.id === id) {
                    index = i;
                    return;
                }
            });
            let exercise = this.state.routine.exercises.find(exercise => exercise.id === id);
            exercise.name = e.target.value;
            exercises.splice(index, 1, exercise);
            let routine = this.state.routine;
            routine.exercises = exercises;
            this.setState({ routine, editModalName: false });
        } else if (e.key == "Escape") {
            this.setState({ editModalName: false })
        }   
    }

    handleSetKeyPress(e, id, setId, type) {
        if (e.key == "Enter" && e.target.value !== "") {
            let exercises = this.state.routine.exercises;

            let index = null;
            this.state.routine.exercises.forEach((exer, i) => {
                if (exer.id === id) {
                    index = i;
                    return;
                }
            });


            let exercise = this.state.routine.exercises.find(exercise => exercise.id === id);
            let setIndex = null;
            let set = exercise.sets.find((set, ind) => {
                if ( set.id === setId) {
                    setIndex = ind;
                    return set;
                }
            });

            set[type] = e.target.value;
            console.log("SET", set[type])
            exercise.sets.splice(setIndex, 1, set);
            exercises.splice(index, 1, exercise);
            let routine = this.state.routine;
            routine.exercises = exercises;
            this.setState({ routine, editModalName: false });
        } else if (e.key == "Escape") {
            this.setState({ editModalName: false })
        }  
    }

    addRoutine() {
            let routines = this.state.routines;
            let routine = this.state.routine;
            routine.id = shortid.generate();
            const defaultRoutine = {
                id: null,
                name: "Untitled",
                note: null,
                exercises: [
                    {
                        id: "1",
                        name: "Arnold Press (Dumbell)",
                        sets: [
                            {
                                id: 1,
                                previous: null,
                                lift: null,
                                reps: null
                            }
                        ]
                    }
                ]
            }
            routines.push(routine);
            this.setState({routines, routine: defaultRoutine, modalShow: false });
    }

    editRoutine(id) {
        let routine = this.state.routines.find(routine => routine.id === id);
        this.setState({ routine, modalShow: true, modalEdit: true })
    }

	render() {
		return (
			<>
				<h1>Workout Page</h1>
				<Button variant="primary" onClick={() => this.setModalShow(true)}>
					Create Routine
				</Button>

                <h2>My Routines</h2>
                    <div style={{margin: "10px", display: "flex", flexWrap: "wrap"}} >
                    {
                        this.state.routines.map(routine => {
                            return (
                                    <Card onClick={() => this.editRoutine(routine.id)} key={shortid.generate()} style={{ textAlign: "left", width: 'auto', margin: "10px" }}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {routine.name}
                                            </Typography>
                                            {
                                                routine.exercises.map(exercise => (
                                                    <Typography key={shortid.generate()} variant="body2" color="textSecondary" component="p" style={{padding: "0", margin: "0"}}>
                                                        {exercise.sets.length} x {exercise.name}
                                                    </Typography>
                                                ))
                                            }
                                            <Typography className="mb-2 text-muted" style={{fontStyle: "italic", marginTop: "10px"}}>{routine.note}</Typography>
                                        </CardContent>
                                    </Card>
                            )
                        })
                    }
                    </div>

				<RoutineModal
                    show={this.state.modalShow}
					onHide={() => this.setModalShow(false)}
                    exercises={this.state.routine.exercises}
                    routine={this.state.routine}
					addExercise={this.addExercise}
                    addSet={this.addSet}
                    editModalName={this.state.editModalName}
                    editName={this.editName}
                    handleKeyPress={this.handleKeyPress}
                    setWrapperRef={this.setWrapperRef}
                    handleClickOutside={this.handleClickOutside}
                    handleSetKeyPress={this.handleSetKeyPress}
                    addRoutine={this.addRoutine}
                    handleRoutineName={this.handleRoutineName}
                    handleRoutineNote={this.handleRoutineNote}
                    modalEdit={this.state.modalEdit}
				/>
			</>
		);
	}
}

export default Index;
