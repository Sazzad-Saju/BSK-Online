document.getElementById('pass').addEventListener('keyup', function(e) {
    let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
    let str = e.target.value;
    if (re.test(str) == true) {
        e.target.className = "form-control correct";
        document.getElementById('passErr').setAttribute("style", "display:none");

    } else {
        e.target.className = "form-control wrong";
        document.getElementById('passErr').setAttribute("style", "display:block");
    }
})

document.getElementById('encrypt').addEventListener('click', function() {
    let M = document.getElementById('message').value;
    let K = document.getElementById('pass').value;
    if (M == "") {
        document.getElementById('message').className = "form-control wrong";
    } else if (document.getElementById('pass').classList.contains("correct") == true && M != "") {
        document.getElementById('message').className = "form-control correct";
        let keyGen = keyGeneration(M, K);
        // console.log(keyGen.subkey1);
        // console.log(keyGen.subkey2);
        let C = encrypt(M, keyGen);
        console.log(C);

    } else if (M != "") {
        document.getElementById('pass').className = "form-control wrong";
        document.getElementById('message').className = "form-control correct";
    }
})

document.getElementById('decrypt').addEventListener('click', function() {
    let M = document.getElementById('message').value;
    let K = document.getElementById('pass').value;
    if (M == "") {
        document.getElementById('message').className = "form-control wrong";
    } else if (document.getElementById('pass').classList.contains("correct") == true && M != "") {
        document.getElementById('message').className = "form-control correct";
        console.log("Everythings okk");
    } else if (M != "") {
        document.getElementById('pass').className = "form-control wrong";
        document.getElementById('message').className = "form-control correct";
    }
})