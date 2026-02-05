import { useEffect, useState } from "react";

function CommentForm({ onSubmit, editingComment }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    body: "",
  });

  useEffect(() => {
    if (editingComment) {
      setFormData({
        name: editingComment.name,
        email: editingComment.email,
        body: editingComment.body,
      });
    }
  }, [editingComment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "", body: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <br />

      <textarea
        name="body"
        placeholder="Comment"
        value={formData.body}
        onChange={handleChange}
        required
      />
      <br />

      <button type="submit">
        {editingComment ? "Update Comment" : "Add Comment"}
      </button>
    </form>
  );
}

export default CommentForm;
