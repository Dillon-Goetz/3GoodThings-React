//photo upload to highlight the day. 
import React, { Component } from "react";
import { Storage } from "appwrite";


class App extends Component{
  state = {
    selectedFile: null
  }

  fileSelectedHandler = event => {
    console.log(event.target.files[0])
  }
  fileUploadHandler = () => {

  }
}
const AddPhoto: React.FC = () => {
    return (
      <div>
        {/* Placeholder content - you can leave this empty for now */}
        <input type="file" accept="image/*" onChange={this.fileSelectedHandler} ></input>
        <button onClick={this.fileUploadHandler}></button>
      </div>
    );
  };
  
  export default AddPhoto;