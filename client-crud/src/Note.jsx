import React, { useEffect, useState } from "react";

const Note = () => {
  // For Title & Desc input Handling
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  //   New item storing
  const [notes, setNotes] = useState([]);

  //   Error & Sucess Handling
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Updating Notes
  const [editId, setEditId] = useState(-1);

  // For Editing Notes
  const [edittitle, setEditTitle] = useState("");
  const [editdesc, setEditDesc] = useState("");

  const apiUrl = "https://mern-crud-server-159q.onrender.com";
  // Add Item Control
  const handlesubmit = () => {
    setError("");
    if (title.trim() !== "" && desc.trim() !== "") {
      //  API Integration
      fetch(apiUrl + "/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, desc }),
      })
        .then((res) => {
          if (res.ok) {
            // add item to list
            setNotes([...notes, { title, desc }]);
            setTitle("");
            setDesc("");
            setMessage("Item added Successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
          } else {
            // set error
            setError("unable to create a Note");
          }
        })
        .catch(() => {
          setError("unable to create a Note");
        });
    }
  };

  // GETTING ALL NOTES API

  useEffect(() => {
    getnotes();
  }, []);

  const getnotes = () => {
    fetch(apiUrl + "/notes")
      .then((res) => res.json())
      .then((res) => {
        setNotes(res);
      });
  };

  const handleedit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDesc(item.desc);
  };

  const handleeditcancel = () => {
    setEditId(-1);
  };

  // Updating Notes
  const handleupdate = () => {
    setError("");
    if (edittitle.trim() !== "" && editdesc.trim() !== "") {
      //  API Integration
      fetch(apiUrl + "/notes/" + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: edittitle, desc: editdesc }),
      })
        .then((res) => {
          if (res.ok) {
            // update item to list
            const updatednotes = notes.map((item) => {
              if (item._id == editId) {
                item.title = edittitle;
                item.desc = editdesc;
              }
              return item;
            });
            setNotes(updatednotes);
            setEditTitle("");
            setEditDesc("");
            setMessage("Item updated Successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            setEditId(-1);
          } else {
            // set error
            setError("unable to create a Note");
          }
        })
        .catch(() => {
          setError("unable to create a Note");
        });
    }
  };

  // Deleting Notes

  const handledelete = (id) => {
    if (window.confirm("Are you sure You want to Delete this Note")) {
      fetch(apiUrl + "/notes" + id, {
        method: "DELETE",
      }).then(() => {
        const updatednotes = notes.filter((item) => item._id !== id);
        setNotes(updatednotes);
      });
    }
  };

  return (
    <>
      <div className="row p-3 bg-warning text-light">
        <h1>Note App</h1>
      </div>
      <div className="row">
        <h3>Add Item</h3>
        {message && <p className="text-warning">{message}</p>}

        <div className="form-group d-flex gap-2">
          <input
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <input
            className="form-control"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
          />
          <button className="btn btn-dark" onClick={handlesubmit}>
            Submit
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
      <div className=" row mt-3">
        <h3>Tasks</h3>
        <div className=" col-md-6">
          <ul className=" list-group ">
            {notes.map((item) => (
              <li className=" list-group-item bg-success d-flex align-items-center text-light justify-content-between my-2">
                <div className=" d-flex me-2 flex-column">
                  {editId == -1 || editId !== item._id ? (
                    <>
                      <span className=" fw-bold">{item.title}</span>
                      <span>{item.desc}</span>
                    </>
                  ) : (
                    <>
                      <div className="form-group d-flex gap-2">
                        <input
                          className="form-control"
                          placeholder="Title"
                          value={edittitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          type="text"
                        />
                        <input
                          className="form-control"
                          placeholder="Description"
                          value={editdesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          type="text"
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="d-flex gap-2">
                  {editId == -1 || editId !== item._id ? (
                    <button
                      className=" btn btn-info"
                      onClick={() => handleedit(item)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button onClick={handleupdate} className=" btn btn-info">
                      Update
                    </button>
                  )}

                  {editId == -1 || editId !== item._id ? (
                    <button
                      className=" btn btn-danger"
                      onClick={() => handledelete(item._id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className=" btn btn-danger"
                      onClick={handleeditcancel}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Note;
