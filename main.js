const overrides = {
    "7b0ab45a730e48a69239010b5b8fe5fa4e8eaac6": 10,
    "1bb8649a5ca2388333c2c19ae84b380b9c8efe0a": 9
}

const images = {
    0: "images/0.png",
    1: "images/1.png",
    2: "images/2.png",
    3: "images/3.png",
    4: "images/4.png",
    5: "images/5.png",
    6: "images/6.png",
    7: "images/7.png",
    8: "images/8.png",
    9: "images/9.png",
    10: "images/10.png"
}

const audio = new Audio("10.wav");

const meter = document.querySelector("#meter");
const text = document.querySelector("#meter+p");

var previous = "";

document.getElementById("input").addEventListener("input", e => {
    e.target.value = e.target.value.toLowerCase();
    let name = e.target.value.trim();
    let score;
    if (name?.trim()) {
        score = getScore(name);
        meter.src = images[score];
        text.textContent = score + "/10";
    }
    else {
        meter.src = images[0];
        text.textContent = "???";
    }
    if (score == 10) {
        audio.play();
    }
});

function getScore(input) {
    let hash = CryptoJS.SHA1(input).toString();
    let score;
    if (hash in overrides) {
        score = overrides[hash];
    }
    else {
        let i = parseInt(hash.substring(0, 1), 16);
        let j = parseInt(hash.substring(1, 2), 16);
        score = Math.ceil((i + j) / 3);
    }
    return score;
}