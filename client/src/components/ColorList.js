import React, { useState, useEffect } from "react";
import axios from "axios";
import {axiosWithAuth} from '../ultils/axiosWithAuth'
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = props => {
  console.log(props)
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newFriend, setNewFriend] = useState({
    color: '',
    code:{
      hex:''
    },
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
  

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  };
  const handleChanges = e => {
    setNewFriend({
        ...newFriend, [e.target.name]: e.target.value
    })
    console.log('new friend', newFriend)
}
  const handleSubmitColorFriend = e => {
    e.preventDefault()
    axiosWithAuth().post('/api/colors', newFriend)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      
}
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {props.colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={(e => handleSubmitColorFriend(e))}>
                <input
                    type='text'
                    name='color'
                    value={newFriend.color}
                    placeholder='Color'
                    onChange={(e => handleChanges(e))}
                />
                
                <input
                    type='text'
                    name='code'
                    value={newFriend.code.hex}
                    placeholder='hex'
                    onChange={(e => handleChanges(e))}
                />
                <button>Add Friend</button>
            </form>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => {
              setEditing(false)
              }}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      
    </div>
  );
};

export default ColorList;
