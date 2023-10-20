import client from "./client.js";

export async function getAllEventData() {
  return fetch(`http://43.202.46.227/api/events`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function getOneEventData(id) {
  return fetch(`http://43.202.46.227/api/events/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
