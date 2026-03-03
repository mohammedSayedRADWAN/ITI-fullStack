$(document).ready(function() {
    const content = $('.content');
    const error = $('.error');
    
    let fontSize = parseInt(content.css('font-size')); 
    const minSize = 10;
    const maxSize = 50; 

    $('#increase').click(function() {
        if (fontSize < maxSize) {
            fontSize += 2;
            content.css('font-size', fontSize + 'px');
            error.text(''); 
        } else {
            error.text('maximum font size reached!');
        }
    });

    $('#decrease').click(function() {
        if (fontSize > minSize) {
            fontSize -= 2;
            content.css('font-size', fontSize + 'px');
            error.text('');
        } else {
            error.text('reached font size limit!');
        }
    });
});
