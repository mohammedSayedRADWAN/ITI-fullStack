$(document).ready(function() {
    const colors = ['red', 'blue', 'green', 'orange'];

    function getRandomColor(excludeColor) {
        let filtered = colors.filter(c => c !== excludeColor);
        return filtered[Math.floor(Math.random() * filtered.length)];
    }

    $('body').on('mouseenter', 'div', function() {
        if (!$(this).data('original-color')) {
            $(this).data('original-color', $(this).attr('class'));
        }

        if (!$(this).data('next-color')) {
            $(this).data('next-color', getRandomColor($(this).data('original-color')));
        }

        $(this).attr('class', $(this).data('next-color'));
    });

    $('body').on('mouseleave', 'div', function() {
        $(this).attr('class', $(this).data('original-color'));
    });

    $('body').on('click', 'div', function() {
        const colorToUse = $(this).data('next-color') || $(this).data('original-color');

        const newDiv = $('<div></div>').addClass(colorToUse).css({
            
        });

        $(this).after(newDiv);

        newDiv.data('original-color', colorToUse);
        newDiv.data('next-color', getRandomColor(colorToUse));
    });
});
