import React,{Component} from 'react';




class FetchTodo extends Component {
  constructor(props){
    super();
    this.props = props;
    this.state = {
      data : [],
      productUpdated : {}
    };
    this.handleCompleted = this.handleCompleted.bind(this);
    this.DeleteTodo = this.DeleteTodo.bind(this);
  }

 async handleCompleted(event) {
    

    await  this.setState({
       productUpdated : Object.assign({}, 
        { _id : event.target.id, completed : event.target.checked})
     })
     
     console.log(this.state.productUpdated)
    
    await fetch('http://localhost:3001/api/updateTodo', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.productUpdated),
    })
    .then((response) => response.text())
    .then((text) => {
      console.log('Success:', text);
      window.location.reload()
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }
 async DeleteTodo(event) {
    
  
    await  this.setState({
       productUpdated : Object.assign({}, this.state.addressInfo, 
        { _id : event.target.id})
     })
     
     console.log(this.state.productUpdated)
    
    await fetch('http://localhost:3001/api/deleteTodo', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.productUpdated),
    })
    .then((response) => response.text())
    .then((text) => {
      console.log('Success:', text);
      window.location.reload()
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }

  render() {
    
    let todos = this.props.allData.map(element => 
    <li key ={element._id}>
      
      <div className="form-check" style={{display:'flex',justifyContent:'center',lineHeight:'35px'}}>
         <label style={{textDecorationLine: element.completed ? 'line-through' : ''}} className="form-check-label"> 
        <input className="checkbox" type="checkbox"  checked={element.completed}
            onChange = { this.handleCompleted } id = {element._id}/>
          {element.title}
        <i className="input-helper" /></label>
        <i className="fa fa-edit"
        id={element._id} onClick={() => {this.props.sendIdtoApp(element._id)}}
        data-toggle="modal" data-target="#exampleModalCenter"
        style={{lineHeight:'25px',marginLeft:'10px', cursor: 'pointer'}}/>
        </div>
         <i className="remove mdi mdi-close-circle-outline" id = {element._id} onClick={ this.DeleteTodo }/>
    </li>
    );
    return(
      <div>
        <ul className="d-flex flex-column-reverse todo-list">
            {todos}
        </ul>
      </div>
    )
    
  }
}

class PostTodo extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      title : e.target.value
    })
  }

  handleSubmit(e) {
    
    fetch('http://localhost:3001/api/createTodo', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
      
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="add-items d-flex"> 
            <input type="text" value = {this.state.value} onChange = {this.handleChange} className="form-control todo-list-input" placeholder="What do you need to do today?" /> 
            <button type="submit" className="add btn btn-primary font-weight-bold todo-list-add-btn">Add</button> 
          </div>
        </form>
        
      </div>
    );
  }
}
class ModalUpdate extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      todoUpdated : {},
        };
    this.UpdateTodo = this.UpdateTodo.bind(this);
    this.setTodoNeedUpdated = this.setTodoNeedUpdated.bind(this);
    this.setTodoNeedUpdated1 = this.setTodoNeedUpdated1.bind(this);
  }

   async UpdateTodo(event) {
    
    await fetch('http://localhost:3001/api/updateTodo', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.todoUpdated),
    })
    .then((response) => response.text())
    .then((text) => {
      console.log('Success:', text);
      window.location.reload()
    })
    .catch((error) => {
      console.error('Error:', error);
    });


  }

  async setTodoNeedUpdated(event) {
    let todo = [this.props.TodoUpdate];
    await  this.setState({
      todoUpdated : Object.assign({}, ...todo, {title : event.target.value})
    })
    
  }
  async setTodoNeedUpdated1(event) {
    let todo = [this.props.TodoUpdate];
    await  this.setState({
      todoUpdated : Object.assign({}, ...todo, {completed : event.target.value})
    })
    // console.log(event)
  }

   
  
  
  render() {
    return (
      <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form onSubmit={ this.UpdateTodo }  className="modal-content">
            <div className="modal-body form-inline">
              <div className="form-group mb-2">
                <label htmlFor="staticEmail2" className="sr-only">Email</label>
                <input onChange = {this.setTodoNeedUpdated} type="text" className="form-control" id="staticEmail2" defaultValue={this.props.TodoUpdate.title} />
              </div>
              <div className="form-group mb-2 ml-4">
                <label htmlFor="inputPassword2" className="ml-4">Completed : </label>
                <select onChange = {this.setTodoNeedUpdated1} id="inputState" className="form-control ml-2" >
                    <option value={this.props.TodoUpdate.completed}>
                      {this.props.TodoUpdate.completed === true ? 'true' : 'false'}
                    </option>
                    <option value={!this.props.TodoUpdate.completed}>
                    {!this.props.TodoUpdate.completed === true ? 'true' : 'false'}
                    </option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </div>

          </form>
        </div>
      </div>
    
    );
  }
}



class App extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      allData : [],
      TodoUpdate : {}
    }
  }
  async componentDidMount() {
    await  fetch("http://localhost:3001/api/todos",
    {
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *cors, same-origin
     cache: 'no-cache', 
     credentials: 'same-origin', // include, *same-origin, omit
     headers: {
       'Content-Type': 'application/json'
     }
   }
    )
       .then(res => res.json())
       .then(
         (data) => {
           this.setState({
             allData : data
           });
         }
       )
   }

  async setIdtoState(id) {
    let todo = this.state.allData.filter((todo) => todo._id === id)
    await  this.setState({
      TodoUpdate : Object.assign({}, ...todo )
    })
  }

  clearCompletedTodo() {
    fetch("http://localhost:3001/api/clearCompleted",
    {
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *cors, same-origin
     cache: 'no-cache', 
     credentials: 'same-origin', // include, *same-origin, omit
     headers: {
       'Content-Type': 'application/json'
     }
   }
    ).then(res => {
      res.json()
      window.location.reload();
    })
  }


  render() {
  return (
    <div className="App">
        <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-lg-12">
              <div className="card px-3">
                <div className="card-body">
                  <h4 className="card-title">Awesome Todo list</h4>
                  <PostTodo />
                  <div className="list-wrapper">
                  <FetchTodo allData ={this.state.allData} sendIdtoApp = { (id) => this.setIdtoState(id) }/>
                  </div>
                  <button onClick = {this.clearCompletedTodo} type="button" class="btn btn-primary mt-3">Clear Completed Todo</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalUpdate allData ={this.state.allData} TodoUpdate = {this.state.TodoUpdate}/>
    </div>
  );
  }
}

export default App;
