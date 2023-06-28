import axios from "axios";

export function Api() {
  const getData = async (name) => {
    const response = await axios
      .get("https://6363becf37f2167d6f8223de.mockapi.io/data")
      .then((data) => {
        return data.data.filter((user) => user.name === name);
      });
    return response;
  };

  const putData = async (id, obj) => {
    axios.put(`https://6363becf37f2167d6f8223de.mockapi.io/data/${id}`, obj);
  };
  return { getData, putData };
}
