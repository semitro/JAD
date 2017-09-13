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
	<?php
	 	$start_time = microtime(true);
		$x=$_POST['X'];
		$R=$_POST['R'];
		$y = $_POST['Y'];
 		$inTheArea = inRange($x,$y,$R);

		function inRange($x, $y, $R){
			print bccomp($x, -$R);
			// The left area
			if( 
				// returns 1 if left operand > rigth operand
				bccomp($x, -$R, 1000)   != -1
				and
				bccomp($x, "0.0", 1000) != 1
				//($x >= -$R and $x <= 0)
				)
			{
				print "LET";
				if( bccomp( $y, bcadd($x, $R, 1000), 1000 ) != 1
				            and bccomp($y, -$R, 1000) == 1 ) 
			//if($y <= $X + $R and  $y>-$R)
					return true;
			}
			// The right area
			// x^2 + y^2 = R^2
			if(bccomp($x, "0.0", 1000) != -1 and bccomp($x, $R, 1000) != 1){


		//	if($x>=0 and $x <= $R){
				if(bccomp($y, "0.0", 1000) != -1 and
					    bccomp(    bcadd( bcmul($x, $x, 1000),  bcmul($y, $y, 1000) , 1000) ,       bcmul($R, $R, 1000), 1000 ) != 1
					)
				// if(
				// 	$y >= 0 and
				// 	$x*$x + $y*$y <= $R*$R
				// 	)
					return true;
			}
		//	}
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
			<td><?php echo date("h:i:s") ?></td>
		</tr>
	</table>
	<a href="index.html" id="back">Назад</a>

</body>
</html>

