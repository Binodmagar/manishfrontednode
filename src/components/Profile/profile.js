import React, { Component } from 'react'
import Axios from 'axios'
import { Form, FormGroup, Input, Button, Label, CustomInput, Container } from 'reactstrap'
import ImageUploadButton from '../ImageButton/imageUpload'
import Footers from '../Footer/footer'
import './profile.css';
// import FileUploadButton from './FileUploadButton'

export default class UserProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('user_token')}` }
            },
            selectedFile: null,
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3003/users/me', this.state.config)
            .then((response) => {
                this.setState({
                    user: response.data
                })
            });
    }

    handleFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('myFile', this.state.selectedFile)
        Axios.post('http://localhost:3003/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    user: { ...this.state.user, image: response.data.filename }
                })
            }).catch((err) => console.log(err.response))
    }

    updateUser = (e) => {
        e.preventDefault();
        Axios.put('http://localhost:3003/users/me', this.state.user, this.state.config)
            .then((response) =>
             console.log(response.data))
             alert("update successfully!!")
            .catch((err) => console.log(err.response))
         this.props.history.push('/home');
    }

    handleChange(e) {
        this.setState({
            user: { ...this.state.user, [e.target.name]: e.target.value }
        })
    }

    render() {
        if (this.state.user === null) {
            return <h3>Loading ...</h3>
        } else {
            return (
                <div>
                    <Container className='updateProfile'>
                        <Form>
                        <h2>
						<strong>Profile</strong>
					</h2>
                        <FormGroup>
                                <img className='img-thumbnail'
                                    width='400' src={`http://localhost:3003/uploads/${this.state.user.image}`}
                                    alt="profile" />
                                <CustomInput type='file' id='profilePic'
                                    onChange={this.handleFileSelect} />
                                {this.state.selectedFile ? (<ImageUploadButton
                                    uploadFile={this.uploadImage} />) : null}
                            </FormGroup>
                            <FormGroup>
                                <Label for='firstName'>First Name</Label>
                                <Input type='text'
                                    id="firstName"
                                    name='firstName'
                                    value={this.state.user.firstName}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='lastName'>Last Name</Label>
                                <Input type='text' id='lastName'
                                    name='lastName'
                                    value={this.state.user.lastName}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='mobileNumber'>Mobile Number</Label>
                                <Input type='Number' id='mobileNumber'
                                    name='mobileNumber'
                                    value={this.state.user.mobileNumber}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='email'>Email</Label>
                                <Input type='text' id='email'
                                    name='email'
                                    value={this.state.user.email}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for='password'>Password</Label>
                                <Input type='text' id='password'
                                    name='password'
                                    value={this.state.user.password}
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <Button color='danger' onClick={this.updateUser} block>Update User</Button>
                        </Form>
                    </Container>
                    <Footers />
                </div>
            )
        }
    }
}
