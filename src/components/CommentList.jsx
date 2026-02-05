function CommentList({ comments, onEdit, onDelete }) {
  return (
    <div>
      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
          }}
        >
          <h4>{comment.name}</h4>
          <p>{comment.email}</p>
          <p>{comment.body}</p>

          <button onClick={() => onEdit(comment)}>Edit</button>
          <button onClick={() => onDelete(comment.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
