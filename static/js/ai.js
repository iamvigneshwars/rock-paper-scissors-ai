function AI() {


    freq_dist_win = { 'rr': 1, 'rp': 1, 'rs': 1, 'pr': 1, 'pp': 1, 'ps': 1, 'sr': 1, 'sp': 1, 'ss': 1 }
    freq_dist_lose = { 'rr': 1, 'rp': 1, 'rs': 1, 'pr': 1, 'pp': 1, 'ps': 1, 'sr': 1, 'sp': 1, 'ss': 1 }
    freq_dist_tie = { 'rr': 1, 'rp': 1, 'rs': 1, 'pr': 1, 'pp': 1, 'ps': 1, 'sr': 1, 'sp': 1, 'ss': 1 }

    transition_win = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    transition_lose = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    transition_tie = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    console.log(transition_lose);



}

export {AI};