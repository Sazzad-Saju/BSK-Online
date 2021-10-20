function encrypt(M, keyGen) {
    //subkey1 operation
    M = M.split('');
    for (var i = 0; i < M.length; i++) {
        var mv = M[i].charCodeAt();
        var sk1v = keyGen.subkey1[i].charCodeAt();
        var pos = (mv + sk1v) % 94;
        if (pos < 32) {
            pos = pos + 94;
        }
        M[i] = String.fromCharCode(pos);
    }
    M = M.join("").toString();
    // console.log(M);

    //padding
    //length formating
    while (M.length % 8 != 0) {
        M += '~';
    }
    // console.log(M);
    //key-triggered indexing
    M = M.split('');
    for (var i = M.length - 1; i >= 0; i--) {
        var t = keyGen.subkey2[i].charCodeAt();
        var j = t % M.length;
        [M[i], M[j]] = [M[j], M[i]];
    }
    // M = M.join("").toString();
    // console.log(M.join("").toString());

    //hexadecimal
    // console.log(rand(), max);
    for (var i = 0; i < M.length; i++) {
        M[i] = M[i].charCodeAt().toString(16);
        if (M[i] == '7e') {
            if (i % 2 == 0) {
                var numb = parseInt(rand() * max) % 32;
                M[i] = numb.toString(16);
                if (M[i].length != 2) {
                    M[i] = "0" + M[i];
                }
                // console.log(M[i]);
            } else {
                var numb = parseInt(rand() * max) % 256;
                if (numb < 126) {
                    numb += 130;
                }
                M[i] = numb.toString(16);
                // console.log(M[i]);
            }
        }
    }
    M = M.join("").toString().toUpperCase();
    return M;
}