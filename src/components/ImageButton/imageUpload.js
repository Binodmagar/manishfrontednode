import React, { Component } from 'react'
import { Button } from 'reactstrap'

class ImageUploadButton extends Component {
    render() {
        return (
            <Button color='success' onClick={this.props.uploadImage} block>Upload Picture</Button>
        )
    }
}

export default ImageUploadButton;
