$(() => {

    //Title

    let $welcome = $('<h1>')
    const welcomeText = 'Welcome to Click Tac Toe';
    $welcome.text(welcomeText);
    $('body').append($welcome)

    const $container = $('<div>').attr('id', 'container');
    $('body').append($container);

    //Draw Board

    // let $marker0;
    // let $marker1;
    // let $marker2;
    // let $marker3;
    // let $marker4;
    // let $marker5;
    // let $marker6;
    // let $marker7;
    // let $marker8;

    const boxes = [];
    for (let i = 0; i < 9; i++) {
        let $square = $('<button>');    
        $square.attr('id', 'box' + i);
        $square.addClass('square');
        $container.append($square);
        boxes.push($square);
    }

    let clickCount = 0;
    const $squares = $('.square');

    $squares.on('click', (event) => {    
        const $clickedElement = $(event.currentTarget);
        // Check for existing marker
        if ($clickedElement.find('span.marker')[0]) {
            console.log('Marker span already exists, not incrementing.');
            return;
        }

        // Add marker
        const $span = $('<span>');
        $span.addClass('marker');
        if (clickCount % 2 === 0) {
            $span.text('X');
        } else {
            $span.text('O');
        }
        $clickedElement.append($span);

        // Increment click counter
        clickCount += 1;

        // Win lose logic
        const winningCombinations = [
            [boxes[0], boxes[1], boxes[2]],
            [boxes[3], boxes[4], boxes[5]],
            [boxes[6], boxes[7], boxes[8]],
            [boxes[0], boxes[3], boxes[6]],
            [boxes[1], boxes[4], boxes[7]],
            [boxes[2], boxes[5], boxes[8]],
            [boxes[0], boxes[4], boxes[8]],
            [boxes[2], boxes[4], boxes[6]]
        ];

        const $winningBoxes = getWinningBoxes(winningCombinations, $welcome);
        if ($winningBoxes.length > 0) {
            $winningBoxes.forEach(($box) => $box.addClass('yellow'));
            // alert('You won!');
        } else {
            console.log('No winner yet');
        }

        if (boxes.every(($box) => $box.find('span.marker').text() !== '')) {
            console.log('Tie game');
            $welcome.text('Tie game. Press reset');
        }
    })

    const $reset = $('<button id="reset">Reset</button>');
    $('body').append($reset);

    $reset.on('click', () => {
        console.log('Clicked reset');
        
        for (let i = 0; i < boxes.length; i++) {
            const $box = boxes[i];
            $box.removeClass('yellow').empty();
            $welcome.text(welcomeText);
        }
    })
})


/** Returns winning array of boxes if won. Otherwise returns empty array */
const getWinningBoxes = (combinations, welcomeJQuery) => {
    for (const combo of combinations) {
        if (combo.every(($box) => $box.find('span.marker').text() === 'X')) {
            welcomeJQuery.text('X is the winner!');
            return combo;
        } else if (combo.every(($box) => $box.find('span.marker').text() === 'O')) {
            welcomeJQuery.text('O is the winner!');
            return combo;
        } else {
            console.log('Not a winning combo');
        }
    }

    console.log('No winner this turn');
    return [];
}
