<?php
	 	$start_time = microtime(true);
		$x=$_POST['X'];
		$R=$_POST['R'];
		$y = $_POST['Y'];
 		$inTheArea = inRange($x,$y,$R);

		function inRange($x, $y, $R){
			if( 	// left side
				bccomp($x, -$R, 100)   != -1
				and
				bccomp($x, "0.0", 100) != 1
				)
			{
				if( bccomp( $y, bcadd($x, $R, 100), 100 ) != 1
				            and bccomp($y, -$R, 100) == 1 ) 
					return true;
			}
			// The right area
			if(bccomp($x, "0.0", 100) != -1 and bccomp($x, $R, 100) != 1){
				if(bccomp($y, "0.0", 100) != -1 and
					    bccomp(    bcadd( bcmul($x, $x, 100),  bcmul($y, $y, 100) , 100) ,       bcmul($R, $R, 100), 100 ) != 1
					)
					return true;
			}
			return false;
		}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<style type="text/css">
	html, body{
		font-family: ubuntu;
		background-color: #333;
		color: #eee;
	}
	table{
		border-collapse: separate;
		/*border-color: black;*/
		border: 1px solid gray;
		font-size: 1.2em;
		padding: 5px;
		border-spacing: 7px;
		transition: 2s;
		border-radius: 3px;
	}

	th, td {
		border: 1px solid gray;
		text-align: center;
		padding: 5px;
		border-radius: 3px;

	}
	#back {
		display: block;
		width: 120px;
		border-radius: 3px;
		margin: 2em;
		margin-left: 0px;
		padding: 10px;
		background-color: #B94040;
		color: #eee;
		text-decoration: none;
		transition: 1s;
	}
	#back:hover {
		background-color: #994040;
	}
	</style>
</head>
<body>
	
	<table>
		<tr>
			<td>Попадание</td>
			<td>X</td>
			<td>Y</td>
			<td>R</td>
			<td>Время работы скрипта</td>
			<td>Который час?</td>
		</tr>
		<tr>
			<td><?php echo $inTheArea ? 'Да': 'Нет' ?></td>
			<td><?php echo  $x ?></td>
			<td><?php echo  $y ?></td>
			<td><?php echo  $R ?></td>
			<td><?php echo microtime(true) - $start_time ?></td>
			<td><?php echo date("h:i:s") ?></td>
		</tr>
	</table>
	<a href="index.html" id="back">Назад</a>

</body>
</html>

