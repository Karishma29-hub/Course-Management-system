if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("service-worker.js")
        .then(() => {
            console.log("Service Worker Registered");
        })
        .catch(error => {
            console.log("Error:", error);
        });
}

function updateStatus() {
    const status = document.getElementById("status");

    if (navigator.onLine) {
        status.innerHTML = "🟢 Online";
    } else {
        status.innerHTML = "🔴 Offline";
    }
}

window.addEventListener("online", updateStatus);
window.addEventListener("offline", updateStatus);

updateStatus();