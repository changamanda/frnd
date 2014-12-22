$(document).ready(function() {

    $('#calendar').fullCalendar({
       googleCalendarApiKey: 'AIzaSyDlCwOOG6dsZqKW2WHURY-CRlMfoluHo28',
       events: $('.container').data('shifts'),
       editable: true,
       defaultView: 'agendaWeek',
       height: 400,
			 droppable: true, // this allows things to be dropped onto the calendar
			 drop: function() {
					$(this).remove();
			 }
    })

		$('#external-events .fc-event').each(function() {

			$(this).data('event', {
				title: $.trim($(this).text()),
				stick: true
			});

			$(this).draggable({
				zIndex: 999,
				revert: true,
				revertDuration: 0
			});

		});

});