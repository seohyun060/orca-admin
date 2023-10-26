export async function getAllEventData() {
  return await fetch(`https://api-orca.beamworks.co.kr/api/events`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

export async function getOneEventData(id) {
  return await fetch(`https://api-orca.beamworks.co.kr/api/events/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function postNewEventData(data) {
  return await fetch(`https://api-orca.beamworks.co.kr/api/events`, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function putOneEventData(id, data) {
  return await fetch(`https://api-orca.beamworks.co.kr/api/events/${id}`, {
    method: "PUT",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function deleteOneEventData(id) {
  return await fetch(`https://api-orca.beamworks.co.kr/api/events/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
