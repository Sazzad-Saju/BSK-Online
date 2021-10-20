//calculate padding bytes
function pad_bytes(C) {
    var pad = 0;
    C = C.match(/.{1,2}/g);
    for (i = 0; i < C.length; i++) {
        var val = parseInt(C[i], 16);
        if (val < 32 || val > 125) {
            pad += 1;
        }
    }
    return pad;
}

//decrypt
function decrypt(C, keyGen) {
    var pad = 0;
    //character elimination
    C = C.match(/.{1,2}/g);
    for (i = 0; i < C.length; i++) {
        var val = parseInt(C[i], 16);
        if (val < 32 || val > 125) {
            C[i] = '7E';
            pad += 1;
        }
    }
    // console.log(pad);

    //ASCII Conversion
    for (i = 0; i < C.length; i++) {
        C[i] = String.fromCharCode(parseInt(C[i], 16));
    }

    // console.log(C.join("").toString());

    //Key-triggered rev. indexing
    for (var i = 0; i < C.length; i++) {
        var t = keyGen.subkey2[i].charCodeAt();
        var j = t % C.length;
        [C[i], C[j]] = [C[j], C[i]];
    }

    // console.log(C.join("").toString());

    //shrink length
    while (pad--) {
        C.pop();
    }
    // console.log(C.join("").toString());


    //subkey1 operation
    for (var i = 0; i < C.length; i++) {
        var mv = C[i].charCodeAt();
        var sk1v = keyGen.subkey1[i].charCodeAt();
        var pos = mv - sk1v;
        while (pos < 32) {
            pos = pos + 94;
        }
        C[i] = String.fromCharCode(pos);
    }

    C = C.join("").toString();

    return C;
}