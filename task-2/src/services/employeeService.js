import axios from "axios";

export async function getAllEmployees() {
  try {
    const response = await axios.get(`http://localhost:8080/employees`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
}

export async function createEmployee(employeeData) {
  try {
    const response = await axios.post(
      `http://localhost:8080/employees`,
      employeeData
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
}
export async function updateEmployee(id, data) {
  try {
    console.log(data);
    const response = await axios.put(
      `http://localhost:8080/employees/${id}`,
      {...data}
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
}
export async function deleteEmployee(id) {
  try {
   
    const response = await axios.delete(
      `http://localhost:8080/employees/${id}`
      
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
}
