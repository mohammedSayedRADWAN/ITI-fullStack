$(document).ready(function() {
    const correctName = "Ahmed"; 
    let attempts = 0;

    
    const display = $('<div class="letters"></div>').css({
        'margin-top': '10px',
        'font-size': '24px',
        'letter-spacing': '5px'
    });
    $('#my-name').after(display);

    $('#my-name').on('input', function() {
        const guess = $(this).val().trim();
        let revealed = '';

        
        for (let i = 0; i < guess.length; i++) {
            if (guess[i].toLowerCase() === correctName[i].toLowerCase()) {
                revealed += correctName[i];
            } else {
                revealed += '_'; 
            }
        }

        display.text(revealed);

        
        attempts++;
        $('.counter').text(attempts);


        if (revealed.toLowerCase() === correctName.toLowerCase()) {
            $('.result').text("congratulations!!").css('color', 'green');
        } else {
            $('.result').text("Keep going!").css('color', 'blue');
        }
    });
});
