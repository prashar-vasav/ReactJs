import axios from "axios";

async function getAllEmployees() {
  try {
    const response = await axios.get(`http://localhost:8080/employees`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
}

async function createEmployee(employeeData) {
  try {
    const response = await axios.post(
      `http://localhost:8080/employees`,
      employeeData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
}
async function updateEmployee(id, data) {
  try {
    const response = await axios.put(`http://localhost:8080/employees/${id}`, {
      ...data,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
}
async function deleteEmployee(id) {
  try {
    const response = await axios.delete(
      `http://localhost:8080/employees/${id}`
    );

    return id;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
}

export { getAllEmployees, createEmployee, updateEmployee, deleteEmployee };
