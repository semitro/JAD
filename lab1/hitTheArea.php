<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<style type="text/css">
	body{
		font-family: ubuntu;
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

	</style>
</head>
<body>
	<?php
	 	$start_time = microtime(true);
		$x=$_POST['X'];
		$R=$_POST['R'];
		$y = $_POST['whichButton'];
 		$inTheArea = inRange($x,$y,$R);

		function inRange($x, $y, $R){
			// The left area
			if($x >= -$R and $x <= 0){
				if($y <= $X + $R and  $y>-$R)
					return true;
				}
			// The right area
			// x^2 + y^2 = R^2
			if($x>=0 and $x <= $R){
				if(
					$y >= 0 and
					$x*$x + $y*$y <= $R*$R
					)
					return true;
			}
			return false;
		}
	?>
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
			<td><?php echo date("h.i.s") ?></td>
		</tr>
	</table>

</body>
</html>

