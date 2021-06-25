import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form:{
      codigo: '',
      nombre: '',
      fechaNacimiento: '',
      estadoCivil: ''
    },
    id: 0
  };

  peticionGet = () => {
    firebase.child("clientes").on("value", (cliente) => {
      if (cliente.val() !== null) {
        this.setState({ ...this.state.data, data: cliente.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };

  peticionPost=()=>{
    firebase.child("clientes").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar: false});
  }

  peticionPut=()=>{
    firebase.child(`clientes/${this.state.id}`).set(
      this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalEditar: false});
  }

  peticionDelete=()=>{
    if(window.confirm(`¿Estás seguro que deseas eliminar el canal ${this.state.form && this.state.form.cliente}?`))
    {
    firebase.child(`clientes/${this.state.id}`).remove(
      error=>{
        if(error)console.log(error)
      });
    }
  }

  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }})
    console.log(this.state.form);
  }

  seleccionarCanal=async(canal, id, caso)=>{

    await this.setState({form: canal, id: id});

    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    return (
      <div className="App">
        <br />
        <button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Insertar</button>
        <br />
        <br />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Fecha de Nacimiento</th>
              <th>Estado Civil</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(i=>{
             // console.log(i);
              return <tr key={i}>
                <td>{this.state.data[i].codigo}</td>
                <td>{this.state.data[i].nombre}</td>
                <td>{this.state.data[i].fechaNacimiento}</td>
                <td>{this.state.data[i].estadoCivil}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>this.seleccionarCanal(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                  <button className="btn btn-danger" onClick={()=>this.seleccionarCanal(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
                </td>

              </tr>
            })}
          </tbody>
        </table>


        <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>Insertar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Codigo: </label>
          <br />
          <input type="text" className="form-control" name="codigo" onChange={this.handleChange}/>
          <br />
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={this.handleChange}/>
          <br />
          <label>Fecha de Nacimiento: </label>
          <br />
          <input type="text" className="form-control" name="fechaNacimiento" onChange={this.handleChange}/>
          <br />
          <label>Estado Civil: </label>
          <br />
          <input type="text" className="form-control" name="estadoCivil" onChange={this.handleChange}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>



    <Modal isOpen={this.state.modalEditar}>
      <ModalHeader>Editar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Codigo: </label>
          <br />
          <input type="text" className="form-control" name="codigo" onChange={this.handleChange} value={this.state.form && this.state.form.codigo}/>
          <br />
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={this.handleChange} value={this.state.form && this.state.form.nombre}/>
          <br />
          <label>Fecha Nacimiento: </label>
          <br />
          <input type="text" className="form-control" name="fechaNacimiento" onChange={this.handleChange} value={this.state.form && this.state.form.fechaNacimiento}/>
          <br />
          <label>Estado Civil: </label>
          <br />
          <input type="text" className="form-control" name="estadoCivil" onChange={this.handleChange} value={this.state.form && this.state.form.estadoCivil}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>
      </div>
    );
  }
}

export default App;
