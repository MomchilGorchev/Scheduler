modalToggle = function(data){
    var modal = $('#myModal');
    modal.find('.modal-title').html(data.title)
        .attr('contenteditable', true);
    modal.find('.modal-startdate').html(data.start.replace(/\T/g, ' at '))
        .attr('contenteditable', true);
    modal.find('.modal-body').html(data.description)
        .attr('contenteditable', true);
    modal.find('.modal-ref').html('Ref.:'+data.timer);
    modal.modal();
};


