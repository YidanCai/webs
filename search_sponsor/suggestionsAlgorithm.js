function LCSubStr( X,  Y , m , n) {
    //the function for finding the length of longest common substring
    //the dynamic programming method comes from GeeksForGeeks
    var LCStuff =
        Array(m + 1).fill().map(()=>Array(n + 1).fill(0));

    // To store length of the longest common substring
    var result = 0;

    for (i = 0; i <= m; i++) {
        for (j = 0; j <= n; j++) {
            if (i == 0 || j == 0)
                LCStuff[i][j] = 0;
            else if (X[i - 1] == Y[j - 1]) {
                LCStuff[i][j] = LCStuff[i - 1][j - 1] + 1;
                result = Math.max(result, LCStuff[i][j]);
            } else
                LCStuff[i][j] = 0;
        }
    }
    return result;
}



