var myWebSocket;
var isConnected = false;
// toggleConnectBtn();

function toggleConnection(con){
    isConnected = con;
    var cb = document.getElementById("connectBtnContainer");
    if(isConnected){
        cb.innerHTML = `<button onclick="closeConn()" class="ml-1 right-5 inline-flex items-center text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
        <svg class="w-3 h-3 fill-current text-red-300 flex-shrink-0 mr-2" height="16" width="12" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
        <span>Disconnect</span>
    </button>`;
    }else{
        cb.innerHTML = `<button onclick="connectToWS()" class="right-5 inline-flex items-center text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
        <svg class="w-3 h-3 fill-current text-green-300 flex-shrink-0 mr-2" height="16" width="12" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M96 0C78.3 0 64 14.3 64 32v96h64V32c0-17.7-14.3-32-32-32zM288 0c-17.7 0-32 14.3-32 32v96h64V32c0-17.7-14.3-32-32-32zM32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32v32c0 77.4 55 142 128 156.8V480c0 17.7 14.3 32 32 32s32-14.3 32-32V412.8C297 398 352 333.4 352 256V224c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z"/></svg>
        <span>Connect</span>
    </button>`;
    }
}

function connectToWS() {
    if (myWebSocket !== undefined) {
        myWebSocket.close()
    }

    myWebSocket = new WebSocket(`ws://127.0.0.1:8188/ws?clientId={$window.name}`);

    myWebSocket.onmessage = function(event) {
        var leng;
        if (event.data.size === undefined) {
            leng = event.data.length
        } else {
            leng = event.data.size
        }
        console.log("onmessage. size: " + leng + ", content: " + event.data);
        var container = document.getElementById("NotifContainer");

        const eventData = JSON.parse(event.data)

        container.innerHTML += `<button class="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                    <div class="flex items-center">
                        <img class="rounded-full items-start flex-shrink-0 mr-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBJDkXVDDjXUydyywDs4YDKOUDjUSpHsRG9Wmw3_4jWA&s" width="32" height="32" alt="weather" />
                        <div>
                            <h4 class="text-sm font-semibold text-gray-900">${eventData.alert_text}</h4>
                            <div class="text-[13px]">Issued at ${eventData.issue_time}</div>
                            <div class="text-[13px]">Location: ${eventData.location}</div>
                        </div>
                    </div>
                </button>`;
    }

    myWebSocket.onopen = function(evt) {
        toggleConnection(true);
        console.log("onopen.");
    };

    myWebSocket.onclose = function(evt) {
        toggleConnection(false);
        console.log("onclose.");
    };

    myWebSocket.onerror = function(evt) {
        toggleConnection(false);
        console.error("Error!");
    };
}

function sendMsg() {
    var message = document.getElementById("myMessage").value;
    myWebSocket.send(message);
}

function closeConn() {
    myWebSocket.close();
}

// prompt creation
function addInputPrompt(){
    container.innerHTML += `<button class="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
    <div class="flex items-center">
        <img class="rounded-full items-start flex-shrink-0 mr-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBJDkXVDDjXUydyywDs4YDKOUDjUSpHsRG9Wmw3_4jWA&s" width="32" height="32" alt="weather" />
        <div>
            <h4 class="text-sm font-semibold text-gray-900">${eventData.alert_text}</h4>
            <div class="text-[13px]">Issued at ${eventData.issue_time}</div>
            <div class="text-[13px]">Location: ${eventData.location}</div>
        </div>
    </div>
</button>`;
}