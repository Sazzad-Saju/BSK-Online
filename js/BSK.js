//DOM
//Check Password
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

//Encrypt
document.getElementById('encrypt').addEventListener('click', function() {
    let M = document.getElementById('message').value;
    let K = document.getElementById('pass').value;
    if (M == "") {
        document.getElementById('message').className = "form-control wrong";
    } else if (document.getElementById('pass').classList.contains("correct") == true && M != "") {
        document.getElementById('message').className = "form-control correct";
        let Mlength = M.length;
        let keyGen = keyGeneration(Mlength, K);
        let C = encrypt(M, keyGen);
        // console.log(keyGen);
        // console.log(C);
        document.getElementById('message').value = C;
        document.querySelector('.copyButt').innerHTML = `<i class="fas fa-copy fs-3"></i>`;

    } else if (M != "") {
        document.getElementById('pass').className = "form-control wrong";
        document.getElementById('message').className = "form-control correct";
    }
})

document.getElementById('decrypt').addEventListener('click', function() {
    let C = document.getElementById('message').value;
    let K = document.getElementById('pass').value;
    if (C == "") {
        document.getElementById('message').className = "form-control wrong";
    } else if (document.getElementById('pass').classList.contains("correct") == true && C != "") {
        document.getElementById('message').className = "form-control correct";
        let Mlength = C.length / 2;
        let pad = pad_bytes(C);
        // console.log(pad)
        Mlength = Mlength - pad;
        // console.log(Mlength)
        let keyGen = keyGeneration(Mlength, K);
        let M = decrypt(C, keyGen)
            // console.log(M);
        document.getElementById('message').value = M;
        document.querySelector('.copyButt').innerHTML = ``
    } else if (C != "") {
        document.getElementById('pass').className = "form-control wrong";
        document.getElementById('message').className = "form-control correct";
    }
})

//copy
document.querySelector('.copyButt').addEventListener('click', function() {

    var C = document.getElementById('message').value;
    navigator.clipboard.writeText(C);
    document.querySelector('.copyButt').innerHTML = `<b>Ciphertext is Coppied!<b>`
})