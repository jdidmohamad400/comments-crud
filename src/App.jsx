import { useEffect, useState } from "react";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";

function App() {
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?_limit=10")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  
  const handleSubmit = (comment) => {
    if (editingComment) {
      
      fetch(
        `https://jsonplaceholder.typicode.com/comments/${editingComment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        }
      ).then(() => {
        setComments(
          comments.map((c) =>
            c.id === editingComment.id ? { ...comment, id: c.id } : c
          )
        );
        setEditingComment(null);
      });
    } else {
      
      fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      })
        .then((res) => res.json())
        .then((newComment) => {
          setComments([{ ...newComment, id: Date.now() }, ...comments]);
        });
    }
  };


  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "DELETE",
    }).then(() => {
      setComments(comments.filter((c) => c.id !== id));
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Comments CRUD</h1>

      <CommentForm
        onSubmit={handleSubmit}
        editingComment={editingComment}
      />

      <CommentList
        comments={comments}
        onEdit={setEditingComment}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
