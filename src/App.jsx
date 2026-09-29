import { useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    department: "",
    gender: "",
    phone: "",
    localAddress: "",
    permanentAddress: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Edit Employee
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.employeeId ||
      !form.department ||
      !form.gender ||
      !form.phone ||
      !form.localAddress ||
      !form.permanentAddress
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      setEmployees(
        employees.map((employee) =>
          employee.employeeId === editingId ? form : employee
        )
      );
      setEditingId(null);
    } else {
      setEmployees([...employees, form]);
    }

    setForm({
      name: "",
      employeeId: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: "",
    });
  };

  // Delete Employee
  const handleDelete = (id) => {
    setEmployees(
      employees.filter((employee) => employee.employeeId !== id)
    );
  };

  // Edit Employee
  const handleEdit = (employee) => {
    setForm(employee);
    setEditingId(employee.employeeId);
  };

  // Search and Department Filter
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  // Get unique departments
  const departments = [
    "All",
    ...new Set(employees.map((employee) => employee.department)),
  ];

  return (
    <div className="app">
      <header>
        <h1>Employee Directory</h1>
        <p>Employee Management System</p>
      </header>

      <div className="container">

        {/* Employee Count */}
        <div className="count">
          <h2>Total Employees: {employees.length}</h2>
        </div>

        {/* Employee Form */}
        <form onSubmit={handleSubmit} className="employee-form">
          <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={form.employeeId}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department Name"
            value={form.department}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <textarea
            name="localAddress"
            placeholder="Local Address"
            value={form.localAddress}
            onChange={handleChange}
          ></textarea>

          <textarea
            name="permanentAddress"
            placeholder="Permanent Address"
            value={form.permanentAddress}
            onChange={handleChange}
          ></textarea>

          <button type="submit">
            {editingId ? "Update Employee" : "Add Employee"}
          </button>
        </form>

        {/* Search and Department Filter */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name or Employee ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Employee List */}
        <div className="employee-list">
          <h2>Employee List</h2>

          {filteredEmployees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            filteredEmployees.map((employee) => (
              <div className="employee-card" key={employee.employeeId}>
                <h3>{employee.name}</h3>

                <p>
                  <strong>Employee ID:</strong> {employee.employeeId}
                </p>

                <p>
                  <strong>Department:</strong> {employee.department}
                </p>

                <p>
                  <strong>Gender:</strong> {employee.gender}
                </p>

                <p>
                  <strong>Phone:</strong> {employee.phone}
                </p>

                <p>
                  <strong>Local Address:</strong> {employee.localAddress}
                </p>

                <p>
                  <strong>Permanent Address:</strong>{" "}
                  {employee.permanentAddress}
                </p>

                <button onClick={() => handleEdit(employee)}>
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(employee.employeeId)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;