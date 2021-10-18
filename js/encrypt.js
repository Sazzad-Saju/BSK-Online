function encrypt(M, keyGen) {
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
        var t = M[i].charCodeAt();
        var j = t % M.length;
        [M[i], M[j]] = [M[j], M[i]];
    }
    // M = M.join("").toString();
    // console.log(M);

    //hexadecimal
    // console.log(rand(), max);
    for (var i = 0; i < M.length; i++) {
        M[i] = M[i].charCodeAt().toString(16);
        if (M[i] == '7e') {
            if (i % 2 == 0) {
                var numb = parseInt(rand() * max) % 32;
                M[i] = numb.toString(16);
            } else {
                var numb = parseInt(rand() * max) % 256;
                if (numb < 126) {
                    numb += 130;
                }
                M[i] = numb.toString(16);
            }
        }
    }
    M = M.join("").toString().toUpperCase();
    return M;
}