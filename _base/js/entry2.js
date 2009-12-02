var placePoints = [15,12,10,8,7,6,5,4,3,2,1,0];


$(function(){
    
	// console log wrapper.
	function debug(){
	    window.console && console.log.call(console,arguments);
	}

	// add total row on bottom
	var totalCells = '<th scope="row">Total</th>';
	totalCells += '<td></td>';
	for (i=1; i<=4; i++) {
		totalCells += '<td class="total"></td>';
	}

	var totalRow = $('<tr class="totals" />').append(totalCells);

	$('table').append(totalRow);


    
    // select exclusivity
    $('select').not('.vehicle').change(function(){  

        var classes = $(this).attr('class');
        classes = classes.replace(' ', '.');

        var selOpt = $(this).find(':selected');
        var selIdx = $(this).find('option').index( selOpt );

        var otherSelects = $('select.' + classes).not(this);
        
        var prevSelIdx = $(this).data('prevSelIdx');
        if ( prevSelIdx != undefined ) {
            otherSelects.each(function(){
                $(this).find('option:eq('+prevSelIdx+')').removeAttr('disabled');
            });                
        }

        if( selIdx > 0 ) {
            otherSelects.each(function(){
                $(this).find('option:eq('+selIdx+')').attr('disabled', 'disabled');
            });            
        }
        
        $(this).data('prevSelIdx', selIdx);

    });
    

    function updatePlayerTotal(col) {
        var playerTotal = 0;
        $('tr.race:visible').each(function(){

            var selectPlace = $(this).find('td:eq('+col+') select.place');
            if( selectPlace.val() != '---' ) {
                var selVal = parseInt( selectPlace.val() );
                playerTotal += placePoints[selVal-1];
            } 
        });
        $('tr.totals td:eq('+col+')').text( playerTotal );
	}

    // tally player total
    $('select.place').change(function(){

        var row = $(this).parents('tr');
		var col = $(this).parent();
		col = row.children('td').index( col );
        updatePlayerTotal( col );

    });
    

    // change race_entry table dynamically
    $('#race_setup input[name="race_count"]').change(function(){
        var raceCount = parseInt( $(this).val() );
        debug('raceCount', raceCount );

        $('tr.race:gt('+(raceCount-1)+'):visible').hide();
        $('tr.race:lt('+(raceCount)+'):hidden').show();

        for(i=0; i < $('tr.race td:visible').length; i++) {
		    updatePlayerTotal( i+1 );
        }

    });

    // change race_entry table dynamically
    $('#race_setup input[name="player_count"]').change(function(){
        var playerCount = parseInt( $(this).val() );
        debug('playerCount', playerCount );
        $('tr').each(function(){
            $(this).children(':gt('+(playerCount+1)+')').hide();
            $(this).children(':lt('+(playerCount+2)+'):hidden').show();
        });
    });

    // initiate change so table is properly sized on window.load
    $('#race_setup input:checked').change();

    // hide revise round button
    $('#revise_round').attr('disabled', 'disabled').hide();

	$('select, input[type="radio"]').change(function(){
		var validateSelects = true;
		var submitDisabled = $('#submit_round').attr('disabled');
	
		$('td:visible select').each(function(){
			if( $(this).val() == '---' ) {
				// debug('invalid selects', this );
				validateSelects = false;
				return false;
			}
		})

		if ( !validateSelects && !submitDisabled ) {
			$('#submit_round').attr('disabled', 'disabled');
		} else if ( validateSelects && submitDisabled  ) {
			$('#submit_round').removeAttr('disabled');
		}
		
	});
		// check it on startup
	$('select').eq(0).change();

    
})