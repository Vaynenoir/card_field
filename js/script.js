window.onload = function(){

function generate_map(size)
{
	var map = new Array(size);
	for (var i = 0; i < size; i++) {

		map[i] = new Array(size);
		for (var j = 0; j < size; j++) {

			map[i][j] = Math.floor(Math.random() * 4);
		}
	}

	return (map);
}

function		ft_check_coord(size, i, j)
{
	if (i < 0 || j < 0 || i >= size || j >= size)
		return (0);
	return (1);
}


function set_neighbours(map, x, y)
{
	var wanted_cell = map[x][y];


	console.log(map);

	var step = -1;
	map[x][y] = step;
	var flag = 1;

	var x_dir = [ 1, 0, -1, 0 ];
	var y_dir = [ 0, 1, 0, -1 ];

	while (flag) {

		flag = 0;
		for (var i = 0; i < map.length; i++) {

			for (var j = 0; j < map[i].length; j++) {

				if (map[i][j] == step) {

					var to_go_i;
					var to_go_j;

					for (var k = 0; k < 4; k++) {

						to_go_i = i + x_dir[k];
						to_go_j = j + y_dir[k];

						if (ft_check_coord(map.length, to_go_i, to_go_j) 
							&& map[to_go_i][to_go_j] == wanted_cell) {

							map[to_go_i][to_go_j] = step;
							flag = 1;

						}
					}
				}
			}
		}
	}

	print_map(map);

	var counter = 0;
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			if (map[i][j] == -1) {
				map[i][j] = wanted_cell;
				counter++;
			}
		}
	}
		$("#counter").text("Amount: " + counter);	
	
}

function print_map(map)
{
	var card_class = JSON.parse(localStorage.getItem("card")) || "";
	
    var body = document.getElementsByTagName('body')[0];
    var tbl =  $("#table_field");
    $("#table_field").children().remove();
    $(tbl).css("width", "30%");
    $(tbl).attr('border', '1');
    var tbdy = document.createElement('tbody');
    $(td).removeClass();

	for (var i = 0; i < map.length; i++) {
        var tr = document.createElement('tr');
		for (var j = 0; j < map[i].length; j++) {
			   	var td =  document.createElement('td');
                tr.appendChild(td);
                if(map[i][j] == 0){
                	$(td).addClass("heart");
                }
                else if(map[i][j] == 1){
                	$(td).addClass("diamond");
                }
                else if(map[i][j] == 2){
                	$(td).addClass("cross");
                }
                else if(map[i][j] == 3){
                	$(td).addClass("peak");
                }
                else if (map[i][j] < 0) {
                	
                	$(td).addClass("active");
                	$(td).addClass(card_class);

                } else {
                		
                	$(td).removeClass("active");

                }
		}
		tbdy.append(tr);
	}

	if(card_class){
		$("#card").text("Card: " + card_class);

	}
	tbl.append(tbdy);
}


document.getElementsByTagName('table')[0].addEventListener('click', function(e) {
	var x = e.target.parentElement.rowIndex;
	var y = e.target.cellIndex;
    // alert("My position in table is: " + e.target.parentElement.rowIndex + ":" + e.target.cellIndex + "");
    console.log(e.target.className);
    var card = e.target.className;
    localStorage.setItem("card", JSON.stringify(card));
    // var saved_class = e.target
    set_neighbours(map, x, y);
  }, false);



localStorage.clear();
var map = generate_map(5);
print_map(map);

};
