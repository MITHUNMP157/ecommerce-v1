import React, { useState, useRef } from "react";

export default function Profile() {
  const initialUser = {
    id: "EMP-001",
    name: "Mithunupriyan",
    job: "Front End Developer (MERN)",
    email: "mithunpriyan157@example.com",
    phone: "+91 86756 74309",
    location: "Chennai, India",
    about:
      "Passionate frontend dev who loves React, clean UI and solving problems.",
  };

  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);
  const [temp, setTemp] = useState(initialUser);
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  const toggleEdit = () => {
    if (editMode) {
      setTemp(user);
    }
    setEditMode((v) => !v);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemp((t) => ({ ...t, [name]: value }));
  };

  const handleSave = () => {
    if (!temp.name.trim()) {
      alert("Name cannot be empty");
      return;
    }
    setUser(temp);
    setEditMode(false);
  };

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  const clearAvatar = () => {
    setAvatar(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card shadow" style={{ width: 760 }}>
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
            <div style={{ textAlign: "center" }}>
              <div
                className="rounded-circle border"
                style={{
                  width: 160,
                  height: 160,
                  overflow: "hidden",
                  display: "inline-block",
                  background: "#f1f1f1",
                }}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div style={{ paddingTop: 48, color: "#777" }}>
                    <strong style={{ fontSize: 18 }}>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </strong>
                    <div style={{ fontSize: 12, marginTop: 6 }}>No photo</div>
                  </div>
                )}
              </div>

              <div className="mt-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatar}
                  style={{ display: "none" }}
                />
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                >
                  Upload
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={clearAvatar}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="card-title mb-1">{user.name}</h5>
                  <small className="text-muted">{user.job}</small>
                </div>

                <div>
                  <button
                    className="btn btn-sm btn-outline-warning me-2"
                    onClick={toggleEdit}
                  >
                    {editMode ? "Cancel" : "Edit"}
                  </button>
                  {editMode ? (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  ) : null}
                </div>
              </div>

              <hr />

              {!editMode ? (
                <div className="row">
                  <div className="col-6 mb-2">
                    <strong>Employee ID:</strong> {user.id}
                  </div>
                  <div className="col-6 mb-2">
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div className="col-6 mb-2">
                    <strong>Phone:</strong> {user.phone}
                  </div>
                  <div className="col-6 mb-2">
                    <strong>Location:</strong> {user.location}
                  </div>

                  <div className="col-12 mt-3">
                    <strong>About</strong>
                    <p className="mt-2">{user.about}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        name="name"
                        value={temp.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-2">
                      <label className="form-label">Job Title</label>
                      <input
                        className="form-control"
                        name="job"
                        value={temp.job}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-2">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        name="email"
                        value={temp.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-2">
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        name="phone"
                        value={temp.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 mb-2">
                      <label className="form-label">Location</label>
                      <input
                        className="form-control"
                        name="location"
                        value={temp.location}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 mb-2">
                      <label className="form-label">About</label>
                      <textarea
                        className="form-control"
                        name="about"
                        value={temp.about}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-3 d-flex gap-2">
                <a href="#" className="btn btn-sm btn-warning">
                  Message
                </a>
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
