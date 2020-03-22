import React, { Component } from 'react';
import axios from 'axios';

import Header from '../../components/template/Header';
import TodoList from './todoList';
import TodoForm from './todoForm';

const URL = 'http://localhost:3003/api/todos'

export default class todo extends Component {

	constructor(props) {
		super(props);
		this.state = {
			description: '',
			list: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleApp = this.handleApp.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
		this.handleMarkAsPending = this.handleMarkAsPending.bind(this);

		this.refresh();
	}

	handleChange(e) {
		this.setState({...this.state, description: e.target.value})
	}

	refresh() {
		axios.get(`${URL}?sort=-createdAt`)
		.then(res => this.setState({...this.state, description: '', list: res.data }));
	}

	handleRemove(todo) {
		axios.delete(`${URL}/${todo._id}`)
					.then(res => this.refresh())
	}

	handleMarkAsDone(todo) {
		axios.put(`${URL}/${todo._id}`, {...todo, done: true})
					.then(res => this.refresh())
	}

	handleMarkAsPending(todo) {
		axios.put(`${URL}/${todo._id}`, {...todo, done: false})
		.then(res => this.refresh())
	}

	handleApp() {
		const description = this.state.description;
		axios.post(URL, {description})
		.then(res => this.refresh());
	}

  render() {
    return (
    <div>
      <Header name="Todo" small="Sign up"/>
			<TodoForm
			handle={this.handleApp}
			description={this.state.description}
			handleChange={this.handleChange}/>
			<TodoList
			list={this.state.list}
			handleRemove={this.handleRemove} handleMarkAsDone={this.handleMarkAsDone}
			handleMarkAsPending={this.handleMarkAsPending}/>
    </div>
    );
  }
}