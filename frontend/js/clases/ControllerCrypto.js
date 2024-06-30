const URL = "http://localhost:3000";

export async function TraerTabla(){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
                }
            }
        });
        xhr.open("GET", `${URL}/crypto`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    });
}

export async function CrearUna(crypto){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
                }
            }
        });
        xhr.open("POST", `${URL}/crypto`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(crypto));
    });
}

export async function EditarPorId(id, nuevaCrypto) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
                }
            }
        });
        xhr.open("PUT", `${URL}/crypto/${id}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(nuevaCrypto));
    });
}

export async function EliminarPorId(id) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve();
                } else {
                    reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
                }
            }
        });
        xhr.open("DELETE", `${URL}/crypto/${id}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    });
}

export async function EliminarTodo() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve();
                } else {
                    reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
                }
            }
        });
        xhr.open("DELETE", `${URL}/crypto`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    });
}

