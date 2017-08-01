$(".seat").click(function() {
  alert( "Are you sure you want to buy a ticket in section "+event.target.id+"?" );
})

var firstSeatLabel = 1;

			$(document).ready(function() {
				var $cart = $('#selected-seats'),
					$counter = $('#counter'),
					$total = $('#total'),
					sc = $('#seat-map').seatCharts({
					map: [
            'aaaaaaaaaa____________',
						'',
            'cccccccccccc',
            'dddddddddddddd',
            '',
            '___________fffffff',
            '_______ggggggggggg',
            '_________hhhhhhhhh',
            '', 
            'jjjjjjjjjjjjjjjjjj',
					],
					seats: {
            a: {
							price   : 5000,
							classes : 'standard-balcony-class',
							category: 'Standard Ticket (Balcony)'
						},
            b: {
							price   : 2500,
							classes : 'standard-balcony-class',
							category: 'Standard Ticket (Balcony)'
						},
            c: {
							price   : 2500,
							classes : 'standard-balcony-class',
							category: 'Standard Ticket (Balcony)'
						},
            d: {
							price   : 2500,
							classes : 'standard-ground-class',
							category: 'Standard Ticket (Ground)'
						},
            e: {
							price   : 2500,
							classes : 'standard-ground-class',
							category: 'Standard Ticket (Ground)'
						},
            f: {
							price   : 2500,
							classes : 'standard-ground-class',
							category: 'Standard Ticket (Ground)'
						},
            g: {
							price   : 1250,
							classes : 'student-class',
							category: 'Student Ticket'
						},
					
					},
					naming : {
            rows: ['a','b','c','d','e','f','g','h','i','j'],
						top : false,
						getLabel : function (character, row, column) {
              if (row == 'a') {
                return column;
              } else if (row == 'c' || row == 'd') {
                return column;
              } else if (row == 'f' || row == 'g' || row == 'h') {
                return column;
              } else if (row == 'j') {
                return column;
              }
						},
					},

					click: function () {
						if (this.status() == 'available') {
							//let's create a new <li> which we'll add to the cart items
							$('<li>'+this.data().category+' Seat # '+this.settings.label+': <b>Rs.'+this.data().price+'</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>')
								.attr('id', 'cart-item-'+this.settings.id)
								.data('seatId', this.settings.id)
								.appendTo($cart);
							
							/*
							 * Lets update the counter and total
							 *
							 * .find function will not find the current seat, because it will change its stauts only after return
							 * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
							 */
							$counter.text(sc.find('selected').length+1);
							$total.text(recalculateTotal(sc)+this.data().price);
							
							return 'selected';
						} else if (this.status() == 'selected') {
							//update the counter
							$counter.text(sc.find('selected').length-1);
							//and total
							$total.text(recalculateTotal(sc)-this.data().price);
						
							//remove the item from our cart
							$('#cart-item-'+this.settings.id).remove();
						
							//seat has been vacated
							return 'available';
						} else if (this.status() == 'unavailable') {
							//seat has been already booked
							return 'unavailable';
						} else {
							return this.style();
						}
					}
				});

				//this will handle "[cancel]" link clicks
				$('#selected-seats').on('click', '.cancel-cart-item', function () {
					//let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
					sc.get($(this).parents('li:first').data('seatId')).click();
				});

				//let's pretend some seats have already been booked
				sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');
		
		});

		