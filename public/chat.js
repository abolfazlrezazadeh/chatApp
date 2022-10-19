const socket = io();
function submitFunction() {
  const from = $("#user").val();
  const message = $("#m").val();

  if (message != "") {
    socket.emit("chatMessage", from, message);
  }
  $("#m").val().focus();

  return false;
}

socket.on("chatMessage", (from, msg) => {
  let me = $("#user").val();
  let color = from == me ? "green" : "red";
  let fro = from == me ? "Me" : from;

  $("#message").append(
    "<li><b style='color:" + color + "'>" + fro + "</b>:" + msg + "</li>"
  );
});

$(document).ready(function () {
  let name = makeId();
  $("#user").val(name);
  socket.emit("chatMessage", "SYS", "<b>" + name + "</b> has joined");
});

function makeId() {
  let text = "";
  let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyz123456789";
  for (let index = 0; index < 6; index++) {
    text += char.charAt(Math.floor(Math.random() * char.length));
  }
  return text;
}
